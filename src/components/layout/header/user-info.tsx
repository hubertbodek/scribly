import { getServerClient, getUser } from '@/api/supabase/server'
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { assertUser } from '@/lib/assert-user'

const supabase = getServerClient()

export default async function UserInfo() {
  const user = await getUser()

  assertUser(user)

  const { data } = await supabase
    .from('profiles')
    .select('handle')
    .eq('id', user?.id)
    .single()

  return (
    <DropdownMenuLabel className="font-normal">
      <div className="flex flex-col space-y-1">
        <p className="text-sm font-medium leading-none">{data?.handle}</p>
        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
      </div>
    </DropdownMenuLabel>
  )
}
