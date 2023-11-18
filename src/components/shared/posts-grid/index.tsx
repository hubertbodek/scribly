import React from 'react'
import Link from 'next/link'
import { PostgrestError, User } from '@supabase/supabase-js'

import { type Tables } from '@/api/types'
import { getServerClient } from '@/api/supabase/server'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import PostCard from '@/components/dashboard/post-card'

interface Post extends Tables<'articles'> {}

interface PostsGridProps {
  posts: Post[] | null
  noDataMessage?: string
  user: User
  error?: PostgrestError | null
}

export default async function PostsGrid({ posts, error, noDataMessage, user }: PostsGridProps) {
  const supabase = getServerClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('handle')
    .eq('id', user?.id)
    .single()

  if (error) {
    return <div className="py-4 text-destructive italic">{error.message}</div>
  }

  if (!posts || posts.length === 0) {
    return <div className="py-4 text-muted-foreground italic">{noDataMessage || 'No posts'}</div>
  }

  return (
    <PostsGridContainer>
      {posts?.map((post) => {
        const ButtonsSlot = post.is_published ? (
          <div className="flex justify-between items-center w-full">
            <Button variant="link" className="px-0" asChild>
              <Link href={`/${profile?.handle}/${post.id}`}>Read</Link>
            </Button>
            <Button variant="link" className="px-0" asChild>
              <Link href={`/scribe/edit/${post.id}`}>Edit</Link>
            </Button>
          </div>
        ) : (
          <Button variant="link" className="px-0 self-end" asChild>
            <Link href={`/scribe?article_id=${post.id}`}>Continue writing</Link>
          </Button>
        )

        return <PostCard key={post.id} post={post} buttonSlot={ButtonsSlot} />
      })}
    </PostsGridContainer>
  )
}

export const PostsGridSkeleton = ({ amount = 4 }: { amount?: number }) => (
  <PostsGridContainer>
    {[...Array(amount)].map((_, i) => (
      <Card key={i} className="animate-pulse aspect-square bg-gray-100 px-6 py-4">
        <div className="h-20 bg-gray-200 rounded" />
        <div className="h-4 mt-2 bg-gray-200 rounded" />
        <div className="h-4 mt-2 bg-gray-200 rounded" />
        <div className="h-4 mt-2 bg-gray-200 rounded" />
      </Card>
    ))}
  </PostsGridContainer>
)

const PostsGridContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
    {children}
  </div>
)
