'use client'

import { Content, Editor } from '@/components/shared/editor'
import { Button } from '@/components/ui/button'

import useEditorClient from './useEditorClient'

export default function EditorClient(props: { title?: string; content?: Content[] }) {
  const { onSave, onIdle } = useEditorClient()

  return (
    <Editor
      onIdle={onIdle}
      idleTime={5000}
      initialTitle={props.title}
      initialContent={props.content}
    >
      <Editor.Save onSave={onSave}>
        <Button>Save</Button>
      </Editor.Save>
    </Editor>
  )
}
