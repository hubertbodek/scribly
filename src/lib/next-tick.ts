export const nextTick = (cb: () => void) => {
  if (typeof window === 'undefined') {
    throw new Error('nextTick should be used in a browser')
  }

  setTimeout(cb, 0)
}
