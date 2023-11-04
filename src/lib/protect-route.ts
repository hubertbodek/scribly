import { getServerClient, getSession } from '@/api/supabase/server'
import { redirect } from 'next/navigation'

interface Options {
  redirectUrl?: string
}

export const protectRoute = async (options?: Options) => {
  const session = await getSession()
  const url = options?.redirectUrl || '/sign-in'

  if (!session) {
    redirect(url)
  }
}
