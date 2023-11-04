import Link from 'next/link'

import { getSession } from '@/api/supabase/server'
import { Button } from '@/components/ui/button'
import Logo from '@/components/layout/header/logo'
import UserOptions from '@/components/layout/header/user-options'

export default async function Header() {
  const session = await getSession()

  return (
    <header className="h-20 bg-primary">
      <nav className="container mx-auto text-primary-foreground flex items-center h-full justify-between">
        <Logo />
        <div className="flex items-center gap-4">
          <Link href="/articles">Articles</Link>
          {session ? <UserOptions /> : <AuthButtons />}
        </div>
      </nav>
    </header>
  )
}

const AuthButtons = () => (
  <>
    <Button asChild variant="outline">
      <Link href="/sign-up">Join</Link>
    </Button>
    <Button asChild variant="outline">
      <Link href="/sign-in">Sign In</Link>
    </Button>
  </>
)
