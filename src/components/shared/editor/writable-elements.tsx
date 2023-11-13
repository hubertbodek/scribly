import { FormEvent, forwardRef } from 'react'

interface WritableParagraphProps extends HTMLParagraphElement {
  placeholder?: string
}

export const WritableParagraph = forwardRef<WritableParagraphProps, React.ComponentProps<'p'>>(
  ({ placeholder, onInput, ...props }, ref) => {
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

export const WritableTitle = forwardRef<WritableParagraphProps, React.ComponentProps<'h1'>>(
  ({ placeholder, onInput, ...props }, ref) => {
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
        className="outline-none h-[1em] with-placeholder relative"
        onInput={handlePlaceholder}
        contentEditable
        {...props}
      ></h1>
    )
  }
)

WritableTitle.displayName = 'WritableTitle'

WritableParagraph.displayName = 'WritableParagraph'
