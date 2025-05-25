// ~/models/user.model.ts

// Core user identity (global, never app-specific)
export interface CoreUser {
  id: string
  email: string
  avatar: string
  created_at: string
  updated_at: string
  userOf: string[] // Apps this user has joined as user
  adminOf: string[] // Apps this user has created/admins
  created_in: string // App where this core user was created
}
// App-specific user profile (e.g., for FIReUX)
export interface AppUserProfile {
  uid: string // ✅ Explicitly store the UID for convenience
  display_name: string
  handle: string
  avatar: string
  bio: string
  created_at: string
  email: string
  role?: 'user' | 'admin'
  subscription?: {
    plan: 'standard' | 'pro'
    started_at: string
  } | null
}