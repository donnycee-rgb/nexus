import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart2, TrendingUp, TrendingDown } from 'lucide-react'
import { useAuthStore } from '@/features/auth/store'
import { MOCK_DATA } from '@/utils/mockData'

const PLATFORM_LABELS = {
  instagram: 'Instagram',
  tiktok: 'TikTok',
  facebook: 'Facebook',
  x: 'X',
  twitter: 'X',
  youtube: 'YouTube',
  whatsapp: 'WhatsApp',
  linkedin: 'LinkedIn',
}

const PLATFORM_COLORS = {
  instagram: 'var(--platform-ig)',
  tiktok: 'var(--platform-tt)',
  facebook: 'var(--platform-fb)',
  x: 'var(--platform-x)',
  twitter: 'var(--platform-x)',
  youtube: 'var(--platform-yt)',
  whatsapp: 'var(--platform-wa)',
  linkedin: 'var(--platform-li)',
}

// Inline SVG brand icons — no external dependency needed
const BrandIcons = {
  instagram: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.97.24 2.43.403a4.92 4.92 0 0 1 1.772 1.153 4.92 4.92 0 0 1 1.153 1.772c.163.46.35 1.26.403 2.43.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.24 1.97-.403 2.43a4.92 4.92 0 0 1-1.153 1.772 4.92 4.92 0 0 1-1.772 1.153c-.46.163-1.26.35-2.43.403-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.24-2.43-.403a4.92 4.92 0 0 1-1.772-1.153A4.92 4.92 0 0 1 1.64 19.43c-.163-.46-.35-1.26-.403-2.43C1.175 15.734 1.163 15.354 1.163 12s.012-3.584.07-4.85c.054-1.17.24-1.97.403-2.43a4.92 4.92 0 0 1 1.153-1.772A4.92 4.92 0 0 1 4.56 1.795c.46-.163 1.26-.35 2.43-.403C8.256 2.175 8.636 2.163 12 2.163zm0 1.802c-3.146 0-3.519.011-4.77.068-1.07.049-1.65.226-2.037.375a3.116 3.116 0 0 0-1.158.753 3.116 3.116 0 0 0-.753 1.158c-.149.387-.326.967-.375 2.037C2.858 9.396 2.847 9.77 2.847 12c0 2.23.011 2.604.068 3.855.049 1.07.226 1.65.375 2.037.175.465.4.8.753 1.158.358.353.693.578 1.158.753.387.149.967.326 2.037.375C8.48 20.227 8.854 20.238 12 20.238c3.146 0 3.52-.011 4.77-.068 1.07-.049 1.65-.226 2.037-.375a3.116 3.116 0 0 0 1.158-.753 3.116 3.116 0 0 0 .753-1.158c.149-.387.326-.967.375-2.037.057-1.251.068-1.625.068-3.855 0-2.23-.011-2.604-.068-3.855-.049-1.07-.226-1.65-.375-2.037a3.116 3.116 0 0 0-.753-1.158 3.116 3.116 0 0 0-1.158-.753c-.387-.149-.967-.326-2.037-.375C15.52 3.976 15.146 3.965 12 3.965zm0 3.063A4.972 4.972 0 1 1 12 17 4.972 4.972 0 0 1 12 7.028zm0 1.802a3.17 3.17 0 1 0 0 6.34 3.17 3.17 0 0 0 0-6.34zm5.23-3.22a1.162 1.162 0 1 1 0 2.324 1.162 1.162 0 0 1 0-2.324z"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.269h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  youtube: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  twitter: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.912-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.17 8.17 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
    </svg>
  ),
}

const formatNumber = (value) => new Intl.NumberFormat('en-US').format(Number(value ?? 0))

export default function AnalyticsPage() {
  const activeWorkspaceId = useAuthStore((state) => state.activeWorkspace?.id ?? null)

  const analyticsState = useMemo(() => {
    if (!activeWorkspaceId) return null

    const workspaceAnalytics = MOCK_DATA.analytics?.[activeWorkspaceId]
    const workspacePlatforms = MOCK_DATA.platforms?.[activeWorkspaceId] ?? []

    if (!workspaceAnalytics || workspacePlatforms.length === 0) return null

    const baseGrowth = workspaceAnalytics.summary?.followers?.change ?? 0

    const cards = workspacePlatforms.map((connection, index) => {
      const breakdown =
        workspaceAnalytics.platformBreakdown?.find(
          (item) => item.platform === connection.platform,
        ) ?? {}

      const followers = breakdown.followers ?? 0
      const engagementRate = breakdown.engagementRate ?? 0
      const trafficShare = breakdown.trafficShare ?? 0
      const growth = Number((baseGrowth * (trafficShare / 100 || 0.5)).toFixed(2))
      const engagementWidth = Math.max(4, Math.min(100, Math.round(engagementRate * 10)))

      return {
        index,
        platform: connection.platform,
        account: connection.account,
        followers,
        growth,
        engagementRate,
        engagementWidth,
      }
    })

    const topPlatform = [...cards].sort((a, b) => {
      if (b.engagementRate !== a.engagementRate) return b.engagementRate - a.engagementRate
      return b.followers - a.followers
    })[0]

    return {
      cards,
      topPlatform: topPlatform?.platform ?? null,
    }
  }, [activeWorkspaceId])

  if (!analyticsState) {
    return (
      <section
        className="rounded-[14px] border p-5"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--bg-border)',
        }}
      >
        <h1 style={{ color: 'var(--text-primary)' }}>Analytics</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Workspace analytics are unavailable. Select a workspace to continue.
        </p>
      </section>
    )
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {analyticsState.cards.map((card) => {
        const isTopPlatform = analyticsState.topPlatform === card.platform
        const icon = BrandIcons[card.platform] ?? <BarChart2 size={16} />
        const label = PLATFORM_LABELS[card.platform] ?? card.platform
        const platformColor = PLATFORM_COLORS[card.platform] ?? 'var(--accent)'
        const isGrowthPositive = card.growth >= 0

        return (
          <motion.article
            key={card.platform}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: card.index * 0.07 }}
            className="rounded-[14px] border p-4"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: isTopPlatform ? 'var(--accent-border)' : 'var(--bg-border)',
              boxShadow: isTopPlatform ? '0 0 0 1px var(--accent-border) inset' : 'none',
            }}
          >
            {/* Header */}
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className="grid size-8 place-items-center rounded-[10px]"
                  style={{
                    backgroundColor: 'var(--bg-overlay)',
                    color: platformColor,
                  }}
                >
                  {icon}
                </span>
                <div className="min-w-0">
                  <p
                    className="truncate text-sm font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {label}
                  </p>
                  <p className="truncate text-xs" style={{ color: 'var(--text-muted)' }}>
                    {card.account}
                  </p>
                </div>
              </div>

              {isTopPlatform && (
                <span
                  className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] uppercase"
                  style={{
                    color: 'var(--accent)',
                    borderColor: 'var(--accent-border)',
                    backgroundColor: 'var(--accent-dim)',
                  }}
                >
                  Top Platform
                </span>
              )}
            </div>

            {/* Followers */}
            <div className="mb-3">
              <p
                className="text-xs uppercase tracking-[0.08em]"
                style={{ color: 'var(--text-muted)' }}
              >
                Followers
              </p>
              <p
                className="mt-1 text-3xl leading-none"
                style={{
                  color: 'var(--text-primary)',
                  fontFamily: '"Cabinet Grotesk", var(--font-display)',
                }}
              >
                {formatNumber(card.followers)}
              </p>
            </div>

            {/* Growth */}
            <div className="mb-4 flex items-center justify-between">
              <p
                className="text-xs uppercase tracking-[0.08em]"
                style={{ color: 'var(--text-muted)' }}
              >
                Growth
              </p>
              <p
                className="flex items-center gap-1 text-sm font-semibold"
                style={{ color: isGrowthPositive ? 'var(--success)' : 'var(--danger)' }}
              >
                {isGrowthPositive ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                {isGrowthPositive ? '+' : '-'}
                {Math.abs(card.growth).toFixed(2)}%
              </p>
            </div>

            {/* Engagement Bar */}
            <div>
              <div className="mb-1 flex items-center justify-between text-xs">
                <p style={{ color: 'var(--text-muted)' }}>Engagement</p>
                <p style={{ color: 'var(--text-secondary)' }}>
                  {card.engagementRate.toFixed(2)}%
                </p>
              </div>
              <div
                className="h-2.5 overflow-hidden rounded-full border"
                style={{
                  borderColor: 'var(--bg-border)',
                  backgroundColor: 'var(--bg-overlay)',
                }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: platformColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${card.engagementWidth}%` }}
                  transition={{ duration: 0.7, delay: card.index * 0.1, ease: 'easeOut' }}
                />
              </div>
            </div>
          </motion.article>
        )
      })}
    </section>
  )
}