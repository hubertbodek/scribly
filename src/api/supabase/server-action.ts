import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Database } from '@/api/types'

export const getServerActionClient = () => {
  return createServerActionClient<Database>({ cookies })
}
