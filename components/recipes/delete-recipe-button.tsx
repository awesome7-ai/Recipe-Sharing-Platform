'use client'

import { useState } from 'react'
import { deleteRecipe } from '@/lib/recipes/actions'

export function DeleteRecipeButton({ recipeId }: { recipeId: string }) {
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    setError(null)
    setLoading(true)
    const result = await deleteRecipe(recipeId)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
      setShowConfirm(false)
    }
    // If successful, deleteRecipe redirects to dashboard
  }

  if (showConfirm) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-800 flex-1">
            Are you sure you want to delete this recipe? This action cannot be undone.
          </p>
          <button
            onClick={handleDelete}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
          <button
            onClick={() => {
              setShowConfirm(false)
              setError(null)
            }}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-sm text-red-800">{error}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <button
        onClick={() => setShowConfirm(true)}
        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
      >
        Delete Recipe
      </button>
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}
    </div>
  )
}

