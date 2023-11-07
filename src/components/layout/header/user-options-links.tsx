'use client'

import Link from 'next/link'

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import useAuth from '@/hooks/useAuth'

export default function UserOptionsLinks() {
  const { signOut } = useAuth()

  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/scribe">Scribe</Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => signOut({ redirectTo: '/' })}>Log out</DropdownMenuItem>
    </>
  )
}
