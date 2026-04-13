'use server'

import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'
import type { ProfileData } from './page'

// ================= LOAD PROFILE =================
export async function loadProfile() {
  const { userId } = await auth()
  if (!userId) return null

  // ── PROFILE (id = Clerk userId directly) ──
  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (profileError || !profile) return null

  // ── CREATOR (unique per profile_id now) ──
  const { data: creator } = await supabaseAdmin
    .from('creators')
    .select('*')
    .eq('profile_id', userId)
    .maybeSingle()

  // ── SPACE (unique per profile_id now) ──
  const { data: space } = await supabaseAdmin
    .from('spaces')
    .select('*')
    .eq('profile_id', userId)
    .maybeSingle()

  // ── EQUIPMENT (multiple rows per profile) ──
  const { data: equipment } = await supabaseAdmin
    .from('equipment')
    .select('*')
    .eq('profile_id', userId)
    .order('created_at', { ascending: true })

  // Map DB rows → EquipmentItem shape used by the form
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
    // BASIC
    phone: profile.phone ?? '',
    city: profile.city ?? '',
    bio: profile.bio ?? '',
    instagramHandle: profile.instagram_handle ?? '',
    portfolioUrl: profile.portfolio_url ?? '',

    // CREATOR
    isCreator: profile.is_creator ?? false,
    creatorCategory: creator?.category ?? '',
    startingPrice: creator?.starting_price?.toString() ?? '',
    experience: creator?.experience ?? '',
    languages: creator?.languages ?? '',

    // SPACE
    isSpace: profile.is_space ?? false,
    spaceId: space?.id ?? '',
    spaceName: space?.space_name ?? '',
    spaceType: space?.space_type ?? '',
    addressLine1: space?.address_line1 ?? '',
    addressArea: space?.address_area ?? '',
    addressCity: space?.address_city ?? '',
    pincode: space?.pincode ?? '',
    googleMapsUrl: space?.google_maps_url ?? '',
    hourlyRate: space?.hourly_rate?.toString() ?? '',
    halfDayRate: space?.half_day_rate?.toString() ?? '',
    fullDayRate: space?.full_day_rate?.toString() ?? '',
    capacity: space?.capacity?.toString() ?? '',
    minBookingHours: space?.min_booking_hours?.toString() ?? '',
    amenities: space?.amenities ?? [],
    spaceRules: space?.space_rules ?? '',
    spaceDescription: space?.space_description ?? '',

    // EQUIPMENT
    isEquipment: profile.is_equipment ?? false,
    equipmentPhone: '',
    // Pre-fill pickup address from first equipment row if exists
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

  try {
    // ── PROFILE ──
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert(
        {
          id: userId,
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
        // UPDATE — safe because unique constraint guarantees 1 row
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
    }

    // ── SPACE ──
    if (formData.isSpace) {
      if (formData.spaceId) {
        const { error } = await supabaseAdmin
          .from('spaces')
          .update({
            space_name: formData.spaceName,
            space_type: formData.spaceType,
            address_line1: formData.addressLine1,
            address_area: formData.addressArea,
            address_city: formData.addressCity,
            pincode: formData.pincode,
            google_maps_url: formData.googleMapsUrl,
            hourly_rate: Number(formData.hourlyRate || 0),
            half_day_rate: Number(formData.halfDayRate || 0),
            full_day_rate: Number(formData.fullDayRate || 0),
            capacity: Number(formData.capacity || 0),
            min_booking_hours: Number(formData.minBookingHours || 1),
            amenities: formData.amenities,
            space_rules: formData.spaceRules,
            space_description: formData.spaceDescription,
          })
          .eq('id', formData.spaceId)

        if (error) throw error
      } else {
        const { error } = await supabaseAdmin
          .from('spaces')
          .insert({
            profile_id: userId,
            space_name: formData.spaceName,
            space_type: formData.spaceType,
            space_category: 'studio',
            address_line1: formData.addressLine1,
            address_area: formData.addressArea,
            address_city: formData.addressCity,
            pincode: formData.pincode,
            google_maps_url: formData.googleMapsUrl,
            hourly_rate: Number(formData.hourlyRate || 0),
            half_day_rate: Number(formData.halfDayRate || 0),
            full_day_rate: Number(formData.fullDayRate || 0),
            capacity: Number(formData.capacity || 0),
            min_booking_hours: Number(formData.minBookingHours || 1),
            amenities: formData.amenities,
            space_rules: formData.spaceRules,
            space_description: formData.spaceDescription,
          })

        if (error) throw error
      }
    }

    // ── EQUIPMENT ──
    // Strategy: delete all existing rows for this user, then batch insert fresh
    if (formData.isEquipment) {
      const { error: deleteError } = await supabaseAdmin
        .from('equipment')
        .delete()
        .eq('profile_id', userId)

      if (deleteError) throw deleteError

      if (formData.equipment.length > 0) {
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
    }

    return { success: true }
  } catch (err: any) {
    console.error('saveProfile error:', err)
    return { error: err.message }
  }
}