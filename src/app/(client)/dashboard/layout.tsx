import { protectRoute } from '@/lib/protect-route'
import Sidebar from './sidebar'

export default async function Layout({ children }: { children: React.ReactNode }) {
  await protectRoute()

  return (
    <main className="container py-10">
      <h1 className="text-4xl font-bold mb-4">Dashboard</h1>
      <div className="flex">
        <Sidebar />
        {children}
      </div>
    </main>
  )
}
