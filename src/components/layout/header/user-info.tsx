import { getServerClient, getUser } from '@/api/supabase/server'
import { DropdownMenuItem, DropdownMenuLabel } from '@/components/ui/dropdown-menu'
import { assertUser } from '@/lib/assert-user'
import Link from 'next/link'

export default async function UserInfo() {
  const supabase = getServerClient()
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
        <DropdownMenuItem
          asChild
          className="text-sm font-medium leading-none hover:underline px-0 hover:!bg-transparent"
        >
          <Link href={`/${data?.handle}`}>{data?.handle}</Link>
        </DropdownMenuItem>
        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
      </div>
    </DropdownMenuLabel>
  )
}
