# Supabase Setup Guide

This guide will walk you through setting up Supabase in your Next.js project.

## Step 1: Get Your Supabase Credentials

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Navigate to **Settings** → **API**
3. You'll find two important values:
   - **Project URL** - This is your `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** - This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 2: Create Environment Variables File

1. In the root of your project, create a file named `.env.local`
2. Add the following content (replace with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important Notes:**
- Never commit `.env.local` to git (it's already in `.gitignore`)
- The `NEXT_PUBLIC_` prefix is required for these variables to be accessible in the browser
- Restart your development server after creating/updating `.env.local`

## Step 3: Verify Installation

The following packages have been installed:
- `@supabase/supabase-js` - Core Supabase client library
- `@supabase/ssr` - Server-side rendering support for Next.js App Router

## Step 4: Project Structure

The Supabase setup includes:

```
lib/
  supabase/
    client.ts    # Browser/client-side Supabase client
    server.ts    # Server-side Supabase client (for Server Components, API routes)
    types.ts     # TypeScript type definitions for your database
```

## Step 5: Usage Examples

### In Client Components

```typescript
'use client'

import { createClient } from '@/lib/supabase/client'

export default function ClientComponent() {
  const supabase = createClient()
  
  // Use supabase client for client-side operations
  const fetchRecipes = async () => {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .limit(10)
    
    if (error) console.error(error)
    return data
  }
  
  return <div>...</div>
}
```

### In Server Components

```typescript
import { createClient } from '@/lib/supabase/server'

export default async function ServerComponent() {
  const supabase = await createClient()
  
  // Use supabase client for server-side operations
  const { data: recipes } = await supabase
    .from('recipes')
    .select('*')
    .limit(10)
  
  return <div>...</div>
}
```

### In API Routes

```typescript
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  
  return NextResponse.json(data)
}
```

## Next Steps

1. ✅ Install Supabase packages (done)
2. ✅ Create Supabase client files (done)
3. ⬜ Add your environment variables to `.env.local`
4. ⬜ Test the connection by creating a simple page that fetches data
5. ⬜ Implement authentication flow
6. ⬜ Start building your recipe features!

## Troubleshooting

- **"Missing API URL" or "Missing API Key" errors**: Make sure your `.env.local` file exists and contains the correct values
- **"Invalid API key" errors**: Double-check that you copied the `anon/public` key (not the `service_role` key)
- **Restart your dev server** after updating environment variables

