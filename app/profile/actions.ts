'use server'

import { auth, currentUser } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'
import type { ProfileData } from './page'

// ================= LOAD PROFILE =================
export async function loadProfile() {
  const { userId } = await auth()
  if (!userId) return null

  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (profileError || !profile) return null

  const { data: creator } = await supabaseAdmin
    .from('creators')
    .select('*')
    .eq('profile_id', userId)
    .maybeSingle()

  // ── SPACES (multiple rows per profile) ──
  const { data: spaces } = await supabaseAdmin
    .from('spaces')
    .select('*')
    .eq('profile_id', userId)
    .order('created_at', { ascending: true })

  const spaceItems = (spaces ?? []).map((s: any) => ({
    id: s.id ?? '',
    spaceName: s.space_name ?? '',
    spaceType: s.space_type ?? '',
    addressLine1: s.address_line1 ?? '',
    addressArea: s.address_area ?? '',
    addressCity: s.address_city ?? '',
    pincode: s.pincode ?? '',
    googleMapsUrl: s.google_maps_url ?? '',
    hourlyRate: s.hourly_rate?.toString() ?? '',
    halfDayRate: s.half_day_rate?.toString() ?? '',
    fullDayRate: s.full_day_rate?.toString() ?? '',
    capacity: s.capacity?.toString() ?? '',
    minBookingHours: s.min_booking_hours?.toString() ?? '',
    amenities: s.amenities ?? [],
    spaceRules: s.space_rules ?? '',
    spaceDescription: s.space_description ?? '',
  }))

  // ── EQUIPMENT (multiple rows per profile) ──
  const { data: equipment } = await supabaseAdmin
    .from('equipment')
    .select('*')
    .eq('profile_id', userId)
    .order('created_at', { ascending: true })

  const equipmentItems = (equipment ?? []).map((e: any) => ({
    id: e.id,
    name: e.name ?? '',
    brand: e.brand ?? '',
    category: e.category ?? '',
    pricePerDay: e.price_per_day?.toString() ?? '',
    pricePerHour: e.price_per_hour?.toString() ?? '',
    condition: e.condition ?? '',
    description: e.description ?? '',
  }))

  return {
    phone: profile.phone ?? '',
    city: profile.city ?? '',
    bio: profile.bio ?? '',
    instagramHandle: profile.instagram_handle ?? '',
    portfolioUrl: profile.portfolio_url ?? '',

    isCreator: profile.is_creator ?? false,
    creatorCategory: creator?.category ?? '',
    startingPrice: creator?.starting_price?.toString() ?? '',
    experience: creator?.experience ?? '',
    languages: creator?.languages ?? '',

    isSpace: profile.is_space ?? false,
    spaces: spaceItems,

    isEquipment: profile.is_equipment ?? false,
    equipmentPhone: '',
    equipmentAddressLine: equipment?.[0]?.pickup_address ?? '',
    equipmentArea: equipment?.[0]?.pickup_area ?? '',
    equipmentCity: equipment?.[0]?.pickup_city ?? '',
    equipmentPincode: equipment?.[0]?.pickup_pincode ?? '',
    equipment: equipmentItems,
  } satisfies ProfileData
}

// ================= SAVE PROFILE =================
export async function saveProfile(formData: ProfileData) {
  const { userId } = await auth()
  if (!userId) return { error: 'Unauthorized' }

  const { currentUser } = await import('@clerk/nextjs/server')
  const clerkUser = await currentUser()
  const fullName = [clerkUser?.firstName, clerkUser?.lastName].filter(Boolean).join(' ') || null
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress ?? null

  try {
    // ── PROFILE ──
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert(
        {
          id: userId,
          full_name: fullName,
          email,
          phone: formData.phone,
          city: formData.city,
          bio: formData.bio,
          instagram_handle: formData.instagramHandle,
          portfolio_url: formData.portfolioUrl,
          is_creator: formData.isCreator,
          is_space: formData.isSpace,
          is_equipment: formData.isEquipment,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )

    if (profileError) throw profileError

    // ── CREATOR ──
    if (formData.isCreator) {
      const { data: existing } = await supabaseAdmin
        .from('creators')
        .select('id')
        .eq('profile_id', userId)
        .maybeSingle()

      if (existing) {
        const { error } = await supabaseAdmin
          .from('creators')
          .update({
            category: formData.creatorCategory,
            starting_price: Number(formData.startingPrice || 0),
            experience: formData.experience,
            languages: formData.languages,
          })
          .eq('profile_id', userId)
        if (error) throw error
      } else {
        const { error } = await supabaseAdmin
          .from('creators')
          .insert({
            profile_id: userId,
            category: formData.creatorCategory,
            starting_price: Number(formData.startingPrice || 0),
            experience: formData.experience,
            languages: formData.languages,
          })
        if (error) throw error
      }
    } else {
      // Toggle off → remove creator listing
      await supabaseAdmin.from('creators').delete().eq('profile_id', userId)
    }

    // ── SPACES ──
    // Strategy: delete all rows, then batch-insert fresh (same as equipment)
    await supabaseAdmin.from('spaces').delete().eq('profile_id', userId)

    if (formData.isSpace && formData.spaces.length > 0) {
      const { error: insertError } = await supabaseAdmin
        .from('spaces')
        .insert(
          formData.spaces.map((s) => ({
            profile_id: userId,
            space_name: s.spaceName,
            space_type: s.spaceType,
            space_category: 'studio',
            address_line1: s.addressLine1,
            address_area: s.addressArea,
            address_city: s.addressCity,
            pincode: s.pincode,
            google_maps_url: s.googleMapsUrl,
            hourly_rate: Number(s.hourlyRate || 0),
            half_day_rate: Number(s.halfDayRate || 0),
            full_day_rate: Number(s.fullDayRate || 0),
            capacity: Number(s.capacity || 0),
            min_booking_hours: Number(s.minBookingHours || 1),
            amenities: s.amenities,
            space_rules: s.spaceRules,
            space_description: s.spaceDescription,
          }))
        )
      if (insertError) throw insertError
    }

    // ── EQUIPMENT ──
    await supabaseAdmin.from('equipment').delete().eq('profile_id', userId)

    if (formData.isEquipment && formData.equipment.length > 0) {
      const { error: insertError } = await supabaseAdmin
        .from('equipment')
        .insert(
          formData.equipment.map((item) => ({
            profile_id: userId,
            name: item.name,
            brand: item.brand,
            category: item.category,
            price_per_day: Number(item.pricePerDay || 0),
            price_per_hour: Number(item.pricePerHour || 0),
            condition: item.condition,
            description: item.description,
            pickup_address: formData.equipmentAddressLine,
            pickup_area: formData.equipmentArea,
            pickup_city: formData.equipmentCity,
            pickup_pincode: formData.equipmentPincode,
            is_available: true,
          }))
        )
      if (insertError) throw insertError
    }

    return { success: true }
  } catch (err: any) {
    console.error('saveProfile error:', err)
    return { error: err.message }
  }
}