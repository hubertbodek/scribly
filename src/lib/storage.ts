import { getServerClient } from '@/api/supabase/server'

const supabase = getServerClient()

export const uploadArticleImage = async (id: string, file: File) => {
  const { data, error } = await supabase.storage
    .from('article_images')
    .upload(`article_cover/${id}/${file.name}`, file)

  if (error) {
    throw error
  }

  return data
}
