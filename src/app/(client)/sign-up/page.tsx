'use client'

import { Button } from '@/components/ui/button'
import useAuth from '@/hooks/useAuth'

const SignUpPage = () => {
  const { signUpNewUser } = useAuth()

  return (
    <main className="container">
      <h1 className="text-3xl">Sign Up</h1>
      <Button onClick={signUpNewUser}>Sign Up</Button>
    </main>
  )
}

export default SignUpPage
