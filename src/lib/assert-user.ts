import { User } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export function assertUser(user: User | null): asserts user is User {
  if (!user) {
    throw redirect('/auth/signin')
  }
}
