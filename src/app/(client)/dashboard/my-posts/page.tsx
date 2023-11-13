import { getUser, getServerClient } from '@/api/supabase/server'
import PostsGrid from './posts-grid'
import { redirect } from 'next/navigation'
import { assertUser } from '@/lib/assert-user'

export default async function Page() {
  const supabase = getServerClient()
  const user = await getUser()

  assertUser(user)

  const { data: articles } = await supabase
    .from('articles')
    .select()
    .eq('is_published', true)
    .eq('user_id', user?.id)

  return <PostsGrid posts={articles} noDataMessage="You haven't published any articles yet." />
}
