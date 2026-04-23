import { TrendingDown, TrendingUp } from 'lucide-react'

const formatTrend = (value) => {
  const numeric = Number(value ?? 0)
  const absolute = Math.abs(numeric)
  return `${absolute.toFixed(2)}%`
}

export default function StatCard({ label, value, trend = 0, icon: Icon }) {
  const numericTrend = Number(trend ?? 0)
  const isPositive = numericTrend >= 0
  const TrendIcon = isPositive ? TrendingUp : TrendingDown

  return (
    <article
      className="rounded-[14px] border p-4"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--bg-border)',
      }}
    >
      <div className="mb-2 flex items-center justify-between gap-3">
        <p
          className="text-xs uppercase tracking-[0.08em]"
          style={{ color: 'var(--text-muted)' }}
        >
          {label}
        </p>
        {Icon ? (
          <span
            className="grid size-7 place-items-center rounded-[9px]"
            style={{
              backgroundColor: 'var(--bg-overlay)',
              color: 'var(--text-secondary)',
            }}
          >
            <Icon size={14} />
          </span>
        ) : null}
      </div>

      <p
        className="text-2xl font-semibold leading-none sm:text-[1.75rem]"
        style={{
          color: 'var(--text-primary)',
          fontFamily: '"Cabinet Grotesk", var(--font-display)',
        }}
      >
        {value}
      </p>

      <div
        className="mt-3 inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-xs font-medium"
        style={{
          color: isPositive ? 'var(--success)' : 'var(--danger)',
          borderColor: isPositive ? 'var(--success)' : 'var(--danger)',
          backgroundColor: 'var(--bg-overlay)',
        }}
      >
        <TrendIcon size={12} />
        <span>{formatTrend(numericTrend)}</span>
      </div>
    </article>
  )
}
