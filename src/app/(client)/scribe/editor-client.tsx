'use client'

import { Editor } from '@/components/shared/editor'
import { Button } from '@/components/ui/button'

import useEditorClient from './useEditorClient'

export default function EditorClient() {
  const { onSave, onIdle } = useEditorClient()

  return (
    <Editor onIdle={onIdle} idleTime={5000}>
      <Editor.Save onSave={onSave}>
        <Button>Save</Button>
      </Editor.Save>
    </Editor>
  )
}
