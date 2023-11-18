import type { Metadata } from 'next'
import { GeistSans } from 'geist/font'

import '@/app/globals.css'
import Providers from '@/providers'
import Header from '@/components/layout/header'

export const metadata: Metadata = {
  title: 'Scribly',
  description: 'Generated by create next app',
}

interface LayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function RootLayout({ children, modal }: LayoutProps) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Providers>
          <Header />
          {children}
          {modal}
        </Providers>
      </body>
    </html>
  )
}
