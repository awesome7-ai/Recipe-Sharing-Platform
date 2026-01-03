'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { updateRecipe } from '@/lib/recipes/actions'

interface Recipe {
  id: string
  title: string
  ingredients: string
  instructions: string
  cooking_time: number | null
  difficulty: string | null
  category: string | null
}

export function EditRecipeForm({ recipe }: { recipe: Recipe }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await updateRecipe(recipe.id, formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Recipe Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={recipe.title}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-colors cursor-text"
          placeholder="e.g., Chocolate Chip Cookies"
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
          Category (Optional)
        </label>
        <input
          id="category"
          name="category"
          type="text"
          defaultValue={recipe.category || ''}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-colors cursor-text"
          placeholder="e.g., Dessert, Main Course, Appetizer"
        />
      </div>

      {/* Difficulty and Cooking Time */}
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
            Difficulty (Optional)
          </label>
          <select
            id="difficulty"
            name="difficulty"
            defaultValue={recipe.difficulty || ''}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-colors cursor-pointer"
          >
            <option value="">Select difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
        </div>

        <div>
          <label htmlFor="cooking_time" className="block text-sm font-medium text-gray-700 mb-2">
            Cooking Time (Optional)
          </label>
          <input
            id="cooking_time"
            name="cooking_time"
            type="number"
            min="1"
            defaultValue={recipe.cooking_time || ''}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-colors cursor-text"
            placeholder="Minutes"
          />
        </div>
      </div>

      {/* Ingredients */}
      <div>
        <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
          Ingredients <span className="text-red-500">*</span>
        </label>
        <textarea
          id="ingredients"
          name="ingredients"
          required
          rows={6}
          defaultValue={recipe.ingredients}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-colors cursor-text resize-y"
          placeholder="List all ingredients, one per line or separated by commas..."
        />
        <p className="mt-1 text-xs text-gray-500">List ingredients separated by lines or commas</p>
      </div>

      {/* Instructions */}
      <div>
        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
          Instructions <span className="text-red-500">*</span>
        </label>
        <textarea
          id="instructions"
          name="instructions"
          required
          rows={8}
          defaultValue={recipe.instructions}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-colors cursor-text resize-y"
          placeholder="Provide step-by-step cooking instructions..."
        />
        <p className="mt-1 text-xs text-gray-500">Provide detailed step-by-step instructions</p>
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-white font-semibold transition-all hover:from-orange-600 hover:to-red-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Updating Recipe...' : 'Update Recipe'}
        </button>
        <Link
          href={`/recipes/${recipe.id}`}
          className="rounded-lg border-2 border-gray-300 px-6 py-3 text-gray-700 font-semibold transition-all hover:border-gray-400 hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}



