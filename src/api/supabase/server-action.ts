import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Database } from '@/api/schema'

export const getServerActionClient = () => {
  return createServerActionClient<Database>({ cookies })
}
