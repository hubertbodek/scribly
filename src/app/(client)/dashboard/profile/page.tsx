'use client'

import DashboardView from '@/components/dashboard/view'
import { useUser } from '@/providers/auth-provider'

export default function Profile() {
  const { user } = useUser()

  return (
    <DashboardView>
      <DashboardView.Title>Profile</DashboardView.Title>
    </DashboardView>
  )
}
