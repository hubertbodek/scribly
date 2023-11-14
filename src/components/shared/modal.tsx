'use client'

import { useRouter } from 'next/navigation'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface ModalProps {
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
}

export default function Modal({ title, description, children }: ModalProps) {
  const router = useRouter()

  const handleOnOpenChange = (open: boolean) => {
    if (!open) {
      router.back()
    }
  }

  const hasHeader = Boolean(title || description)

  return (
    <Dialog open onOpenChange={handleOnOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0">
        {hasHeader && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
        )}
        {children}
      </DialogContent>
    </Dialog>
  )
}
