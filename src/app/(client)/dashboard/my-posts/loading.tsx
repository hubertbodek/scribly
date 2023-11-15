import { Card } from '@/components/ui/card'

export default function Loading() {
  return (
    <div className="grid grid-cols-4 gap-8">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="animate-pulse aspect-square bg-gray-100 px-6 py-4">
          <div className="h-20 bg-gray-200 rounded" />
          <div className="h-4 mt-2 bg-gray-200 rounded" />
          <div className="h-4 mt-2 bg-gray-200 rounded" />
          <div className="h-4 mt-2 bg-gray-200 rounded" />
        </Card>
      ))}
    </div>
  )
}
