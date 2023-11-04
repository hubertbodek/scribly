import { protectRoute } from '@/lib/protect-route'

export default async function Admin() {
  await protectRoute()

  return <div>Admin</div>
}
