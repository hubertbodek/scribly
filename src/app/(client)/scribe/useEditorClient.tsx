import { EditorValues } from '@/components/shared/editor'

export default function useEditorClient() {
  const onSave = async ({ title: titleGetter, content: contentGetter }: EditorValues) => {
    const content = contentGetter()
    const title = titleGetter()

    // const currentUser = await getUser()

    // TODO: Handle error
    // const { data, error } = await supabase
    //   .from('articles')
    //   .insert([
    //     {
    //       title,
    //       user_id: currentUser?.data.user?.id,
    //       content: JSON.stringify(content),
    //     },
    //   ])
    //   .select()

    console.log({ title, content })
  }

  const onIdle = ({ title, content }: EditorValues) => {
    console.log({ title: title(), content: content() })
  }
  return {
    onSave,
    onIdle,
  }
}
