'use server'

import { getServerClient, getUser } from '@/api/supabase/server'

export const submitImage = async (formData: FormData) => {
  const file = formData.get('file') as File

  console.log({ file })

  if (!file) {
    return
  }

  const supabase = getServerClient()

  const user = await getUser()

  if (!user) {
    throw new Error('User not found')
  }

  const id = crypto.randomUUID()

  const { data, error } = await supabase.storage
    .from('article_images')
    .upload(`article_cover/${id}/${user?.id}/${file.name}`, file, {
      cacheControl: '3600',
      upsert: false,
    })

  if (error) {
    throw new Error(error.message)
  }

  console.log(data)
}
