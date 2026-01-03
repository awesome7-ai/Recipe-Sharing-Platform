'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/auth/utils'

export async function createRecipe(formData: FormData) {
  const user = await getUser()

  if (!user) {
    return { error: 'You must be logged in to create a recipe' }
  }

  const supabase = await createClient()

  const title = formData.get('title') as string
  const ingredients = formData.get('ingredients') as string
  const instructions = formData.get('instructions') as string
  const cookingTime = formData.get('cooking_time') as string
  const difficulty = formData.get('difficulty') as string
  const category = formData.get('category') as string

  const { data, error } = await supabase
    .from('recipes')
    .insert({
      user_id: user.id,
      title,
      ingredients,
      instructions,
      cooking_time: cookingTime ? parseInt(cookingTime, 10) : null,
      difficulty: difficulty || null,
      category: category || null,
    })
    .select()
    .single()

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  redirect(`/recipes/${data.id}`)
}

export async function updateRecipe(recipeId: string, formData: FormData) {
  const user = await getUser()

  if (!user) {
    return { error: 'You must be logged in to update a recipe' }
  }

  const supabase = await createClient()

  // Check if user owns the recipe
  const { data: existingRecipe } = await supabase
    .from('recipes')
    .select('user_id')
    .eq('id', recipeId)
    .single()

  if (!existingRecipe || existingRecipe.user_id !== user.id) {
    return { error: 'You can only update your own recipes' }
  }

  const title = formData.get('title') as string
  const ingredients = formData.get('ingredients') as string
  const instructions = formData.get('instructions') as string
  const cookingTime = formData.get('cooking_time') as string
  const difficulty = formData.get('difficulty') as string
  const category = formData.get('category') as string

  const { error } = await supabase
    .from('recipes')
    .update({
      title,
      ingredients,
      instructions,
      cooking_time: cookingTime ? parseInt(cookingTime, 10) : null,
      difficulty: difficulty || null,
      category: category || null,
    })
    .eq('id', recipeId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  revalidatePath(`/recipes/${recipeId}`)
  redirect(`/recipes/${recipeId}`)
}

export async function deleteRecipe(recipeId: string) {
  const user = await getUser()

  if (!user) {
    return { error: 'You must be logged in to delete a recipe' }
  }

  const supabase = await createClient()

  // Check if user owns the recipe
  const { data: existingRecipe } = await supabase
    .from('recipes')
    .select('user_id')
    .eq('id', recipeId)
    .single()

  if (!existingRecipe || existingRecipe.user_id !== user.id) {
    return { error: 'You can only delete your own recipes' }
  }

  const { error } = await supabase
    .from('recipes')
    .delete()
    .eq('id', recipeId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/dashboard')
  redirect('/dashboard')
}

