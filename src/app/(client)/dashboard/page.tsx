import { Pencil1Icon } from '@radix-ui/react-icons'

import { getUser, getServerClient } from '@/api/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/locale-utils'
import DashboardView from '@/components/dashboard/view'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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
    <DashboardView>
      <div className="flex justify-between items-center">
        <DashboardView.Title>My posts</DashboardView.Title>
        <Button variant="outline" asChild className="text-lg">
          <Link href="/scribe">
            Scribe
            <Pencil1Icon className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
      <Tabs defaultValue="published">
        <TabsList>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        <TabsContent value="published">
          <div className="grid grid-cols-4 gap-8">
            {articles?.map((article) => (
              <Card key={article.id} className="aspect-square py-4">
                <CardContent className="flex flex-col items-start space-y-2 h-full">
                  <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Posted on {formatDate(article.created_at)}
                  </p>
                  <div className="justify-self-end mt-auto">
                    <Button variant="link" className="px-0">
                      Read
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="drafts">Change your password here.</TabsContent>
      </Tabs>
    </DashboardView>
  )
}
