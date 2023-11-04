import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

import { Database } from '@/api/types'

export const getServerClient = () => {
  return createServerComponentClient<Database>({ cookies })
}

export const getSession = async () => {
  const supabase = getServerClient()

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    return session
  } catch (error) {
    console.error('Error:', error)

    return null
  }
}

export const getUser = async () => {
  const session = await getSession()

  if (!session) {
    return null
  }

  return session.user
}
