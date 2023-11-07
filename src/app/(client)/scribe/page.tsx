import { protectRoute } from '@/lib/protect-route'

export default async function Scribe() {
  await protectRoute()

  return <section className="container min-h-main">Scribe</section>
}
