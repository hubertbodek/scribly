import { protectRoute } from '@/lib/protect-route'

import EditorClient from './editor-client'

export default async function Scribe() {
  await protectRoute()

  return (
    <section className="max-w-5xl mx-auto px-4 min-h-main">
      <EditorClient />
    </section>
  )
}
