import { useState } from 'react'

import { nextTick } from '@/lib/next-tick'

interface Coords {
  x: number
  y: number
}

export default function useSelection() {
  const [selectedTextCoords, setSelectedTextCoords] = useState<Coords | null>(null)
  const [selection, setSelection] = useState<Selection | null>(null)

  const getSelectionCoords = (selection: Selection) => {
    const range = selection?.getRangeAt(0)
    const rect = range?.getBoundingClientRect()

    return { x: rect?.left, y: rect?.top }
  }

  const handleSelection = () => {
    nextTick(() => {
      const currentSelection = window.getSelection()
      const textIsSelected = Boolean(currentSelection?.toString())

      if (textIsSelected && currentSelection) {
        setSelection(currentSelection)
        setSelectedTextCoords(getSelectionCoords(currentSelection))
      }
    })
  }

  return {
    selection,
    setSelection,
    selectedTextCoords,
    handleSelection,
  }
}
