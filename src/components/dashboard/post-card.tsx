'use client'

import Image from 'next/image'
import { revalidatePath } from 'next/cache'
import { DotsVerticalIcon } from '@radix-ui/react-icons'

import { getBrowserClient } from '@/api/supabase/browser'
import { Tables } from '@/api/types'
import { formatDate } from '@/lib/locale-utils'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Router } from 'next/router'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Post = Tables<'articles'>

interface PostCardProps {
  post: Post
  buttonSlot?: React.ReactNode
  dropdownSlot?: React.ReactNode
}

export default function PostCard({ post, buttonSlot, dropdownSlot }: PostCardProps) {
  const supabase = getBrowserClient()

  const deletePost = async (id: Post['id']) => {
    const { data, error } = await supabase.from('articles').delete().eq('id', id)
    if (error) {
      console.error(error)
      return
    }

    revalidatePath('/dashboard/my-posts')
  }

  return (
    <Card className="aspect-square py-4">
      <CardContent className="flex flex-col items-start space-y-2 h-full py-0 relative">
        <h3 className="text-h3 font-semibold text-gray-700 dark:text-gray-200">{post.title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Created on {formatDate(post.created_at)}
        </p>
        <div className="relative flex-1 bg-gray-300 rounded-xl w-full">
          <Image
            src="/image-placeholder.svg"
            alt="Image placeholder"
            fill
            className="object-cover object-center"
          />
        </div>
        {buttonSlot}
        <DropdownMenu>
          <DropdownMenuTrigger className="absolute top-0 right-3 rounded-full h-5 w-5">
            <DotsVerticalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-16">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={`/scribe/${post.id}/edit`}>Edit</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => deletePost(post.id)}>Delete</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  )
}
