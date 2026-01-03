import Link from 'next/link'
import { getUser } from '@/lib/auth/utils'
import { LogoutButton } from '@/components/auth/logout-button'

export default async function Home() {
  const user = await getUser()

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
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
          </div>
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

      {/* Hero Section */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="py-20 text-center sm:py-32">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Share & Discover
            <span className="block bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Amazing Recipes
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600">
            Join our community of home cooks and food lovers. Share your favorite recipes, discover new flavors, and save recipes to your collection.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/auth/signup"
              className="rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:from-orange-600 hover:to-red-600 hover:shadow-xl hover:scale-105"
            >
              Get Started
            </Link>
            <Link
              href="/recipes"
              className="rounded-lg border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50"
            >
              Browse Recipes
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16 rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 p-12 text-center text-white shadow-xl">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">Ready to Start Cooking?</h2>
          <p className="mb-8 text-xl text-orange-50">
            Join thousands of home cooks sharing their best recipes
          </p>
          <Link
            href="/auth/signup"
            className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-semibold text-orange-600 transition-all hover:bg-gray-100 hover:scale-105 hover:shadow-lg"
          >
            Create Your Account
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-gray-600 sm:px-6 lg:px-8">
          <p>&copy; 2024 RecipeShare. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
