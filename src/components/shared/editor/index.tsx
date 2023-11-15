'use client'

import React, { memo, useEffect } from 'react'
import { Slot } from '@radix-ui/react-slot'

import ContextMenuComponent from './context-menu'
import { WritableParagraph, WritableTitle } from './writable-elements'

import useClickOutside from '@/hooks/useClickOutside'
import useSelection from './useSelection'
import useEditorValues from './useEditorValues'
import useEditorTimeout from './useEditorTimeout'
import { EditorContext, useEditorContext } from './useEditorContext'
import TextRenderer from '../text-renderer'

const ContextMenu = memo(ContextMenuComponent)

export interface Content {
  type: string
  content: string | null
}

export interface EditorValues {
  title: () => string | undefined
  content: () => Content[] | undefined
}

export type OnIdleCallback = (editor: EditorValues) => void

interface EditorProps {
  children?: React.ReactNode
  titlePlaceholder?: string
  onIdle?: OnIdleCallback
  idleTime?: number
  initialTitle?: string
  initialContent?: Content[]
}

// TODO: Implement this to be able to call const {title, content} = useEditor()

// export function EditorProvider({ children }: { children: React.ReactNode }) {
//   const [title, setTitle] = React.useState<string | undefined>()
//   const [content, setContent] = React.useState<Content[] | undefined>()

//   return (
//     <EditorContext.Provider
//       value={{
//         title,
//         content,
//       }}
//     >
//       {children}
//     </EditorContext.Provider>
//   )
// }

export function Editor({
  children,
  titlePlaceholder = 'Enter your title here...',
  onIdle,
  idleTime = 5000,
  initialTitle,
  initialContent,
}: EditorProps) {
  const { selection, setSelection, selectedTextCoords, handleSelection } = useSelection()
  const { title, content, titleRef, contentRef, buttons } = useEditorValues()
  const { handleTimeout } = useEditorTimeout(() => {
    if (!onIdle) return

    onIdle({ title, content })
  }, idleTime)

  useClickOutside(() => {
    const isSelecting = Boolean(window.getSelection()?.toString())

    if (!isSelecting && selection) {
      setSelection(null)
    }
  }, [...buttons])

  useEffect(() => {
    const titleEl = titleRef.current

    if (titleEl) {
      titleEl.innerText = initialTitle ?? ''

      titleEl.focus()
    }
  }, [initialTitle, titleRef])

  return (
    <EditorContext.Provider
      value={{
        title,
        content,
      }}
    >
      <div className="px-4 py-12 outline-none prose mx-auto">
        <WritableTitle onInput={handleTimeout} ref={titleRef} placeholder={titlePlaceholder} />
        <div
          ref={contentRef}
          className="text-body outline-none last:border-b"
          suppressContentEditableWarning={true}
          contentEditable={true}
          role="textbox"
          onMouseUp={handleSelection}
          onInput={handleTimeout}
        >
          {!initialContent || initialContent?.length === 0 ? (
            <WritableParagraph onDragStart={(e) => console.log(e)} />
          ) : (
            <TextRenderer content={initialContent} />
          )}
        </div>
        <ContextMenu selection={selection} coords={selectedTextCoords} />
        {children}
      </div>
    </EditorContext.Provider>
  )
}

export interface EditorSaveWrapeprProps {
  onSave: (editor: EditorValues) => void
  children: React.ReactNode
}

export const EditorSaveWrapper = ({ onSave, children }: EditorSaveWrapeprProps) => {
  const { title, content } = useEditorContext()

  const handleOnSave = () => {
    onSave({ title, content })
  }

  return <Slot onClick={handleOnSave}>{children}</Slot>
}

Editor.Save = EditorSaveWrapper
