import { getUser } from '@/api/supabase/server'
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu'

export default async function UserInfo() {
  const user = await getUser()

  return (
    <DropdownMenuLabel className="font-normal">
      <div className="flex flex-col space-y-1">
        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
      </div>
    </DropdownMenuLabel>
  )
}
