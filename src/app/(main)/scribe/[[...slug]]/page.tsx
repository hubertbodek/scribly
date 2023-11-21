import { notFound } from 'next/navigation'

import EditorClient from './editor-client'
import { getServerClient, getUser } from '@/api/supabase/server'
import { Content } from '@/components/shared/editor'
import { assertUser } from '@/lib/assert-user'
import { ImageEditor } from '@/components/shared/image-editor'

interface ScribeProps {
  params: { slug?: string[] }
  searchParams: {
    article_id?: string
  }
}

export default async function Scribe({ params, searchParams }: ScribeProps) {
  const supabase = getServerClient()
  const { article_id } = searchParams
  const { slug } = params
  const isEditingDraftArticle = !!article_id

  const user = await getUser()
  assertUser(user)

  if (isEditingDraftArticle) {
    const { data: articleData, error: articleError } = await supabase
      .from('articles')
      .select()
      .eq('id', article_id)
      .not('is_published', 'is', true)
      .single()

    if (!articleData || articleError) {
      return notFound()
    }

    const { title, content } = articleData
    const articleContents = content ? (JSON.parse(content) as Content[]) : null

    return <EditorClient title={title ?? ''} content={articleContents ?? []} draft />
  }

  if (slug) {
    const [articleIdSegment, editSegment] = slug
    const isEdititingPublishedArticle = editSegment === 'edit'

    if (!isEdititingPublishedArticle) {
      return notFound()
    }

    const { data: articleData, error: articleError } = await supabase
      .from('articles')
      .select()
      .eq('id', articleIdSegment)
      .eq('is_published', true)
      .single()

    if (!articleData || articleError) {
      return notFound()
    }

    const { title, content } = articleData
    const articleContents = content ? (JSON.parse(content) as Content[]) : null

    return <EditorClient title={title ?? ''} content={articleContents ?? []} />
  }

  return <EditorClient draft />
}
