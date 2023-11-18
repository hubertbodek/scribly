import { PersonIcon, Pencil1Icon, GearIcon } from '@radix-ui/react-icons'

import SidebarItem from './sidebar-item'

export default function Sidebar() {
  return (
    <aside className="w-64 flex flex-col border-r pr-2 mr-2">
      <h2 className="mb-4 px-4 text-lg font-semibold tracking-tight">Dashboard</h2>
      <ul className="w-full flex flex-col gap-1">
        <SidebarItem href="/dashboard/my-posts">
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
