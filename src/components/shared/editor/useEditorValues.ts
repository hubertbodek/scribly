import { useCallback, useMemo, useRef } from 'react'

export default function useEditorValues() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const title = useCallback(() => titleRef.current?.innerText, [])
  const content = useCallback(
    () =>
      Array.from(contentRef.current?.children || []).map((block) => {
        const blockType = block.nodeName.toLowerCase()
        const blockContent = block.innerHTML

        return { type: blockType, content: blockContent }
      }),
    []
  )

  const buttons = useMemo(() => {
    if (typeof document === 'undefined') return []

    return Array.from(document?.querySelectorAll('[data-context-menu="button"]'))
  }, [])

  return {
    title,
    content,
    titleRef,
    contentRef,
    buttons,
  }
}
