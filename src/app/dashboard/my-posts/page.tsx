import { getUser, getServerClient } from '@/api/supabase/server'
import { assertUser } from '@/lib/assert-user'

import PostsGrid from '@/components/shared/posts-grid'

export default async function Page() {
  const supabase = getServerClient()
  const user = await getUser()

  assertUser(user)

  const { data: articles, error } = await supabase
    .from('articles')
    .select()
    .eq('is_published', true)
    .eq('profile_id', user?.id)

  return (
    <PostsGrid
      user={user}
      error={error}
      posts={articles}
      noDataMessage="You haven't published any articles yet."
    />
  )
}
