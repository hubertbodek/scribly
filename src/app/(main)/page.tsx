import { getServerClient } from '@/api/supabase/server'

export default async function Home() {
  const supabase = getServerClient()

  const { data: articles, error } = await supabase
    .from('articles')
    .select()
    .eq('is_published', true)

  return (
    <main className="flex items-center flex-col justify-center min-h-screen p-24">
      {articles?.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
        </div>
      ))}
    </main>
  )
}
