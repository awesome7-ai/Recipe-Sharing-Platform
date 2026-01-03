// Recipe Card Skeleton
export function RecipeCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm animate-pulse">
      <div className="p-6">
        <div className="h-7 bg-gray-200 rounded mb-2 w-3/4"></div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div className="h-6 bg-gray-100 rounded-full w-20"></div>
          <div className="h-6 bg-gray-100 rounded-full w-16"></div>
          <div className="h-6 bg-gray-100 rounded-full w-16"></div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-4 bg-gray-200 rounded w-20"></div>
        </div>
      </div>
    </div>
  )
}

// Recipe Detail Skeleton
export function RecipeDetailSkeleton() {
  return (
    <div className="rounded-2xl bg-white shadow-sm p-8 animate-pulse">
      <div className="mb-8">
        <div className="h-10 bg-gray-200 rounded mb-4 w-3/4"></div>
        
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="h-8 bg-gray-100 rounded-full w-24"></div>
          <div className="h-8 bg-gray-100 rounded-full w-20"></div>
          <div className="h-8 bg-gray-100 rounded-full w-28"></div>
        </div>

        <div className="h-4 bg-gray-200 rounded w-48"></div>
      </div>

      <div className="mb-8 pb-8 border-b border-gray-200">
        <div className="h-7 bg-gray-200 rounded mb-4 w-32"></div>
        <div className="bg-gray-50 rounded-lg p-6 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>

      <div>
        <div className="h-7 bg-gray-200 rounded mb-4 w-32"></div>
        <div className="bg-gray-50 rounded-lg p-6 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    </div>
  )
}

// Profile Form Skeleton
export function ProfileFormSkeleton() {
  return (
    <div className="rounded-2xl bg-white shadow-sm p-8 animate-pulse space-y-6">
      <div>
        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
      <div>
        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
      <div className="rounded-lg bg-gray-50 p-4 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-40"></div>
        <div className="h-3 bg-gray-200 rounded w-32"></div>
        <div className="h-3 bg-gray-200 rounded w-36"></div>
      </div>
      <div className="flex gap-4 pt-4">
        <div className="h-12 bg-gray-200 rounded flex-1"></div>
        <div className="h-12 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  )
}

// Recipe Form Skeleton
export function RecipeFormSkeleton() {
  return (
    <div className="rounded-2xl bg-white shadow-sm p-8 animate-pulse space-y-6">
      <div>
        <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
      <div>
        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
      <div>
        <div className="h-4 bg-gray-200 rounded w-28 mb-2"></div>
        <div className="h-32 bg-gray-200 rounded w-full"></div>
      </div>
      <div>
        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
        <div className="h-40 bg-gray-200 rounded w-full"></div>
      </div>
      <div className="flex gap-4 pt-4">
        <div className="h-12 bg-gray-200 rounded flex-1"></div>
        <div className="h-12 bg-gray-200 rounded w-24"></div>
      </div>
    </div>
  )
}

// Recipe Grid Skeleton (for dashboard)
export function RecipeGridSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <RecipeCardSkeleton key={i} />
      ))}
    </div>
  )
}


