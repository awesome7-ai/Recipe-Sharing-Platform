'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function signUp(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const username = formData.get('username') as string
  const fullName = formData.get('full_name') as string

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        full_name: fullName || null,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  // Update profile with username and full_name if user was created
  // The trigger creates the profile, but we update it to ensure username and full_name are set
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        username,
        full_name: fullName || null,
      })
      .eq('id', data.user.id)

    // If profile doesn't exist yet (trigger might be delayed), insert it
    if (profileError) {
      await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          username,
          full_name: fullName || null,
        })
    }
  }

  revalidatePath('/', 'layout')
  
  // If email confirmation is disabled, user is already signed in
  // If email confirmation is enabled, redirect to sign in
  if (data.session) {
    redirect('/dashboard')
  } else {
    redirect('/auth/signin?message=Check your email to confirm your account')
  }
}

export async function signIn(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/auth/signin')
}

