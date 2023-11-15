import Link from 'next/link'

import { Tables } from '@/api/types'
import { formatDate } from '@/lib/locale-utils'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Post extends Tables<'articles'> {}

export default function PostCard({
  post,
  buttonSlot,
}: {
  post: Post
  buttonSlot?: React.ReactNode
}) {
  return (
    <Card className="aspect-square py-4">
      <CardContent className="flex flex-col items-start space-y-2 h-full py-0">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200">{post.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Created on {formatDate(post.created_at)}
        </p>
        <div className="flex-1 bg-gray-300 rounded-xl w-full"></div>
        {buttonSlot}
      </CardContent>
    </Card>
  )
}
