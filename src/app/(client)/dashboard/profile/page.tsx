import DashboardView from '@/components/dashboard/view'
import { getServerClient, getUser } from '@/api/supabase/server'
import { assertUser } from '@/lib/assert-user'

const supabase = getServerClient()

export default async function Profile() {
  const user = await getUser()

  assertUser(user)

  const { data: profile } = await supabase
    .from('profiles')
    .select()
    .eq('id', user?.id)
    .single()

  return (
    <DashboardView>
      <DashboardView.Title>Profile</DashboardView.Title>
      <div className="space-y-4">
        <p>First name: {profile?.first_name}</p>
        <p>Last name: {profile?.last_name}</p>
        <p>Handle: {profile?.handle}</p>
      </div>
    </DashboardView>
  )
}
