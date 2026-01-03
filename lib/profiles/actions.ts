'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/auth/utils'

export async function updateProfile(formData: FormData) {
  const user = await getUser()

  if (!user) {
    return { error: 'You must be logged in to update your profile' }
  }

  const supabase = await createClient()

  const username = formData.get('username') as string
  const fullName = formData.get('full_name') as string

  // Check if username is already taken by another user
  const { data: existingProfiles } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', username)
    .neq('id', user.id)

  if (existingProfiles && existingProfiles.length > 0) {
    return { error: 'Username is already taken' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      username,
      full_name: fullName || null,
    })
    .eq('id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/profile')
  revalidatePath('/dashboard')
  return { success: true }
}

