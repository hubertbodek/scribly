import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  tag?: keyof JSX.IntrinsicElements
  children: React.ReactNode
}

export default function Section(props: SectionProps) {
  const { tag: Tag = 'section', children, className, ...rest } = props

  return (
    // @ts-ignore
    <Tag className={cn('mx-auto py-20 flex justify-center gap-8', className)} {...rest}>
      {children}
    </Tag>
  )
}

interface SectionMainProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

const SectionMain = ({ children, className, ...props }: SectionMainProps) => (
  <main className={cn('max-w-3xl w-full flex flex-col gap-y-10', className)} {...props}>
    {children}
  </main>
)

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const SectionTitle = ({ children, className, ...props }: SectionTitleProps) => (
  <h1 className={cn('text-h1 font-bold mb-8', className)} {...props}>
    {children}
  </h1>
)

interface SectionListProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const SectionListContainer = ({ children, className, ...props }: SectionListProps) => (
  <div className={cn('flex flex-col gap-y-10', className)} {...props}>
    {children}
  </div>
)

interface SectionListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const SectionListItem = ({ children, className, ...props }: SectionListItemProps) => (
  <article className={cn('flex gap-x-8 gap-y-2 max-h-60', className)} {...props}>
    <div className="aspect-square w-1/6 bg-slate-200" />
    <div className="flex-1">{children}</div>
  </article>
)

interface SectionSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const SectionSidebar = ({ children, className, ...props }: SectionSidebarProps) => (
  <aside
    className={cn('flex flex-col gap-y-10 w-full max-w-xs max-lg:hidden', className)}
    {...props}
  >
    {children}
  </aside>
)

const SectionSidebarStickyWrapper = ({ children, className, ...props }: SectionSidebarProps) => (
  <div
    className={cn('sticky top-10 w-full max-w-xs self-start max-lg:hidden', className)}
    {...props}
  >
    {children}
  </div>
)

Section.Main = SectionMain
Section.Title = SectionTitle
Section.ListContainer = SectionListContainer
Section.ListItem = SectionListItem
Section.SidebarStickyWrapper = SectionSidebarStickyWrapper
Section.Sidebar = SectionSidebar
