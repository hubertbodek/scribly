import { notFound } from 'next/navigation'

import { getServerClient } from '@/api/supabase/server'
import { Content } from '@/components/shared/editor'

interface ArticlePageProps {
  params: {
    author: string
    article: string
  }
}

export default async function Article({ params }: ArticlePageProps) {
  const supabase = getServerClient()
  const { author, article } = params

  const { data, error } = await supabase
    .from('profiles')
    .select('*, articles(*)')
    .filter('articles.is_published', 'eq', true)
    .eq('handle', author)
    .eq('articles.id', article)
    .single()

  if (!data || error) {
    return notFound()
  }

  const { data: articleData, error: articleError } = await supabase
    .from('articles')
    .select()
    .eq('profile_id', data.id)
    .eq('id', article)
    .eq('is_published', true)
    .single()

  if (!articleData || articleError) {
    return notFound()
  }

  const { title, content } = articleData

  const articleContents = content ? (JSON.parse(content) as Content[]) : null

  return (
    <section className="prose py-20 mx-auto px-4">
      <h1 className="text-h1">{title}</h1>
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
