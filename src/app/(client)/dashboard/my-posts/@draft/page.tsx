import { getUser, getServerClient } from '@/api/supabase/server'
import PostsGrid from '../posts-grid'
import { assertUser } from '@/lib/assert-user'

export default async function MyPosts() {
  const supabase = getServerClient()
  const user = await getUser()

  assertUser(user)

  const { data: articles, error } = await supabase
    .from('articles')
    .select()
    .not('is_published', 'is', true)
    .eq('user_id', user?.id)

  return <PostsGrid posts={articles} noDataMessage="You haven't saved any articles yet." />
}
