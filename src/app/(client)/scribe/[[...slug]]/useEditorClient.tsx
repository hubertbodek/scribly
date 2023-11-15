import { getBrowserClient, getUser } from '@/api/supabase/browser'
import { Content, EditorValues } from '@/components/shared/editor'
import { useRouter, useSearchParams } from 'next/navigation'

const supabase = getBrowserClient()

export default function useEditorClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createArticle = async (article: { title: string; content: Content[] }) => {
    const { title, content } = article
    const currentUser = await getUser()

    console.log('CREATED ARTICLE')

    // TODO: Handle error
    const { data, error } = await supabase
      .from('articles')
      .insert([
        {
          title,
          user_id: currentUser?.data.user?.id,
          content: JSON.stringify(content),
        },
      ])
      .select()
      .single()

    return data
  }

  const updateArticle = async (article: { id: string; title: string; content: Content[] }) => {
    const { title, content } = article
    const currentUser = await getUser()

    // TODO: Handle error

    const { data, error } = await supabase
      .from('articles')
      .update({
        title,
        content: JSON.stringify(content),
      })
      .eq('id', article.id)
      .select()
      .single()

    console.log('UPDATED ARTICLE', { data })

    return data
  }

  const publishArticle = async (id: string) => {
    const { data, error } = await supabase
      .from('articles')
      .update({
        is_published: true,
      })
      .eq('id', id)
      .select()
      .single()

    return data
  }

  const onSave = async ({ title: titleGetter, content: contentGetter }: EditorValues) => {
    const content = contentGetter()
    const title = titleGetter()

    if (title && content) {
      createArticle({ title, content })
    }
  }

  const onIdle = async ({ title: titleGetter, content: contentGetter }: EditorValues) => {
    const articleId = searchParams.get('article_id')
    const content = contentGetter()
    const title = titleGetter()

    console.log('ON IDLE', { title, content })

    if (!title || !content) return

    if (articleId) {
      await updateArticle({ id: articleId, title, content })
      return
    }

    const articleData = await createArticle({ title, content })
    router.replace(`/scribe?article_id=${articleData?.id}`)
  }
  return {
    onSave,
    onIdle,
  }
}
