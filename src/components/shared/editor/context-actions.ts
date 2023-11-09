const applyStyles = (
  selection: Selection,
  el: keyof HTMLElementTagNameMap = 'span',
  styles?: Partial<CSSStyleDeclaration>
) => {
  const range = selection?.getRangeAt(0)
  const span = document.createElement(el)

  Object.assign(span.style, styles)

  range?.surroundContents(span)
}

const bold = (selection: Selection) =>
  applyStyles(selection, 'span', {
    fontWeight: 'bold',
  })

const italic = (selection: Selection) =>
  applyStyles(selection, 'span', {
    fontStyle: 'italic',
  })

const underline = (selection: Selection) =>
  applyStyles(selection, 'span', {
    textDecoration: 'underline',
  })

const h2 = (selection: Selection) => applyStyles(selection, 'h2')

const h3 = (selection: Selection) => applyStyles(selection, 'h3')

const blockqoute = (selection: Selection) => applyStyles(selection, 'blockquote')

const removeStyles = (selection: Selection) => {
  // todo
}

export const action = {
  bold,
  italic,
  underline,
  h2,
  h3,
  blockqoute,
}
