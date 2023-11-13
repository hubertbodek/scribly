import { useCallback, useEffect } from 'react'

export default function useClickOutside(
  callback: (e: globalThis.MouseEvent) => any,
  refs: (HTMLElement | Element | null)[]
) {
  const handler = useCallback(
    (e: globalThis.MouseEvent) => {
      const isOutside = refs.every((ref) => ref !== e.target)

      if (isOutside) {
        callback(e)
      }
    },
    [callback, refs]
  )

  useEffect(() => {
    window.addEventListener('click', handler)

    return () => removeEventListener('click', handler)
  }, [handler, refs])
}
