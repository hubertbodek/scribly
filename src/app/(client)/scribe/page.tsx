import { protectRoute } from '@/lib/protect-route'
import Editor from '@/components/shared/editor'

export default async function Scribe() {
  await protectRoute()

  return (
    <section className="max-w-5xl mx-auto px-4 min-h-main">
      <Editor />
    </section>
  )
}
