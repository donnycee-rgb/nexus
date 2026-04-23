import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import BottomNav from '@/components/ui/BottomNav'
import Sidebar from '@/components/ui/Sidebar'
import TopBar from '@/components/ui/TopBar'

const MOBILE_LAYOUT_QUERY = '(max-width: 1023px)'

const getInitialMobileState = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return window.matchMedia(MOBILE_LAYOUT_QUERY).matches
}

export default function AppShell() {
  const [isMobile, setIsMobile] = useState(getInitialMobileState)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const mediaQuery = window.matchMedia(MOBILE_LAYOUT_QUERY)
    const onChange = (event) => setIsMobile(event.matches)
    setIsMobile(mediaQuery.matches)

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', onChange)
      return () => mediaQuery.removeEventListener('change', onChange)
    }

    mediaQuery.addListener(onChange)
    return () => mediaQuery.removeListener(onChange)
  }, [])


  return (
    <div
      className="flex min-h-screen w-full"
      style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
    >
      {!isMobile ? <Sidebar /> : null}

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <TopBar />

        <main className={`flex-1 overflow-y-auto px-4 py-4 sm:px-6 lg:px-8 ${isMobile ? 'pb-24' : 'pb-8'}`}>
          <div className="mx-auto w-full max-w-[var(--content-max)]">
            <Outlet />
          </div>
        </main>
      </div>

      {isMobile ? <BottomNav /> : null}
    </div>
  )
}
