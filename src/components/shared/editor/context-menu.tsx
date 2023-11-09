import { Fragment } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { action } from './context-actions'

const options = [
  { name: 'Bold', icon: 'B', action: action.bold },
  { name: 'Underline', icon: 'U', action: action.underline },
  { name: 'Italic', icon: 'I', action: action.italic },
  { name: 'Heading 2', icon: 'h2', action: action.h2 },
  { name: 'Heading 3', icon: 'h3', action: action.h3 },
  { name: 'Blockquote', icon: 'Q', action: action.blockqoute },
]

interface ContentMenuProps {
  selection: Selection | null
  coords: { x: number; y: number } | null
}

export default function ContextMenu({ selection, coords }: ContentMenuProps) {
  if (!selection || !coords) return null

  return (
    <Card
      className="overflow-hidden inline-flex items-center flex-wrap absolute"
      style={{ top: coords.y - 40, left: coords.x }}
    >
      {options.map((option) => {
        const isLast = options.indexOf(option) === options.length - 1

        return (
          <Fragment key={option.name}>
            <Button
              variant="ghost"
              className="w-11"
              onClick={() => {
                option.action(selection)
              }}
            >
              {option.icon}
            </Button>
            {!isLast && <Separator className="h-5" orientation="vertical" />}
          </Fragment>
        )
      })}
    </Card>
  )
}
