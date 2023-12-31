import { getServerClient } from '@/api/supabase/server'
import Section from '@/components/shared/containers/section'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface AuthorPageProps {
  params: {
    author: string
  }
}

export default async function Author({ params }: AuthorPageProps) {
  const supabase = getServerClient()
  const { author } = params

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*, articles(*)')
    .eq('handle', author)
    .filter('articles.is_published', 'eq', true)
    .single()

  if (!profile || error) {
    return notFound()
  }

  return (
    <Section>
      <Section.Main>
        <Section.Title>Articles</Section.Title>
        <Section.ListContainer>
          {profile.articles.map((article) => (
            <Section.ListItem key={article.id}>
              <Link href={`/${profile.handle}/${article.id}`}>
                <h3 className="text-h3 font-bold mb-3 hover:underline">{article.title}</h3>
              </Link>
              <p className="max-md:hidden text-sm">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error reiciendis,
                reprehenderit, officiis facere, ducimus omnis eum temporibus quo et possimus quas.
                Nam ratione eum laborum voluptatibus repellendus sapiente magni commodi.
              </p>
            </Section.ListItem>
          ))}
        </Section.ListContainer>
      </Section.Main>
      <Section.SidebarStickyWrapper>
        <Section.Sidebar>sidebar</Section.Sidebar>
      </Section.SidebarStickyWrapper>
    </Section>
  )
}
