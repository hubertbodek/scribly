import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { Database } from '@/api/types'

export const getBrowserClient = () => createClientComponentClient<Database>()

export const getUser = async () => await getBrowserClient().auth.getUser()
