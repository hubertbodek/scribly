import { createContext, useContext } from 'react'

import { EditorValues } from '.'

export const EditorContext = createContext<EditorValues>({
  title: () => undefined,
  content: () => undefined,
})

export const useEditorContext = () => {
  const context = useContext(EditorContext)

  if (!context) {
    throw new Error('useEditor has to be used within <JobModalContext.Provider>')
  }

  return context
}
