import { createClient } from '@supabase/supabase-js'

import { Database } from '@/api/schema'

const client = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const adminAuthClient = client.auth.admin
