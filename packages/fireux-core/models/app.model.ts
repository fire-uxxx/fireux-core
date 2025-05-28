export interface App {
  id: string
  app_name: string // Set from runtimeConfig.public.appName
  created_at: string
  created_by: string
  admin_ids: string[] // UIDs of admin users
}
