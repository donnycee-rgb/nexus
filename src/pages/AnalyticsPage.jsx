import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
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

const PLATFORM_ICONS = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  youtube: Youtube,
  x: Twitter,
  twitter: Twitter,
  tiktok: BarChart,
  whatsapp: BarChart,
}

const formatNumber = (value) => new Intl.NumberFormat('en-US').format(Number(value ?? 0))

export default function AnalyticsPage() {
  const activeWorkspaceId = useAuthStore((state) => state.activeWorkspace?.id ?? null)

  const analyticsState = useMemo(() => {
    if (!activeWorkspaceId) {
      return null
    }

    const workspaceAnalytics = MOCK_DATA.analytics?.[activeWorkspaceId]
    const workspacePlatforms = MOCK_DATA.platforms?.[activeWorkspaceId] ?? []
    if (!workspaceAnalytics || workspacePlatforms.length === 0) {
      return null
    }

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
      if (b.engagementRate !== a.engagementRate) {
        return b.engagementRate - a.engagementRate
      }
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
        const Icon = PLATFORM_ICONS[card.platform] ?? BarChart
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
            <div className="mb-3 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span
                  className="grid size-8 place-items-center rounded-[10px]"
                  style={{
                    backgroundColor: 'var(--bg-overlay)',
                    color: platformColor,
                  }}
                >
                  <Icon size={16} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {label}
                  </p>
                  <p className="truncate text-xs" style={{ color: 'var(--text-muted)' }}>
                    {card.account}
                  </p>
                </div>
              </div>

              {isTopPlatform ? (
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
              ) : null}
            </div>

            <div className="mb-3">
              <p className="text-xs uppercase tracking-[0.08em]" style={{ color: 'var(--text-muted)' }}>
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

            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.08em]" style={{ color: 'var(--text-muted)' }}>
                Growth
              </p>
              <p
                className="text-sm font-semibold"
                style={{ color: isGrowthPositive ? 'var(--success)' : 'var(--danger)' }}
              >
                {isGrowthPositive ? '+' : '-'}
                {Math.abs(card.growth).toFixed(2)}%
              </p>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between text-xs">
                <p style={{ color: 'var(--text-muted)' }}>Engagement</p>
                <p style={{ color: 'var(--text-secondary)' }}>{card.engagementRate.toFixed(2)}%</p>
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