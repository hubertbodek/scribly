import { Content } from '../editor'

export default function TextRenderer(props: { content: Content[] | null }) {
  if (!props.content) return null

  return (
    <>
      {props.content?.map((item: any, idx: number) => {
        const Tag = item.type

        return <Tag key={`${item.type}${idx}`}>{item.content}</Tag>
      })}
    </>
  )
}
