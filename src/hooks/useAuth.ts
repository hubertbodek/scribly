import { getBrowserClient } from '@/api/supabase/browser'
import { useRouter } from 'next/navigation'

export default function useAuth() {
  const supabase = getBrowserClient()
  const router = useRouter()

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'example@email.com',
      password: 'example-password',
    })

    router.refresh()
    router.push('/')
  }

  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: 'example@email.com',
      password: 'example-password',
    })
  }

  async function signOut(options?: { redirectTo?: string }) {
    const { error } = await supabase.auth.signOut()

    router.refresh()

    if (options?.redirectTo) {
      router.push(options.redirectTo)
    }
  }

  return {
    signInWithEmail,
    signUpNewUser,
    signOut,
  }
}
