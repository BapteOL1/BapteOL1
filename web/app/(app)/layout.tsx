import TopBar from '@/components/layout/TopBar'
import TabBar from '@/components/layout/TabBar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-dvh" style={{ backgroundColor: 'var(--color-bg)' }}>
      <TopBar />
      <main className="flex-1 overflow-y-auto pb-20">
        {children}
      </main>
      <TabBar />
    </div>
  )
}
