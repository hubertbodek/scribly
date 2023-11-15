export default function DashboardView({ children }: { children: React.ReactNode }) {
  return <section className="flex-1 px-4 overflow-y-scroll">{children}</section>
}

DashboardView.Title = Title

function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="text-h2 font-bold mb-4">{children}</h2>
}
