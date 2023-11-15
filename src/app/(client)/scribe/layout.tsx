import { protectRoute } from '@/lib/protect-route'

export default async function Layout({ children }: { children: React.ReactNode }) {
  await protectRoute()

  return <section className="max-w-5xl mx-auto px-4 min-h-main">{children}</section>
}
