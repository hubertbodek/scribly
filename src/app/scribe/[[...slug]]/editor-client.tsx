'use client'

import { Content, Editor } from '@/components/shared/editor'
import { Button } from '@/components/ui/button'

import useEditorClient from './useEditorClient'
import { ImageEditor } from '@/components/shared/image-editor'

export default function EditorClient(props: {
  title?: string
  content?: Content[]
  draft?: boolean
}) {
  const { onSave, onIdle, onPublish, onDrop } = useEditorClient()

  const idleProps = {
    onIdle: props.draft ? onIdle : undefined,
    idleTime: props.draft ? 5000 : undefined,
  }

  return (
    <>
      <ImageEditor onDrop={onDrop} />
      <Editor {...idleProps} initialTitle={props.title} initialContent={props.content}>
        <div className="flex gap-8">
          {props.draft && (
            <Editor.Save onSave={onSave}>
              <Button>Save</Button>
            </Editor.Save>
          )}
          <Editor.Save onSave={onPublish}>
            <Button>Publish</Button>
          </Editor.Save>
        </div>
      </Editor>
    </>
  )
}
