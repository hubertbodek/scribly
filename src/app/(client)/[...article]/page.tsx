import { notFound } from 'next/navigation'
import { getServerClient } from '@/api/supabase/server'
import { adminAuthClient } from '@/api/supabase/admin'
import { Content } from '@/components/shared/editor'

interface ArticlePage {
  params: {
    article: string[]
  }
}

export default async function Article({ params }: ArticlePage) {
  const supabase = getServerClient()
  const [handle, slug] = params.article

  const { data, error } = await supabase.from('profiles').select().eq('handle', handle).single()

  if (!data || error) {
    return notFound()
  }

  const { data: articleData, error: articleError } = await supabase
    .from('articles')
    .select()
    .eq('user_id', data.id)
    .eq('id', slug)
    .single()

  if (!articleData || articleError) {
    return notFound()
  }

  const { title, content } = articleData

  const articleContents = content ? (JSON.parse(content) as Content[]) : null

  return (
    <section className="prose py-20 mx-auto px-4">
      <h1>{title}</h1>
      <TextRenderer content={articleContents} />
    </section>
  )
}

const TextRenderer = (props: { content: Content[] | null }) => {
  if (!props.content) return null

  return (
    <div>
      {props.content?.map((item: any, idx: number) => {
        const Tag = item.type

        return <Tag key={`${item.type}${idx}`} dangerouslySetInnerHTML={{ __html: item.content }} />
      })}
    </div>
  )
}
