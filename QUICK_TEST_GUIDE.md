# Quick Authentication Test Guide

## Before Testing

### 1. Disable Email Confirmation in Supabase (Recommended for Development)

1. Go to https://app.supabase.com
2. Select your project
3. Go to **Authentication** → **Settings** → **Email Auth**
4. Toggle **OFF** "Enable email confirmations"
5. Click **Save**

This allows you to sign in immediately after signing up.

### 2. Start Your Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Quick Test Flow

### Step 1: Sign Up

1. Click **"Sign Up"** button (top right or homepage)
2. Fill in the form:
   - Username: `testuser`
   - Full Name: `Test User` (optional)
   - Email: `test@example.com`
   - Password: `password123`
3. Click **"Create account"**
4. You should be redirected to the homepage (if email confirmation is off) or sign-in page

### Step 2: Verify in Supabase

1. Go to Supabase Dashboard → **Authentication** → **Users**
2. You should see the new user with the email you used
3. Go to **Table Editor** → **profiles**
4. You should see a profile with the username and full_name

### Step 3: Sign In

1. Click **"Sign In"** button
2. Enter your email and password
3. Click **"Sign in"**
4. You should be redirected to the homepage

### Step 4: Test Error Handling

Try these scenarios:
- Sign in with wrong password → Should show error
- Sign up with duplicate email → Should show error
- Submit form with short password (< 6 chars) → Browser validation

## What Should Work

✅ User can sign up with email, password, username, and optional full name
✅ Profile is automatically created in the `profiles` table
✅ User can sign in with email and password
✅ Error messages display correctly
✅ Redirects work properly after sign up/sign in

## If Something Doesn't Work

1. Check browser console for errors
2. Check Supabase logs: **Logs** → **Postgres Logs** or **API Logs**
3. Verify `.env.local` has correct Supabase credentials
4. Make sure you've run the database migration (001_initial_schema.sql)
5. Restart your dev server after any changes

## Next: What to Build Next

After confirming auth works, you can:
- Add user session display in navigation
- Create protected routes (e.g., recipe creation page)
- Add sign out button
- Build user profile page

