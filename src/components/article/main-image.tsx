import Image from 'next/image'

import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function MainImage(props: { src: string; alt?: string }) {
  return (
    <ImageContainer className="relative h-60 md:h-96 lg:h-[500px] overflow-hidden">
      <Image
        src={props.src}
        alt={props.alt ?? 'Cover image'}
        fill
        className="object-cover object-center"
      />
    </ImageContainer>
  )
}

export const ImageContainer = (props: { children: React.ReactNode; className?: string }) => (
  <Card className={cn('relative h-60  md:h-96 lg:h-[500px] overflow-hidden', props.className)}>
    {props.children}
  </Card>
)
