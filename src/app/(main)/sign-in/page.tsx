'use client'

import { Button } from '@/components/ui/button'
import useAuth from '@/hooks/useAuth'

const SignInPage = () => {
  const { signInWithEmail } = useAuth()

  return (
    <main className="container">
      <h1 className="text-h1">Sign in</h1>
    </main>
  )
}

export default SignInPage
