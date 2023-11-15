import React from 'react'

import { type Tables } from '@/api/types'
import { getUser, getServerClient } from '@/api/supabase/server'
import { assertUser } from '@/lib/assert-user'
import PostCard from '@/components/dashboard/post-card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Post extends Tables<'articles'> {}

interface PostsGridProps {
  posts: Post[] | null
  noDataMessage?: string
}

export default async function PostsGrid({ posts, noDataMessage }: PostsGridProps) {
  const supabase = getServerClient()
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
      {posts?.map((post) => {
        const ButtonsSlot = post.is_published ? (
          <div className="flex justify-between items-center">
            <Button variant="link" className="px-0" asChild>
              <Link href={`/${profile?.handle}/${post.id}`}>Read</Link>
            </Button>
            <Button variant="link" className="px-0" asChild>
              <Link href={`/scribe/edit/${post.id}`}>Edit</Link>
            </Button>
          </div>
        ) : (
          <Button variant="link" className="px-0" asChild>
            <Link href={`/scribe?article_id=${post.id}`}>Continue</Link>
          </Button>
        )

        return <PostCard key={post.id} post={post} buttonSlot={ButtonsSlot} />
      })}
    </div>
  )
}
