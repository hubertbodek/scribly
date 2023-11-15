import React, { FormEvent, forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

interface WritableParagraphProps extends React.ComponentProps<'p'> {
  placeholder?: string
}

export const WritableParagraph = forwardRef<HTMLParagraphElement, WritableParagraphProps>(
  ({ placeholder, onInput, ...props }, forwardedRef) => {
    const ref = useRef<HTMLParagraphElement>(null)

    useImperativeHandle(forwardedRef, () => ref.current as HTMLParagraphElement)

    useEffect(() => {
      const el = ref?.current

      if (el && el?.innerText) {
        el.dataset.placeholder = ''
      }
    }, [placeholder])

    const handlePlaceholder = (e: FormEvent<HTMLParagraphElement>) => {
      if (!e.currentTarget.innerText) {
        e.currentTarget.dataset.placeholder = placeholder
        return
      }

      e.currentTarget.dataset.placeholder = ''
      onInput?.(e)
    }

    return (
      <p
        draggable
        data-placeholder={placeholder}
        onInput={handlePlaceholder}
        className="relative min-h-[44px] mb-1 px-4 py-2 hover:bg-slate-50 transition with-placeholder"
        {...props}
        ref={ref}
      ></p>
    )
  }
)

export const WritableTitle = forwardRef<HTMLHeadElement, WritableParagraphProps>(
  ({ placeholder, onInput, ...props }, forwardedRef) => {
    const ref = useRef<HTMLParagraphElement>(null)

    useImperativeHandle(forwardedRef, () => ref.current as HTMLHeadElement)

    useEffect(() => {
      const el = ref?.current

      if (el && el?.innerText) {
        el.dataset.placeholder = ''
      }
    }, [placeholder])

    const handlePlaceholder = (e: FormEvent<HTMLHeadingElement>) => {
      if (!e.currentTarget.innerText) {
        e.currentTarget.dataset.placeholder = placeholder
        return
      }

      e.currentTarget.dataset.placeholder = ''
      onInput?.(e)
    }

    return (
      <h1
        ref={ref}
        data-placeholder={placeholder}
        className="outline-none min-h-[1em] with-placeholder relative"
        onInput={handlePlaceholder}
        contentEditable
        {...props}
      ></h1>
    )
  }
)

WritableTitle.displayName = 'WritableTitle'

WritableParagraph.displayName = 'WritableParagraph'
