# Testing Authentication Flow

This guide will help you test the authentication flow in your Recipe Sharing Platform.

## Prerequisites

1. **Disable Email Confirmation (for Development)**
   - Go to your Supabase dashboard: https://app.supabase.com
   - Navigate to: **Authentication** → **Settings** → **Email Auth**
   - Toggle off **"Enable email confirmations"**
   - This allows immediate sign-in after sign-up during development

2. **Ensure Development Server is Running**
   ```bash
   npm run dev
   ```

## Testing Steps

### 1. Test Sign Up Flow

1. Navigate to `http://localhost:3000/auth/signup` (or click "Sign Up" from homepage)

2. Fill out the sign-up form:
   - **Username**: Choose a unique username (e.g., `testuser`)
   - **Full Name**: Optional (e.g., `Test User`)
   - **Email**: Use a valid email (e.g., `test@example.com`)
   - **Password**: At least 6 characters (e.g., `password123`)

3. Click **"Create account"**

4. **Expected Result**:
   - If email confirmation is **disabled**: You should be redirected to sign-in page
   - If email confirmation is **enabled**: You'll see a message to check your email

5. Check Supabase Dashboard:
   - Go to **Authentication** → **Users**
   - You should see the new user created
   - Go to **Table Editor** → **profiles**
   - You should see a profile entry with the username and full_name

### 2. Test Sign In Flow

1. Navigate to `http://localhost:3000/auth/signin` (or click "Sign In" from homepage)

2. Enter your credentials:
   - **Email**: The email you used to sign up
   - **Password**: The password you used

3. Click **"Sign in"**

4. **Expected Result**:
   - You should be redirected to the homepage (`/`)
   - (Once we add user state, you'll see different UI for authenticated users)

### 3. Test Error Handling

#### Invalid Credentials
1. Try signing in with wrong email or password
2. **Expected**: Red error message should appear

#### Duplicate Email/Username
1. Try signing up with an email/username that already exists
2. **Expected**: Error message indicating the email/username is already in use

#### Validation Errors
1. Try submitting the sign-up form with:
   - Password less than 6 characters
   - Invalid email format
   - Missing required fields
2. **Expected**: Browser validation or error messages

## Troubleshooting

### Issue: "User already registered"
- Solution: The email is already in use. Try a different email or delete the user from Supabase dashboard

### Issue: "Invalid login credentials"
- Solution: Double-check your email and password. Make sure you signed up successfully first.

### Issue: Profile not created
- Check if the database trigger is working:
  - Go to Supabase SQL Editor
  - Run: `SELECT * FROM profiles WHERE id = 'your-user-id'`
  - If no profile exists, check the trigger in the migration file

### Issue: "Failed to fetch" or connection errors
- Verify your `.env.local` file has correct Supabase credentials
- Check that your Supabase project is active
- Restart your development server after updating `.env.local`

## Next Steps After Testing

Once authentication is working, you can:
1. Add middleware to protect routes
2. Create a user dashboard/profile page
3. Add sign-out functionality to navigation
4. Show user-specific content based on auth state

