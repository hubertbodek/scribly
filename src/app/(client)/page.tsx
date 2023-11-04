import { getUser, getServerClient } from '@/api/supabase/server'

export default async function Home() {
  const supabase = getServerClient()

  const { data: articles, error } = await supabase.from('articles').select()

  const user = await getUser()

  console.log({ articles, user })

  return (
    <main className="flex items-center flex-col justify-center min-h-screen p-24">
      {user?.email}
      {articles?.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
        </div>
      ))}
    </main>
  )
}
