'use client'

import { useState } from 'react'
import { toggleLike } from '@/lib/social/actions'

interface LikeButtonProps {
  recipeId: string
  initialLikeCount: number
  initialLiked: boolean
}

export function LikeButton({ recipeId, initialLikeCount, initialLiked }: LikeButtonProps) {
  const [likeCount, setLikeCount] = useState(initialLikeCount)
  const [liked, setLiked] = useState(initialLiked)
  const [loading, setLoading] = useState(false)

  async function handleToggleLike() {
    setLoading(true)
    const result = await toggleLike(recipeId)

    if (!result.error) {
      // Optimistically update UI
      setLiked(!liked)
      setLikeCount(liked ? likeCount - 1 : likeCount + 1)
    }
    setLoading(false)
  }

  return (
    <button
      onClick={handleToggleLike}
      disabled={loading}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
        liked
          ? 'bg-red-100 text-red-700 hover:bg-red-200'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <svg
        className={`w-5 h-5 ${liked ? 'fill-current' : ''}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{likeCount}</span>
    </button>
  )
}


