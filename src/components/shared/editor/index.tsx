'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { getBrowserClient, getUser } from '@/api/supabase/browser'

import ContextMenu from './context-menu'

interface Coords {
  x: number
  y: number
}

interface Content {
  type: string
  content: string | null
}

interface EditorProps {
  titlePlaceholder?: string
}

const supabase = getBrowserClient()

// TODO: Move logic to hooks
export default function Editor({ titlePlaceholder = 'Enter your title here...' }: EditorProps) {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [title, setTitle] = useState('')
  const [selectedTextCoords, setSelectedTextCoords] = useState<Coords | null>(null)
  const [selection, setSelection] = useState<Selection | null>(null)

  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.focus()
    }
  }, [titleRef])

  const save = async () => {
    const blocks = contentRef.current?.children

    if (!blocks) return

    const content: Content[] = []

    Array.from(blocks).forEach((block) => {
      const blockType = block.nodeName.toLowerCase()
      const blockContent = block.innerHTML

      content.push({ type: blockType, content: blockContent })
    })

    const currentUser = await getUser()

    // TODO: Handle error
    const { data, error } = await supabase
      .from('articles')
      .insert([
        {
          title,
          user_id: currentUser?.data.user?.id,
          content: JSON.stringify(content),
        },
      ])
      .select()

    return {
      title,
      content,
    }
  }

  const handleTitleInput = (e: FormEvent<HTMLHeadingElement>) => {
    if (!e.currentTarget.innerText) {
      e.currentTarget.dataset.placeholder = titlePlaceholder
      return
    }

    e.currentTarget.dataset.placeholder = ''
    setTitle(e.currentTarget.innerText)
  }

  const getSelectionCoords = (selection: Selection) => {
    const range = selection?.getRangeAt(0)
    const rect = range?.getBoundingClientRect()

    return { x: rect?.left, y: rect?.top }
  }

  const handleSelection = () => {
    const selection = window.getSelection()

    if (selection) {
      setSelection(selection)
      setSelectedTextCoords(getSelectionCoords(selection))
    }
  }

  const handleClickOutside = () => {
    if (selection) {
      setSelection(null)
    }
  }

  return (
    <div className="px-4 py-12 outline-none prose mx-auto">
      <h1
        ref={titleRef}
        data-placeholder={titlePlaceholder}
        className="outline-none h-[1em] with-placeholder relative"
        contentEditable
        onInput={handleTitleInput}
      />
      <div
        ref={contentRef}
        className="text-body outline-none [&>*]:mb-1 [&>*]:p-4 [&>*:focus]:bg-red-100 [&>*:hover]:bg-slate-100 last:border-b"
        contentEditable
        onMouseUp={handleSelection}
        onBlur={handleClickOutside}
      />
      <ContextMenu selection={selection} coords={selectedTextCoords} />
      <Button onClick={save}>Save</Button>
    </div>
  )
}
