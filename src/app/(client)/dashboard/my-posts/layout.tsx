import React from 'react'
import { Pencil1Icon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import DashboardView from '@/components/dashboard/view'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function Layout(props: { draft: React.ReactNode; children: React.ReactNode }) {
  const { children, draft } = props

  return (
    <DashboardView>
      <div className="flex justify-between items-center">
        <DashboardView.Title>My posts</DashboardView.Title>
        <Button variant="outline" asChild className="text-lg">
          <Link href="/scribe">
            Scribe
            <Pencil1Icon className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      </div>
      <Tabs defaultValue="published">
        <TabsList>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
        </TabsList>
        <TabsContent value="published">{children}</TabsContent>
        <TabsContent value="drafts">{draft}</TabsContent>
      </Tabs>
    </DashboardView>
  )
}
