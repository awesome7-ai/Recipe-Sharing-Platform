import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { getUser } from '@/lib/auth/utils'
import { redirect } from 'next/navigation'
import { LogoutButton } from '@/components/auth/logout-button'

export default async function SavedRecipesPage() {
  const user = await getUser()

  // Redirect to sign in if not authenticated
  if (!user) {
    redirect('/auth/signin')
  }

  const supabase = await createClient()

  // Fetch all recipes the user has liked
  const { data: likes } = await supabase
    .from('likes')
    .select('recipe_id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  let recipes: any[] = []
  let profilesMap: Record<string, { username: string | null; full_name: string | null }> = {}

  if (likes && likes.length > 0) {
    const recipeIds = likes.map((like) => like.recipe_id)

    // Fetch the recipes
    const { data: recipesData } = await supabase
      .from('recipes')
      .select('*')
      .in('id', recipeIds)
      .order('created_at', { ascending: false })

    if (recipesData) {
      recipes = recipesData

      // Fetch profiles for all recipe authors
      const userIds = [...new Set(recipes.map((r: any) => r.user_id))]
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, username, full_name')
        .in('id', userIds)

      if (profiles) {
        profilesMap = profiles.reduce((acc: any, profile: any) => {
          acc[profile.id] = { username: profile.username, full_name: profile.full_name }
          return acc
        }, {})
      }
    }
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
            <LogoutButton />
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/profile"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
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
            Back to Profile
          </Link>
          <h1 className="text-4xl font-bold text-gray-900">Saved Recipes</h1>
          <p className="mt-2 text-gray-600">All the recipes you've liked</p>
        </div>

        {/* Recipes Grid */}
        {recipes && recipes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe: any) => {
              const author = profilesMap[recipe.user_id]
              const authorName = author?.full_name || author?.username || 'Anonymous'

              return (
                <div
                  key={recipe.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div className="p-6">
                    <h2 className="mb-2 text-2xl font-semibold text-gray-900">{recipe.title}</h2>
                    
                    <div className="mb-4 flex flex-wrap gap-2 text-sm text-gray-600">
                      {recipe.category && (
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">
                          {recipe.category}
                        </span>
                      )}
                      {recipe.difficulty && (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                          {recipe.difficulty}
                        </span>
                      )}
                      {recipe.cooking_time && (
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-700">
                          {recipe.cooking_time} min
                        </span>
                      )}
                    </div>

                    <p className="mb-4 line-clamp-3 text-gray-600">
                      {recipe.ingredients && recipe.ingredients.length > 0
                        ? `${recipe.ingredients.substring(0, 150)}${recipe.ingredients.length > 150 ? '...' : ''}`
                        : 'No details available.'}
                    </p>

                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <div className="text-sm text-gray-500">
                        By <span className="font-medium text-gray-700">{authorName}</span>
                      </div>
                      <Link
                        href={`/recipes/${recipe.id}`}
                        className="text-sm font-medium text-orange-600 hover:text-orange-500"
                      >
                        View Recipe →
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-lg bg-gray-50 border border-gray-200 p-12 text-center">
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <p className="text-gray-600 mb-2">No saved recipes yet</p>
            <p className="text-sm text-gray-500 mb-6">
              Like recipes to save them here for easy access later.
            </p>
            <Link
              href="/dashboard"
              className="inline-block rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-white font-semibold transition-all hover:from-orange-600 hover:to-red-600 hover:shadow-lg"
            >
              Browse Recipes
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}



