import { useCallback, useState } from 'react'

export default function useEditorTimeout(onIdleCallback: () => any, idleTime: number) {
  const [timerId, setTimerId] = useState<NodeJS.Timeout>()

  const startTimer = useCallback(() => {
    if (!onIdleCallback) return

    const timeoutHandler = () => onIdleCallback()

    setTimerId(setTimeout(timeoutHandler, idleTime))
  }, [idleTime, onIdleCallback])

  const resetTimer = useCallback(() => {
    clearTimeout(timerId)
    startTimer()
  }, [timerId, startTimer])

  const handleTimeout = useCallback(() => {
    if (!onIdleCallback) return

    if (timerId) {
      resetTimer()
      return
    }

    startTimer()
  }, [onIdleCallback, resetTimer, startTimer, timerId])

  return {
    handleTimeout,
  }
}
