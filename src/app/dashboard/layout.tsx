import { protectRoute } from '@/lib/protect-route'
import Sidebar from './sidebar'

export default async function Layout({ children }: { children: React.ReactNode }) {
  await protectRoute()

  return (
    <main className="px-2 h-[var(--main-min-height)] flex flex-col">
      {/* <h1 className="text-4xl font-bold my-2">Dashboard</h1> */}
      <div className="flex h-full [&>*]:py-6">
        <Sidebar />
        {children}
      </div>
    </main>
  )
}
