'use client'

import { FormEvent, useRef } from 'react'
import { FileIcon } from '@radix-ui/react-icons'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import MainImage, { ImageContainer } from '@/components/article/main-image'

interface ImageEditorProps {
  initialImage?: string
  onDrop?: (file: File) => void
}

export function ImageEditor({ initialImage, onDrop }: ImageEditorProps) {
  const formRef = useRef<HTMLFormElement>(null)

  if (initialImage) {
    return <MainImage src={initialImage} />
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = new FormData(e.currentTarget)
    const file = form.get('file') as File

    if (!file) {
      return
    }

    onDrop?.(file)
  }

  return (
    <ImageContainer className="bg-gray-50 shadow hover:border-gray-400 border-dashed">
      <form ref={formRef} onSubmit={handleSubmit} className="h-full">
        <Label htmlFor="file" className="h-full">
          <div className="w-full h-full cursor-pointer flex flex-col gap-2 items-center justify-center">
            <FileIcon className="w-16 h-16 text-gray-400" />
            <h3 className="text-h3 font-bold text-gray-400 text-center [text-wrap:balance]">
              Drag a cover image or click to upload
            </h3>
          </div>
          <Input
            className="hidden"
            id="file"
            name="file"
            type="file"
            onInput={() => formRef?.current?.submit()}
          />
        </Label>
      </form>
    </ImageContainer>
  )
}
