'use client'

import { getBrowserClient } from '@/api/supabase/browser'
import { useRouter } from 'next/navigation'
import Logo from './logo'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Header() {
  const router = useRouter()
  const supabase = getBrowserClient()

  async function signUpNewUser() {
    const { data, error } = await supabase.auth.signUp({
      email: 'example@email.com',
      password: 'example-password',
    })
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()

    router.refresh()
  }

  async function signInWithEmail() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: 'example@email.com',
      password: 'example-password',
    })

    router.refresh()
  }

  return (
    <header className="h-20 bg-primary">
      <nav className="container mx-auto text-primary-foreground flex items-center h-full justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <Link href="/articles">Articles</Link>
          <Button onClick={signUpNewUser} variant="outline">
            Sign Up
          </Button>
          <Button onClick={signInWithEmail} variant="outline">
            Sign In
          </Button>
        </div>
      </nav>
    </header>
  )
}
