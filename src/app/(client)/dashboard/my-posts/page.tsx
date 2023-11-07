import { getUser, getServerClient } from '@/api/supabase/server'

export default async function MyPosts() {
  const supabase = getServerClient()

  const user = await getUser()

  if (!user) {
    return <div>loading</div>
  }

  const { data: articles, error } = await supabase
    .from('articles')
    .select()
    .eq('user_id', user?.id)

  return (
    <div>
      My posts
      {articles?.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
        </div>
      ))}
    </div>
  )
}
