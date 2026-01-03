import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/auth/utils'
import { LogoutButton } from '@/components/auth/logout-button'
import { DeleteRecipeButton } from '@/components/recipes/delete-recipe-button'
import { LikeButton } from '@/components/social/like-button'
import { CommentsSection } from '@/components/social/comments-section'
import { getLikeCount, checkUserLiked } from '@/lib/social/actions'
import { notFound } from 'next/navigation'

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const user = await getUser()
  const supabase = await createClient()

  // Fetch recipe
  const { data: recipe, error: recipeError } = await supabase
    .from('recipes')
    .select('*')
    .eq('id', id)
    .single()

  if (recipeError || !recipe) {
    notFound()
  }

  // Fetch recipe author profile
  const { data: authorProfile } = await supabase
    .from('profiles')
    .select('username, full_name')
    .eq('id', recipe.user_id)
    .single()

  const authorName = authorProfile?.full_name || authorProfile?.username || 'Anonymous'

  // Fetch like count and user's like status
  const { count: likeCount } = await getLikeCount(id)
  const { liked } = user ? await checkUserLiked(id, user.id) : { liked: false }

  // Fetch comments with user profiles
  const { data: commentsData } = await supabase
    .from('comments')
    .select('id, user_id, content, created_at, updated_at')
    .eq('recipe_id', id)
    .order('created_at', { ascending: true })

  // Fetch profiles for comment authors
  let comments: Array<{
    id: string
    user_id: string
    content: string
    created_at: string
    updated_at: string
    profiles: { username: string; full_name: string | null }
  }> = []

  if (commentsData && commentsData.length > 0) {
    const userIds = [...new Set(commentsData.map((c) => c.user_id))]
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, username, full_name')
      .in('id', userIds)

    const profilesMap = profiles?.reduce((acc: any, profile: any) => {
      acc[profile.id] = { username: profile.username, full_name: profile.full_name }
      return acc
    }, {}) || {}

    comments = commentsData.map((comment) => ({
      ...comment,
      profiles: profilesMap[comment.user_id] || { username: 'Anonymous', full_name: null },
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-900">RecipeShare</span>
          </Link>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 sm:block"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 sm:block"
                >
                  Profile
                </Link>
                <Link
                  href="/saved"
                  className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 sm:block"
                >
                  Saved
                </Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 sm:block"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 text-sm font-medium text-white transition-all hover:from-orange-600 hover:to-red-600 hover:shadow-lg"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
        >
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Dashboard
        </Link>

        <div className="rounded-2xl bg-white shadow-sm p-8">
          {/* Recipe Header */}
          <div className="mb-8">
            <div className="flex items-start justify-between mb-4">
              <h1 className="text-4xl font-bold text-gray-900 flex-1">{recipe.title}</h1>
              {user && user.id === recipe.user_id && (
                <div className="flex gap-3 ml-4">
                  <Link
                    href={`/recipes/${recipe.id}/edit`}
                    className="px-4 py-2 bg-orange-500 text-white text-sm font-medium rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3 mb-4">
              {recipe.category && (
                <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
                  {recipe.category}
                </span>
              )}
              {recipe.difficulty && (
                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  {recipe.difficulty}
                </span>
              )}
              {recipe.cooking_time && (
                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  ⏱️ {recipe.cooking_time} minutes
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <span>By </span>
                <span className="font-medium text-gray-900 ml-1">{authorName}</span>
                <span className="mx-2">•</span>
                <span>{new Date(recipe.created_at).toLocaleDateString()}</span>
              </div>
              {user && <LikeButton recipeId={id} initialLikeCount={likeCount} initialLiked={liked} />}
            </div>
          </div>

          {/* Ingredients Section */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Ingredients</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {recipe.ingredients}
              </div>
            </div>
          </div>

          {/* Instructions Section */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Instructions</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {recipe.instructions}
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mb-8">
            <CommentsSection
              recipeId={id}
              initialComments={comments || []}
              currentUserId={user?.id || null}
            />
          </div>

          {/* Delete Section (only for recipe owner) */}
          {user && user.id === recipe.user_id && (
            <div className="pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Danger Zone</h3>
              <p className="text-sm text-gray-600 mb-4">Permanently delete this recipe. This action cannot be undone.</p>
              <DeleteRecipeButton recipeId={recipe.id} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

