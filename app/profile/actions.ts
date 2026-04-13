'use server'

import { auth } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'
import type { ProfileData } from './page'  // move your interface to be exported

export async function loadProfile() {
  const { userId } = await auth()
  if (!userId) return null

  const { data } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('clerk_user_id', userId)
    .single()

  if (!data) return null

  // map snake_case DB columns back to camelCase for your form
  return {
    phone: data.phone ?? '',
    city: data.city ?? '',
    bio: data.bio ?? '',
    instagramHandle: data.instagram_handle ?? '',
    portfolioUrl: data.portfolio_url ?? '',
    isCreator: data.is_creator ?? false,
    creatorCategory: data.creator_category ?? '',
    startingPrice: data.starting_price?.toString() ?? '',
    experience: data.experience ?? '',
    languages: data.languages ?? '',
    isSpace: data.is_space ?? false,
    spaceName: data.space_name ?? '',
    spaceType: data.space_type ?? '',
    addressLine1: data.address_line1 ?? '',
    addressArea: data.address_area ?? '',
    addressCity: data.address_city ?? '',
    pincode: data.pincode ?? '',
    googleMapsUrl: data.google_maps_url ?? '',
    hourlyRate: data.hourly_rate?.toString() ?? '',
    halfDayRate: data.half_day_rate?.toString() ?? '',
    fullDayRate: data.full_day_rate?.toString() ?? '',
    capacity: data.capacity?.toString() ?? '',
    minBookingHours: data.min_booking_hours?.toString() ?? '',
    amenities: data.amenities ?? [],
    spaceRules: data.space_rules ?? '',
    spaceDescription: data.space_description ?? '',
    isEquipment: data.is_equipment ?? false,
    equipmentPhone: data.equipment_phone ?? '',
    equipmentAddressLine: data.equipment_address_line ?? '',
    equipmentArea: data.equipment_area ?? '',
    equipmentCity: data.equipment_city ?? '',
    equipmentPincode: data.equipment_pincode ?? '',
    equipment: data.equipment ?? [],
  } satisfies ProfileData
}

export async function saveProfile(formData: ProfileData) {
  const { userId } = await auth()
  if (!userId) return { error: 'Unauthorized' }

  const { error } = await supabaseAdmin
    .from('profiles')
    .upsert({
      clerk_user_id: userId,
      phone: formData.phone,
      city: formData.city,
      bio: formData.bio,
      instagram_handle: formData.instagramHandle,
      portfolio_url: formData.portfolioUrl,
      is_creator: formData.isCreator,
      creator_category: formData.creatorCategory,
      starting_price: formData.startingPrice || null,
      experience: formData.experience,
      languages: formData.languages,
      is_space: formData.isSpace,
      space_name: formData.spaceName,
      space_type: formData.spaceType,
      address_line1: formData.addressLine1,
      address_area: formData.addressArea,
      address_city: formData.addressCity,
      pincode: formData.pincode,
      google_maps_url: formData.googleMapsUrl,
      hourly_rate: formData.hourlyRate || null,
      half_day_rate: formData.halfDayRate || null,
      full_day_rate: formData.fullDayRate || null,
      capacity: formData.capacity || null,
      min_booking_hours: formData.minBookingHours || null,
      amenities: formData.amenities,
      space_rules: formData.spaceRules,
      space_description: formData.spaceDescription,
      is_equipment: formData.isEquipment,
      equipment_phone: formData.equipmentPhone,
      equipment_address_line: formData.equipmentAddressLine,
      equipment_area: formData.equipmentArea,
      equipment_city: formData.equipmentCity,
      equipment_pincode: formData.equipmentPincode,
      equipment: formData.equipment,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'clerk_user_id' })

  if (error) return { error: error.message }
  return { success: true }
}