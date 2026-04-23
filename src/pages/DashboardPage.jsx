import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Activity, BarChart as BarChartIcon, FileText, Users } from 'lucide-react'
import StatCard from '@/components/ui/StatCard'
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

const PLATFORM_TOKENS = {
  instagram: '--platform-ig',
  tiktok: '--platform-tt',
  facebook: '--platform-fb',
  x: '--platform-x',
  twitter: '--platform-x',
  youtube: '--platform-yt',
  whatsapp: '--platform-wa',
  linkedin: '--platform-li',
}

const formatNumber = (value) => new Intl.NumberFormat('en-US').format(Number(value ?? 0))

const statusStyles = {
  published: { color: 'var(--success)', backgroundColor: 'var(--success-dim)' },
  scheduled: { color: 'var(--warning)', backgroundColor: 'var(--warning-dim)' },
  draft: { color: 'var(--text-secondary)', backgroundColor: 'var(--bg-overlay)' },
}

function ChartTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null
  }

  const item = payload[0]?.payload
  return (
    <div
      className="rounded-[10px] border px-3 py-2 text-xs"
      style={{
        backgroundColor: 'var(--bg-elevated)',
        borderColor: 'var(--bg-border)',
      }}
    >
      <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
        {item?.label}
      </p>
      <p style={{ color: 'var(--text-secondary)' }}>
        Reach: <span style={{ color: 'var(--text-primary)' }}>{formatNumber(item?.reach)}</span>
      </p>
    </div>
  )
}

export default function DashboardPage() {
  const activeWorkspaceId = useAuthStore((state) => state.activeWorkspace?.id ?? null)

  const dashboardData = useMemo(() => {
    if (!activeWorkspaceId) {
      return null
    }

    const workspaceData = MOCK_DATA.workspaceData?.[activeWorkspaceId]
    const analytics = MOCK_DATA.analytics?.[activeWorkspaceId]
    if (!workspaceData || !analytics) {
      return null
    }

    const posts = [...(workspaceData.posts ?? [])]
    const summary = analytics.summary ?? {}

    const totalFollowers = summary.followers?.current ?? 0
    const totalReach = posts.reduce((total, post) => total + (post.metrics?.reach ?? 0), 0)
    const engagementRate = summary.engagementRate?.current ?? 0
    const postsCount = posts.length

    const publishedCount = posts.filter((post) => post.status === 'published').length
    const draftCount = posts.filter((post) => post.status === 'draft').length
    const postsTrend = postsCount > 0 ? ((publishedCount - draftCount) / postsCount) * 100 : 0

    const connectedPlatforms = (MOCK_DATA.platforms?.[activeWorkspaceId] ?? []).map(
      (platform) => platform.platform,
    )
    const fallbackPlatforms = posts.flatMap((post) => post.platforms ?? [])
    const scopedPlatforms = [...new Set([...connectedPlatforms, ...fallbackPlatforms])]

    const reachByPlatform = scopedPlatforms.reduce((accumulator, platform) => {
      return {
        ...accumulator,
        [platform]: 0,
      }
    }, {})

    posts.forEach((post) => {
      const postPlatforms = post.platforms ?? []
      if (postPlatforms.length === 0) {
        return
      }

      const reachShare = (post.metrics?.reach ?? 0) / postPlatforms.length
      postPlatforms.forEach((platform) => {
        reachByPlatform[platform] = (reachByPlatform[platform] ?? 0) + reachShare
      })
    })

    const platformPerformance = Object.entries(reachByPlatform)
      .map(([platform, reach], index) => {
        const token = PLATFORM_TOKENS[platform] ?? '--accent'
        return {
          index,
          platform,
          label: PLATFORM_LABELS[platform] ?? platform,
          reach: Math.round(reach),
          fill: `var(${token})`,
        }
      })
      .sort((left, right) => right.reach - left.reach)

    const recentActivity = [...posts]
      .sort((left, right) => new Date(right.createdAt) - new Date(left.createdAt))
      .slice(0, 4)

    return {
      totalFollowers,
      totalReach,
      engagementRate,
      postsCount,
      followersTrend: summary.followers?.change ?? 0,
      reachTrend: summary.impressions?.change ?? 0,
      engagementTrend: summary.engagementRate?.change ?? 0,
      postsTrend,
      platformPerformance,
      recentActivity,
    }
  }, [activeWorkspaceId])

  if (!dashboardData) {
    return (
      <section
        className="rounded-[14px] border p-5"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--bg-border)',
        }}
      >
        <h1 style={{ color: 'var(--text-primary)' }}>Dashboard</h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Workspace data is unavailable. Select a workspace to continue.
        </p>
      </section>
    )
  }

  return (
    <div className="grid gap-4 lg:gap-5">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Followers"
          value={formatNumber(dashboardData.totalFollowers)}
          trend={dashboardData.followersTrend}
          icon={Users}
        />
        <StatCard
          label="Total Reach"
          value={formatNumber(dashboardData.totalReach)}
          trend={dashboardData.reachTrend}
          icon={BarChartIcon}
        />
        <StatCard
          label="Engagement"
          value={`${dashboardData.engagementRate.toFixed(2)}%`}
          trend={dashboardData.engagementTrend}
          icon={Activity}
        />
        <StatCard
          label="Posts"
          value={formatNumber(dashboardData.postsCount)}
          trend={dashboardData.postsTrend}
          icon={FileText}
        />
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
        <article
          className="rounded-[14px] border p-4 sm:p-5"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--bg-border)',
          }}
        >
          <h2
            className="mb-4 text-base font-semibold"
            style={{
              color: 'var(--text-primary)',
              fontFamily: '"Cabinet Grotesk", var(--font-display)',
            }}
          >
            Platform Performance
          </h2>

          <motion.div
            className="h-[300px]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={dashboardData.platformPerformance}
                layout="vertical"
                margin={{ top: 8, right: 12, bottom: 8, left: 4 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--bg-border)" horizontal={false} />
                <XAxis type="number" tick={{ fill: 'var(--text-muted)', fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="label"
                  width={90}
                  tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'var(--bg-overlay)' }} />
                <Bar
                  dataKey="reach"
                  animationDuration={700}
                  animationEasing="ease-out"
                  radius={[6, 6, 6, 6]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </article>

        <article
          className="rounded-[14px] border p-4 sm:p-5"
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderColor: 'var(--bg-border)',
          }}
        >
          <h2
            className="mb-3 text-base font-semibold"
            style={{
              color: 'var(--text-primary)',
              fontFamily: '"Cabinet Grotesk", var(--font-display)',
            }}
          >
            Recent Activity
          </h2>

          <div className="grid gap-2.5">
            {dashboardData.recentActivity.map((post, index) => {
              const style = statusStyles[post.status] ?? statusStyles.draft
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: index * 0.08 }}
                  className="rounded-[12px] border p-3"
                  style={{
                    borderColor: 'var(--bg-border)',
                    backgroundColor: 'var(--bg-overlay)',
                  }}
                >
                  <div className="mb-1 flex items-start justify-between gap-2">
                    <p className="truncate text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {post.title}
                    </p>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] uppercase"
                      style={style}
                    >
                      {post.status}
                    </span>
                  </div>
                  <p className="line-clamp-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {post.caption}
                  </p>
                </motion.article>
              )
            })}
          </div>
        </article>
      </section>
    </div>
  )
}