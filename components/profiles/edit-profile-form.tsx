'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { updateProfile } from '@/lib/profiles/actions'

interface Profile {
  id: string
  username: string
  full_name: string | null
  created_at: string
  updated_at: string
}

export function EditProfileForm({ profile, userEmail }: { profile: Profile; userEmail: string }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    const result = await updateProfile(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    } else if (result?.success) {
      setSuccess(true)
      setLoading(false)
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      {success && (
        <div className="rounded-lg bg-green-50 border border-green-200 p-4">
          <p className="text-sm text-green-800">Profile updated successfully!</p>
        </div>
      )}

      {/* Username */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          defaultValue={profile.username}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-colors cursor-text"
          placeholder="johndoe"
        />
      </div>

      {/* Full Name */}
      <div>
        <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
          Full Name
        </label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          defaultValue={profile.full_name || ''}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-colors cursor-text"
          placeholder="John Doe"
        />
      </div>

      {/* Account Info */}
      <div className="rounded-lg bg-gray-50 p-4 space-y-2">
        <p className="text-sm font-medium text-gray-700">Account Information</p>
        <p className="text-xs text-gray-500">
          Email: <span className="font-medium text-gray-700">{userEmail}</span>
        </p>
        <p className="text-xs text-gray-500">
          Member since: {new Date(profile.created_at).toLocaleDateString()}
        </p>
        {profile.updated_at && (
          <p className="text-xs text-gray-500">
            Last updated: {new Date(profile.updated_at).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-6 py-3 text-white font-semibold transition-all hover:from-orange-600 hover:to-red-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
        <Link
          href="/dashboard"
          className="rounded-lg border-2 border-gray-300 px-6 py-3 text-gray-700 font-semibold transition-all hover:border-gray-400 hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>
    </form>
  )
}

