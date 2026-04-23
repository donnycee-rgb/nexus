const PLATFORM_META = {
  instagram: { label: 'Instagram', token: '--platform-ig', short: 'IG' },
  tiktok: { label: 'TikTok', token: '--platform-tt', short: 'TT' },
  facebook: { label: 'Facebook', token: '--platform-fb', short: 'FB' },
  x: { label: 'X', token: '--platform-x', short: 'X' },
  twitter: { label: 'X', token: '--platform-x', short: 'X' },
  youtube: { label: 'YouTube', token: '--platform-yt', short: 'YT' },
  whatsapp: { label: 'WhatsApp', token: '--platform-wa', short: 'WA' },
  linkedin: { label: 'LinkedIn', token: '--platform-li', short: 'LI' },
}

export default function PlatformChip({ platform, compact = false, className = '' }) {
  const key = String(platform ?? '').toLowerCase()
  const meta = PLATFORM_META[key] ?? {
    label: platform ?? 'Platform',
    token: '--text-secondary',
    short: 'PL',
  }
  const platformColor = `var(${meta.token})`

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium ${className}`.trim()}
      style={{
        borderColor: platformColor,
        backgroundColor: 'var(--bg-overlay)',
        color: platformColor,
      }}
    >
      <span
        className="inline-flex size-4 items-center justify-center rounded-full text-[9px] font-semibold"
        style={{
          backgroundColor: platformColor,
          color: meta.token === '--platform-x' ? 'var(--bg-base)' : 'white',
        }}
      >
        {meta.short}
      </span>
      {!compact ? <span>{meta.label}</span> : null}
    </span>
  )
}
