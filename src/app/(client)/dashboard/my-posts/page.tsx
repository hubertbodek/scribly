import { getUser, getServerClient } from '@/api/supabase/server'
import { assertUser } from '@/lib/assert-user'

import PostsGrid from './posts-grid'

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
