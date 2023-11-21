'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface SidebarItemProps {
  href: string
  children: React.ReactNode
}

export default function SidebarItem({ href, children }: SidebarItemProps) {
  const pathname = usePathname()

  const isActive = pathname === href

  return (
    <li className="w-full">
      <Button
        asChild
        variant="link"
        className={cn('flex items-center justify-start gap-2', isActive && 'bg-gray-100')}
      >
        <Link href={href}>{children}</Link>
      </Button>
    </li>
  )
}
