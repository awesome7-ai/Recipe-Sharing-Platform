# Supabase Database Setup

This guide will help you set up the database schema for the Recipe Sharing Platform.

## Steps to Set Up the Database

1. **Open Supabase Dashboard**
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor

2. **Run the Migration**
   - Open the file: `supabase/migrations/001_initial_schema.sql`
   - Copy the entire contents of the file
   - Paste it into the SQL Editor in Supabase
   - Click "Run" to execute the migration

3. **Verify the Tables**
   - Go to the Table Editor in Supabase
   - You should see the following tables:
     - `profiles`
     - `recipes`

4. **Verify RLS Policies**
   - Go to Authentication > Policies in Supabase
   - Verify that Row Level Security is enabled for all tables
   - Check that the policies are created correctly

## Database Schema Overview

### Tables Created

1. **profiles** - User profile information
   - `id` (UUID, Primary Key, References auth.users)
   - `username` (TEXT, Unique, Not Null)
   - `full_name` (TEXT, Nullable)
   - `created_at` (TIMESTAMP WITH TIME ZONE)
   - `updated_at` (TIMESTAMP WITH TIME ZONE)
   - Links to `auth.users` table
   - Automatically updated timestamp on changes

2. **recipes** - Recipe data
   - `id` (UUID, Primary Key)
   - `created_at` (TIMESTAMP WITH TIME ZONE)
   - `user_id` (UUID, References auth.users)
   - `title` (TEXT, Not Null)
   - `ingredients` (TEXT, Not Null) - Store ingredients as text
   - `instructions` (TEXT, Not Null) - Store instructions as text
   - `cooking_time` (INTEGER, Nullable) - Cooking time in minutes
   - `difficulty` (TEXT, Nullable) - e.g., "Easy", "Medium", "Hard"
   - `category` (TEXT, Nullable) - Recipe category

## Row Level Security (RLS) Policies

- **Profiles**: 
  - Public read access
  - Users can only insert/update their own profile

- **Recipes**: 
  - Public read access (everyone can view recipes)
  - Only authenticated users can create recipes
  - Only recipe owners can update/delete their recipes

## Automatic Profile Creation

When a new user signs up, a profile is automatically created via a database trigger. The username is extracted from the email if not provided in the metadata.

## Indexes Created

For better query performance, indexes are created on:
- `recipes.user_id` - For filtering recipes by user
- `recipes.category` - For filtering recipes by category
- `recipes.created_at` - For sorting recipes by date (descending order)
