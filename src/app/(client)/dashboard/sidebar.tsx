import Link from 'next/link'
import { PersonIcon, Pencil1Icon, GearIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'

export default function Sidebar() {
  return (
    <aside className="w-64 flex flex-col border-r pr-2 mr-2">
      <h2 className="mb-4 px-4 text-lg font-semibold tracking-tight">Dashboard</h2>
      <ul className="w-full flex flex-col gap-2">
        <SidebarItem href="/dashboard">
          <Pencil1Icon />
          My posts
        </SidebarItem>
        <SidebarItem href="/dashboard/profile">
          <PersonIcon />
          Profile
        </SidebarItem>
        <SidebarItem href="/dashboard/settings">
          <GearIcon />
          Settings
        </SidebarItem>
      </ul>
    </aside>
  )
}

interface SidebarItemProps {
  href: string
  children: React.ReactNode
}

const SidebarItem = ({ href, children }: SidebarItemProps) => {
  return (
    <li className="w-full">
      <Button asChild variant="ghost" className="flex items-center justify-start gap-2">
        <Link href={href}>{children}</Link>
      </Button>
    </li>
  )
}
