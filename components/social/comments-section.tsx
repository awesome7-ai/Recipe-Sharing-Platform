'use client'

import { useState } from 'react'
import { createComment, deleteComment } from '@/lib/social/actions'

interface Comment {
  id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  profiles: {
    username: string
    full_name: string | null
  }
}

interface CommentsSectionProps {
  recipeId: string
  initialComments: Comment[]
  currentUserId: string | null
}

export function CommentsSection({ recipeId, initialComments, currentUserId }: CommentsSectionProps) {
  const [comments, setComments] = useState(initialComments)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData()
    formData.append('content', content)

    const result = await createComment(recipeId, formData)

    if (result.error) {
      setError(result.error)
      setLoading(false)
    } else {
      setContent('')
      setLoading(false)
      // Refresh will happen via revalidation
      window.location.reload()
    }
  }

  async function handleDelete(commentId: string) {
    if (!confirm('Are you sure you want to delete this comment?')) {
      return
    }

    const result = await deleteComment(commentId)

    if (!result.error) {
      setComments(comments.filter((c) => c.id !== commentId))
    }
  }

  const authorName = (comment: Comment) => comment.profiles.full_name || comment.profiles.username || 'Anonymous'

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-900">Comments ({comments.length})</h2>

      {/* Comment Form (only for authenticated users) */}
      {currentUserId && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-red-50 border border-red-200 p-4">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a comment..."
              rows={4}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-colors cursor-text resize-y"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-2 text-white font-semibold transition-all hover:from-orange-600 hover:to-red-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      )}

      {!currentUserId && (
        <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 text-center">
          <p className="text-gray-600 text-sm">
            <a href="/auth/signin" className="text-orange-600 hover:text-orange-500 font-medium">
              Sign in
            </a>{' '}
            to leave a comment
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="border-b border-gray-200 pb-4 last:border-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-gray-900">{authorName(comment)}</span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.created_at).toLocaleDateString()}
                      {comment.updated_at !== comment.created_at && ' (edited)'}
                    </span>
                  </div>
                  <p className="text-gray-700 whitespace-pre-wrap">{comment.content}</p>
                </div>
                {currentUserId === comment.user_id && (
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="ml-4 text-sm text-red-600 hover:text-red-700 transition-colors"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}


