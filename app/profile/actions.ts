'use server'

import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'
import type { ProfileData } from './page'

// ================= LOAD PROFILE =================
export async function loadProfile() {
  const { userId } = await auth()
  if (!userId) return null

  // PROFILE
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (!profile) return null

  // CREATOR
  const { data: creator } = await supabaseAdmin
    .from('creators')
    .select('*')
    .eq('profile_id', userId)
    .maybeSingle()

  // SPACE
  const { data: space } = await supabaseAdmin
    .from('spaces')
    .select('*')
    .eq('profile_id', userId)
    .maybeSingle()

  // EQUIPMENT
  const { data: equipment } = await supabaseAdmin
    .from('equipment')
    .select('*')
    .eq('profile_id', userId)

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
    equipmentAddressLine: '',
    equipmentArea: '',
    equipmentCity: '',
    equipmentPincode: '',
    equipment: equipment ?? [],
  } satisfies ProfileData
}

// ================= SAVE PROFILE =================
export async function saveProfile(formData: ProfileData) {
  const { userId } = await auth()
  if (!userId) return { error: 'Unauthorized' }

  try {
    // ================= PROFILE =================
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert({
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
      })

    if (profileError) throw profileError

    // ================= CREATOR =================
    if (formData.isCreator) {
      const { error } = await supabaseAdmin
        .from('creators')
        .upsert({
          profile_id: userId,
          category: formData.creatorCategory,
          starting_price: Number(formData.startingPrice || 0),
          experience: formData.experience,
          languages: formData.languages,
        })

      if (error) throw error
    }

    // ================= SPACE =================
    if (formData.isSpace) {
  if (formData.spaceId) {
    // UPDATE EXISTING
    await supabaseAdmin
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
  } else {
    // INSERT NEW
    await supabaseAdmin
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
  }
}

    // ================= EQUIPMENT =================
    if (formData.isEquipment) {
  // delete old
  await supabaseAdmin
    .from('equipment')
    .delete()
    .eq('profile_id', userId)

  for (const item of formData.equipment) {
    const { error } = await supabaseAdmin
      .from('equipment')
      .insert({
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
      })

    if (error) {
      console.error("EQUIPMENT ERROR:", error)
      throw error
    }
  }
}

    return { success: true }
  } catch (err: any) {
    return { error: err.message }
  }
}