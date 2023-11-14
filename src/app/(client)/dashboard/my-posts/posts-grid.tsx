import Link from 'next/link'
import React from 'react'

import { type Tables } from '@/api/types'
import { getUser, getServerClient } from '@/api/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { formatDate } from '@/lib/locale-utils'
import { assertUser } from '@/lib/assert-user'

interface Post extends Tables<'articles'> {}

interface PostsGridProps {
  posts: Post[] | null
  noDataMessage?: string
}

const supabase = getServerClient()

export default async function PostsGrid({ posts, noDataMessage }: PostsGridProps) {
  const user = await getUser()

  assertUser(user)

  const { data: profile } = await supabase
    .from('profiles')
    .select('handle')
    .eq('id', user?.id)
    .single()

  if (!posts || posts.length === 0) {
    return <div className="py-4 text-muted-foreground italic">{noDataMessage || 'No posts'}</div>
  }

  return (
    <div className="grid grid-cols-4 gap-8">
      {posts?.map((post) => (
        <Card key={post.id} className="aspect-square py-4">
          <CardContent className="flex flex-col items-start space-y-2 h-full">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{post.title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Posted on {formatDate(post.created_at)}
            </p>
            <div className="justify-self-end mt-auto">
              <Button variant="link" className="px-0" asChild>
                <Link href={`/${profile?.handle}/${post.id}`}>Read</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
