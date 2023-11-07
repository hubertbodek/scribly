import Header from '@/components/layout/header'

interface LayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function ClientLayout({ children, modal }: LayoutProps) {
  return (
    <>
      <Header />
      {children}
      {modal}
    </>
  )
}
