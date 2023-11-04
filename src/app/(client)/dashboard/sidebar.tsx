import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
  return (
    <aside className="w-64 flex flex-col">
      <Link href="/dashboard">Profile</Link>
      <Link href="/dashboard/settings">Settings</Link>
    </aside>
  )
}
