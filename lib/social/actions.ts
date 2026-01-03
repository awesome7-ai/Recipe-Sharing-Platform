'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/auth/utils'

// Likes Actions
export async function toggleLike(recipeId: string) {
  const user = await getUser()

  if (!user) {
    return { error: 'You must be logged in to like recipes' }
  }

  const supabase = await createClient()

  // Check if user already liked this recipe
  const { data: existingLike } = await supabase
    .from('likes')
    .select('id')
    .eq('recipe_id', recipeId)
    .eq('user_id', user.id)
    .single()

  if (existingLike) {
    // Unlike: delete the like
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('id', existingLike.id)

    if (error) {
      return { error: error.message }
    }
  } else {
    // Like: create a new like
    const { error } = await supabase
      .from('likes')
      .insert({
        user_id: user.id,
        recipe_id: recipeId,
      })

    if (error) {
      return { error: error.message }
    }
  }

  revalidatePath(`/recipes/${recipeId}`)
  return { success: true }
}

export async function getLikeCount(recipeId: string) {
  const supabase = await createClient()

  const { count, error } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('recipe_id', recipeId)

  if (error) {
    return { count: 0 }
  }

  return { count: count || 0 }
}

export async function checkUserLiked(recipeId: string, userId: string) {
  const supabase = await createClient()

  const { data } = await supabase
    .from('likes')
    .select('id')
    .eq('recipe_id', recipeId)
    .eq('user_id', userId)
    .single()

  return { liked: !!data }
}

// Comments Actions
export async function createComment(recipeId: string, formData: FormData) {
  const user = await getUser()

  if (!user) {
    return { error: 'You must be logged in to comment' }
  }

  const supabase = await createClient()

  const content = formData.get('content') as string

  if (!content || !content.trim()) {
    return { error: 'Comment cannot be empty' }
  }

  const { error } = await supabase
    .from('comments')
    .insert({
      user_id: user.id,
      recipe_id: recipeId,
      content: content.trim(),
    })

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/recipes/${recipeId}`)
  return { success: true }
}

export async function updateComment(commentId: string, formData: FormData) {
  const user = await getUser()

  if (!user) {
    return { error: 'You must be logged in to update comments' }
  }

  const supabase = await createClient()

  // Check if user owns the comment
  const { data: existingComment } = await supabase
    .from('comments')
    .select('user_id, recipe_id')
    .eq('id', commentId)
    .single()

  if (!existingComment || existingComment.user_id !== user.id) {
    return { error: 'You can only update your own comments' }
  }

  const content = formData.get('content') as string

  if (!content || !content.trim()) {
    return { error: 'Comment cannot be empty' }
  }

  const { error } = await supabase
    .from('comments')
    .update({
      content: content.trim(),
    })
    .eq('id', commentId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/recipes/${existingComment.recipe_id}`)
  return { success: true }
}

export async function deleteComment(commentId: string) {
  const user = await getUser()

  if (!user) {
    return { error: 'You must be logged in to delete comments' }
  }

  const supabase = await createClient()

  // Check if user owns the comment
  const { data: existingComment } = await supabase
    .from('comments')
    .select('user_id, recipe_id')
    .eq('id', commentId)
    .single()

  if (!existingComment || existingComment.user_id !== user.id) {
    return { error: 'You can only delete your own comments' }
  }

  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/recipes/${existingComment.recipe_id}`)
  return { success: true }
}


