const cloneDeep = (value) => JSON.parse(JSON.stringify(value))

// ── Demo credentials ──────────────────────────────────────────
export const DEMO_USER = {
  id: 'user-001',
  name: 'Rita Nwosu',
  email: 'rita@nexus.app',
  avatar: null,
  role: 'owner',
  title: 'Head of Growth',
}

export const DEMO_CREDENTIALS = {
  email: 'rita@nexus.app',
  password: 'N3xus@2026',
}

export const TWO_FA_CONFIG = {
  method: 'app',
  validCode: '246810',
  backupCodes: ['ALFA-90KP', 'BRAV-28QX', 'NOVA-76TP'],
}

// ── Workspaces ────────────────────────────────────────────────
export const WORKSPACES = [
  {
    id: 'ws-aurora',
    company: 'Aurora Labs',
    initials: 'AL',
    color: '#E8621A',
    role: 'admin',
    timezone: 'Africa/Nairobi',
    platforms: ['instagram', 'x', 'linkedin', 'youtube'],
    membersCount: 14,
  },
  {
    id: 'ws-vanta',
    company: 'Vanta Motion',
    initials: 'VM',
    color: '#3B9EE8',
    role: 'member',
    timezone: 'Europe/London',
    platforms: ['instagram', 'tiktok', 'x'],
    membersCount: 9,
  },
  {
    id: 'ws-rivet',
    company: 'Rivet Retail',
    initials: 'RR',
    color: '#2ECC8A',
    role: 'admin',
    timezone: 'America/New_York',
    platforms: ['facebook', 'instagram', 'whatsapp'],
    membersCount: 21,
  },
]

export const MOCK_WORKSPACES = WORKSPACES

// ── Platform meta ─────────────────────────────────────────────
export const PLATFORM_META = {
  instagram: { name: 'Instagram', color: '#E1306C', short: 'IG' },
  tiktok:    { name: 'TikTok',    color: '#FF0050', short: 'TT' },
  facebook:  { name: 'Facebook',  color: '#1877F2', short: 'FB' },
  x:         { name: 'X',         color: '#E7E9EA', short: 'X'  },
  youtube:   { name: 'YouTube',   color: '#FF0000', short: 'YT' },
  whatsapp:  { name: 'WhatsApp',  color: '#25D366', short: 'WA' },
  linkedin:  { name: 'LinkedIn',  color: '#0A66C2', short: 'LI' },
}

// ── Posts ─────────────────────────────────────────────────────
export const POSTS_BY_WORKSPACE = {
  'ws-aurora': [
    {
      id: 'post-aur-001',
      workspaceId: 'ws-aurora',
      title: 'Spring Launch Reel',
      caption: 'From idea to impact. Meet the workflow behind our latest launch.',
      platforms: ['instagram', 'x'],
      status: 'published',
      type: 'video',
      createdAt: '2026-04-21T08:00:00Z',
      publishedAt: '2026-04-21T10:10:00Z',
      scheduledFor: null,
      metrics: { impressions: 128400, reach: 93400, likes: 7210, comments: 412, shares: 298, saves: 680, engagementRate: 8.37 },
    },
    {
      id: 'post-aur-002',
      workspaceId: 'ws-aurora',
      title: 'BTS Carousel',
      caption: 'A behind-the-scenes look at our product sprint board.',
      platforms: ['linkedin', 'instagram'],
      status: 'scheduled',
      type: 'image',
      createdAt: '2026-04-22T12:16:00Z',
      publishedAt: null,
      scheduledFor: '2026-04-28T11:30:00Z',
      metrics: { impressions: 0, reach: 0, likes: 0, comments: 0, shares: 0, saves: 0, engagementRate: 0 },
    },
    {
      id: 'post-aur-003',
      workspaceId: 'ws-aurora',
      title: 'Community Spotlight',
      caption: 'Celebrating creators building with NEXUS every week.',
      platforms: ['x'],
      status: 'draft',
      type: 'image',
      createdAt: '2026-04-23T09:02:00Z',
      publishedAt: null,
      scheduledFor: null,
      metrics: { impressions: 0, reach: 0, likes: 0, comments: 0, shares: 0, saves: 0, engagementRate: 0 },
    },
    {
      id: 'post-aur-004',
      workspaceId: 'ws-aurora',
      title: 'Analytics Snapshot',
      caption: 'Q2 benchmark highlights for growth teams.',
      platforms: ['linkedin'],
      status: 'published',
      type: 'image',
      createdAt: '2026-04-18T06:22:00Z',
      publishedAt: '2026-04-19T08:00:00Z',
      scheduledFor: null,
      metrics: { impressions: 74300, reach: 55200, likes: 2780, comments: 220, shares: 164, saves: 340, engagementRate: 6.31 },
    },
  ],
  'ws-vanta': [
    {
      id: 'post-van-001',
      workspaceId: 'ws-vanta',
      title: 'Motion Clip #13',
      caption: 'Fast cuts. Strong story. Better conversion.',
      platforms: ['tiktok', 'instagram'],
      status: 'published',
      type: 'video',
      createdAt: '2026-04-20T07:00:00Z',
      publishedAt: '2026-04-20T11:45:00Z',
      scheduledFor: null,
      metrics: { impressions: 218900, reach: 171400, likes: 10320, comments: 982, shares: 645, saves: 1105, engagementRate: 7.48 },
    },
    {
      id: 'post-van-002',
      workspaceId: 'ws-vanta',
      title: 'Teaser Thread',
      caption: 'Ready for next week. Sneak peek in 3 tweets.',
      platforms: ['x'],
      status: 'scheduled',
      type: 'image',
      createdAt: '2026-04-23T11:30:00Z',
      publishedAt: null,
      scheduledFor: '2026-04-28T13:00:00Z',
      metrics: { impressions: 0, reach: 0, likes: 0, comments: 0, shares: 0, saves: 0, engagementRate: 0 },
    },
  ],
  'ws-rivet': [
    {
      id: 'post-riv-001',
      workspaceId: 'ws-rivet',
      title: 'Weekend Offers Story',
      caption: "Swipe up for this weekend's top deals.",
      platforms: ['instagram', 'facebook'],
      status: 'published',
      type: 'image',
      createdAt: '2026-04-19T10:14:00Z',
      publishedAt: '2026-04-19T12:00:00Z',
      scheduledFor: null,
      metrics: { impressions: 93600, reach: 73300, likes: 3922, comments: 301, shares: 202, saves: 314, engagementRate: 5.06 },
    },
    {
      id: 'post-riv-002',
      workspaceId: 'ws-rivet',
      title: 'WhatsApp Broadcast Draft',
      caption: 'Loyalty club exclusive drop goes live tomorrow morning.',
      platforms: ['whatsapp'],
      status: 'draft',
      type: 'image',
      createdAt: '2026-04-23T07:24:00Z',
      publishedAt: null,
      scheduledFor: null,
      metrics: { impressions: 0, reach: 0, likes: 0, comments: 0, shares: 0, saves: 0, engagementRate: 0 },
    },
  ],
}

// ── Messages ──────────────────────────────────────────────────
export const MESSAGES_BY_WORKSPACE = {
  'ws-aurora': [
    {
      id: 'thread-aur-001',
      workspaceId: 'ws-aurora',
      platform: 'instagram',
      participant: { id: 'client-223', name: 'Jordan M.', handle: '@jordesign', initials: 'JM' },
      lastMessageAt: '2026-04-27T17:12:00Z',
      unreadCount: 2,
      pinned: true,
      messages: [
        { id: 'msg-001', sender: 'client', senderName: 'Jordan M.', body: 'Can I feature this reel in my weekly roundup?', sentAt: '2026-04-27T16:59:00Z' },
        { id: 'msg-002', sender: 'client', senderName: 'Jordan M.', body: 'Also need the posting guidelines.', sentAt: '2026-04-27T17:12:00Z' },
      ],
    },
    {
      id: 'thread-aur-002',
      workspaceId: 'ws-aurora',
      platform: 'x',
      participant: { id: 'client-819', name: 'Tech Orbit', handle: '@techorbitdaily', initials: 'TO' },
      lastMessageAt: '2026-04-26T21:03:00Z',
      unreadCount: 0,
      pinned: false,
      messages: [
        { id: 'msg-003', sender: 'agent', senderName: 'NEXUS Team', body: 'Thanks for the mention! Media kit attached.', sentAt: '2026-04-26T21:03:00Z' },
      ],
    },
    {
      id: 'thread-aur-003',
      workspaceId: 'ws-aurora',
      platform: 'linkedin',
      participant: { id: 'client-441', name: 'Priya Sharma', handle: 'priya-sharma-vc', initials: 'PS' },
      lastMessageAt: '2026-04-27T09:30:00Z',
      unreadCount: 1,
      pinned: false,
      messages: [
        { id: 'msg-004', sender: 'client', senderName: 'Priya Sharma', body: 'Would love to connect about a potential partnership.', sentAt: '2026-04-27T09:30:00Z' },
      ],
    },
  ],
  'ws-vanta': [
    {
      id: 'thread-van-001',
      workspaceId: 'ws-vanta',
      platform: 'tiktok',
      participant: { id: 'client-341', name: 'Mila Creative', handle: '@milacreates', initials: 'MC' },
      lastMessageAt: '2026-04-27T08:44:00Z',
      unreadCount: 1,
      pinned: false,
      messages: [
        { id: 'msg-005', sender: 'client', senderName: 'Mila Creative', body: 'Can we collab on the next trend format?', sentAt: '2026-04-27T08:44:00Z' },
      ],
    },
  ],
  'ws-rivet': [
    {
      id: 'thread-riv-001',
      workspaceId: 'ws-rivet',
      platform: 'whatsapp',
      participant: { id: 'client-506', name: 'Ifeoma B.', handle: '+234 812 227 1098', initials: 'IB' },
      lastMessageAt: '2026-04-27T12:02:00Z',
      unreadCount: 1,
      pinned: false,
      messages: [
        { id: 'msg-006', sender: 'client', senderName: 'Ifeoma B.', body: 'Is same-day delivery available in Abuja?', sentAt: '2026-04-27T12:02:00Z' },
      ],
    },
  ],
}

// ── Notifications ─────────────────────────────────────────────
export const NOTIFICATIONS_BY_WORKSPACE = {
  'ws-aurora': [
    { id: 'notif-aur-001', workspaceId: 'ws-aurora', type: 'message',  severity: 'info',    title: 'New inbox message',          body: 'Jordan M. replied to your campaign DM.',              createdAt: '2026-04-27T17:13:00Z', read: false },
    { id: 'notif-aur-002', workspaceId: 'ws-aurora', type: 'publish',  severity: 'success', title: 'Post published successfully', body: 'Spring Launch Reel is live on Instagram and X.',       createdAt: '2026-04-21T10:11:00Z', read: true  },
    { id: 'notif-aur-003', workspaceId: 'ws-aurora', type: 'approval', severity: 'warning', title: 'Approval pending',            body: 'BTS Carousel is waiting for review.',                  createdAt: '2026-04-22T12:20:00Z', read: false },
    { id: 'notif-aur-004', workspaceId: 'ws-aurora', type: 'system',   severity: 'info',    title: 'Analytics sync complete',     body: 'Latest engagement metrics are now available.',         createdAt: '2026-04-27T06:45:00Z', read: true  },
    { id: 'notif-aur-005', workspaceId: 'ws-aurora', type: 'follow',   severity: 'success', title: '142 new followers',           body: 'Your Instagram gained 142 followers today.',           createdAt: '2026-04-27T08:00:00Z', read: false },
  ],
  'ws-vanta': [
    { id: 'notif-van-001', workspaceId: 'ws-vanta', type: 'publish', severity: 'success', title: 'Motion Clip exceeded baseline', body: 'Performance is 18% above campaign average.',           createdAt: '2026-04-21T09:45:00Z', read: false },
    { id: 'notif-van-002', workspaceId: 'ws-vanta', type: 'system',  severity: 'warning', title: 'Token expiring',                body: 'Instagram account token expires in 5 days.',           createdAt: '2026-04-27T03:12:00Z', read: false },
  ],
  'ws-rivet': [
    { id: 'notif-riv-001', workspaceId: 'ws-rivet', type: 'message', severity: 'info',    title: 'New WhatsApp response',        body: 'A customer asked about return policy.',                createdAt: '2026-04-27T12:03:00Z', read: false },
    { id: 'notif-riv-002', workspaceId: 'ws-rivet', type: 'publish', severity: 'danger',  title: 'Boost campaign paused',        body: 'Ad account reached daily spend cap.',                  createdAt: '2026-04-20T22:18:00Z', read: true  },
  ],
}

// ── Analytics ─────────────────────────────────────────────────
export const ANALYTICS_BY_WORKSPACE = {
  'ws-aurora': {
    range: '30d',
    summary: {
      followers:     { current: 128400, previous: 117200, change: 9.56  },
      impressions:   { current: 612000, previous: 553200, change: 10.63 },
      engagementRate:{ current: 7.82,   previous: 6.94,   change: 12.68 },
      ctr:           { current: 3.12,   previous: 2.78,   change: 12.23 },
    },
    engagementTrend: [
      { label: 'Mon', value: 6.8 }, { label: 'Tue', value: 7.1 },
      { label: 'Wed', value: 7.9 }, { label: 'Thu', value: 8.4 },
      { label: 'Fri', value: 8.1 }, { label: 'Sat', value: 7.4 },
      { label: 'Sun', value: 7.0 },
    ],
    reachTrend: [
      { label: 'Mon', value: 62400 }, { label: 'Tue', value: 71500 },
      { label: 'Wed', value: 81200 }, { label: 'Thu', value: 87600 },
      { label: 'Fri', value: 85200 }, { label: 'Sat', value: 79400 },
      { label: 'Sun', value: 75600 },
    ],
    platformBreakdown: [
      { platform: 'instagram', followers: 68400, engagementRate: 8.9, trafficShare: 43 },
      { platform: 'x',         followers: 31400, engagementRate: 6.4, trafficShare: 27 },
      { platform: 'linkedin',  followers: 22600, engagementRate: 5.8, trafficShare: 19 },
      { platform: 'youtube',   followers: 6000,  engagementRate: 4.9, trafficShare: 11 },
    ],
  },
  'ws-vanta': {
    range: '30d',
    summary: {
      followers:     { current: 86400, previous: 79300, change: 8.95 },
      impressions:   { current: 704200, previous: 645100, change: 9.16 },
      engagementRate:{ current: 7.31,  previous: 6.65,  change: 9.92 },
      ctr:           { current: 2.88,  previous: 2.66,  change: 8.27 },
    },
    engagementTrend: [
      { label: 'Mon', value: 6.3 }, { label: 'Tue', value: 6.7 },
      { label: 'Wed', value: 7.0 }, { label: 'Thu', value: 7.8 },
      { label: 'Fri', value: 7.5 }, { label: 'Sat', value: 7.1 },
      { label: 'Sun', value: 6.9 },
    ],
    reachTrend: [
      { label: 'Mon', value: 88200 }, { label: 'Tue', value: 92400 },
      { label: 'Wed', value: 95200 }, { label: 'Thu', value: 100100 },
      { label: 'Fri', value: 98200 }, { label: 'Sat', value: 94600 },
      { label: 'Sun', value: 93100 },
    ],
    platformBreakdown: [
      { platform: 'tiktok',    followers: 42100, engagementRate: 8.1, trafficShare: 49 },
      { platform: 'instagram', followers: 31200, engagementRate: 7.3, trafficShare: 34 },
      { platform: 'x',         followers: 13100, engagementRate: 5.2, trafficShare: 17 },
    ],
  },
  'ws-rivet': {
    range: '30d',
    summary: {
      followers:     { current: 172300, previous: 165500, change: 4.11 },
      impressions:   { current: 512300, previous: 489100, change: 4.74 },
      engagementRate:{ current: 5.44,  previous: 5.08,  change: 7.09 },
      ctr:           { current: 4.01,  previous: 3.66,  change: 9.56 },
    },
    engagementTrend: [
      { label: 'Mon', value: 4.9 }, { label: 'Tue', value: 5.2 },
      { label: 'Wed', value: 5.5 }, { label: 'Thu', value: 5.7 },
      { label: 'Fri', value: 5.8 }, { label: 'Sat', value: 5.3 },
      { label: 'Sun', value: 5.1 },
    ],
    reachTrend: [
      { label: 'Mon', value: 60600 }, { label: 'Tue', value: 64500 },
      { label: 'Wed', value: 68900 }, { label: 'Thu', value: 70100 },
      { label: 'Fri', value: 72000 }, { label: 'Sat', value: 65800 },
      { label: 'Sun', value: 61200 },
    ],
    platformBreakdown: [
      { platform: 'facebook',  followers: 83400, engagementRate: 4.8, trafficShare: 39 },
      { platform: 'instagram', followers: 70100, engagementRate: 5.7, trafficShare: 35 },
      { platform: 'whatsapp',  followers: 18800, engagementRate: 6.1, trafficShare: 26 },
    ],
  },
}

// ── Scheduler ─────────────────────────────────────────────────
export const SCHEDULER_BY_WORKSPACE = {
  'ws-aurora': [
    { id: 'sch-aur-001', workspaceId: 'ws-aurora', title: 'BTS Carousel',        platforms: ['linkedin', 'instagram'], scheduledFor: '2026-04-28T11:30:00Z', status: 'scheduled', postId: 'post-aur-002' },
    { id: 'sch-aur-002', workspaceId: 'ws-aurora', title: 'Weekly tips thread',   platforms: ['x'],                    scheduledFor: '2026-04-29T14:00:00Z', status: 'scheduled', postId: null },
  ],
  'ws-vanta': [
    { id: 'sch-van-001', workspaceId: 'ws-vanta', title: 'Teaser Thread',         platforms: ['x'],                    scheduledFor: '2026-04-28T13:00:00Z', status: 'scheduled', postId: 'post-van-002' },
  ],
  'ws-rivet': [
    { id: 'sch-riv-001', workspaceId: 'ws-rivet', title: 'Loyalty Broadcast',     platforms: ['whatsapp'],             scheduledFor: '2026-04-28T07:45:00Z', status: 'draft',     postId: 'post-riv-002' },
  ],
}

// ── Platform connections ──────────────────────────────────────
export const PLATFORMS_BY_WORKSPACE = {
  'ws-aurora': [
    { id: 'plat-aur-ig', platform: 'instagram', status: 'connected', account: '@auroralabs',      followers: 68400, bio: 'Building the future of work. ⚡',  website: 'https://auroralabs.io' },
    { id: 'plat-aur-x',  platform: 'x',         status: 'connected', account: '@auroralabs',      followers: 31400, bio: 'Products for builders.',            website: 'https://auroralabs.io' },
    { id: 'plat-aur-li', platform: 'linkedin',   status: 'connected', account: 'Aurora Labs',      followers: 22600, bio: 'Aurora Labs — Growth Infrastructure', website: 'https://auroralabs.io' },
    { id: 'plat-aur-yt', platform: 'youtube',    status: 'connected', account: 'Aurora Labs Media', followers: 6000, bio: 'Tutorials, demos and launches.',    website: 'https://auroralabs.io' },
  ],
  'ws-vanta': [
    { id: 'plat-van-ig', platform: 'instagram', status: 'expiring',  account: '@vantamotion',     followers: 31200, bio: 'Motion design studio.',            website: 'https://vantamotion.co' },
    { id: 'plat-van-tt', platform: 'tiktok',    status: 'connected', account: '@vantamotion',     followers: 42100, bio: 'We make things move.',             website: 'https://vantamotion.co' },
    { id: 'plat-van-x',  platform: 'x',         status: 'connected', account: '@vantamotion',     followers: 13100, bio: 'Motion design & creative direction.', website: 'https://vantamotion.co' },
  ],
  'ws-rivet': [
    { id: 'plat-riv-fb', platform: 'facebook',  status: 'connected', account: 'Rivet Retail',     followers: 83400, bio: 'Your everyday essentials store.',  website: 'https://rivetretail.com' },
    { id: 'plat-riv-ig', platform: 'instagram', status: 'connected', account: '@rivetretail',     followers: 70100, bio: 'Shop the look. 🛍️',               website: 'https://rivetretail.com' },
    { id: 'plat-riv-wa', platform: 'whatsapp',  status: 'connected', account: '+1 415 228 0184',  followers: 18800, bio: 'Customer support & offers.',       website: 'https://rivetretail.com' },
  ],
}

// ── Team members ──────────────────────────────────────────────
export const TEAM_BY_WORKSPACE = {
  'ws-aurora': [
    { id: 'u1', name: 'Rita Nwosu',   email: 'rita@nexus.app',          role: 'admin',  joined: '2026-01-10', permissions: ['compose_posts','publish_posts','delete_posts','view_analytics','reply_messages','schedule_posts','manage_profiles','use_kill_switch','access_admin'] },
    { id: 'u2', name: 'Jordan Lee',   email: 'jordan@auroralabs.io',    role: 'member', joined: '2026-02-14', permissions: ['compose_posts','view_analytics','reply_messages','schedule_posts'] },
    { id: 'u3', name: 'Sam Rivera',   email: 'sam@auroralabs.io',       role: 'member', joined: '2026-03-01', permissions: ['compose_posts','view_analytics'] },
  ],
  'ws-vanta': [
    { id: 'u4', name: 'Mia Chen',     email: 'mia@vantamotion.co',      role: 'admin',  joined: '2026-01-20', permissions: ['compose_posts','publish_posts','delete_posts','view_analytics','reply_messages','schedule_posts','manage_profiles','use_kill_switch','access_admin'] },
  ],
  'ws-rivet': [
    { id: 'u5', name: 'Tom Brooks',   email: 'tom@rivetretail.com',     role: 'admin',  joined: '2026-01-05', permissions: ['compose_posts','publish_posts','delete_posts','view_analytics','reply_messages','schedule_posts','manage_profiles','use_kill_switch','access_admin'] },
    { id: 'u6', name: 'Aisha Patel',  email: 'aisha@rivetretail.com',   role: 'member', joined: '2026-03-15', permissions: ['compose_posts','reply_messages'] },
  ],
}

export const ALL_PERMISSIONS = [
  'compose_posts', 'publish_posts', 'delete_posts',
  'view_analytics', 'reply_messages', 'schedule_posts',
  'manage_profiles', 'use_kill_switch', 'access_admin',
]

export const MOCK_SONGS = [
  { id: 1, title: 'Espresso',          artist: 'Sabrina Carpenter',       trending: true  },
  { id: 2, title: 'Harleys in Hawaii', artist: 'Katy Perry',              trending: true  },
  { id: 3, title: 'Flowers',           artist: 'Miley Cyrus',             trending: false },
  { id: 4, title: 'As It Was',         artist: 'Harry Styles',            trending: true  },
  { id: 5, title: 'Unholy',            artist: 'Sam Smith ft Kim Petras', trending: false },
  { id: 6, title: 'Creepin',           artist: 'Metro Boomin',            trending: false },
]

// ── Aggregated MOCK_DATA object ───────────────────────────────
export const MOCK_DATA = {
  user:        DEMO_USER,
  credentials: DEMO_CREDENTIALS,
  twoFA:       TWO_FA_CONFIG,
  workspaces:  WORKSPACES,
  posts:       POSTS_BY_WORKSPACE,
  messages:    MESSAGES_BY_WORKSPACE,
  notifications: NOTIFICATIONS_BY_WORKSPACE,
  analytics:   ANALYTICS_BY_WORKSPACE,
  scheduler:   SCHEDULER_BY_WORKSPACE,
  platforms:   PLATFORMS_BY_WORKSPACE,
  team:        TEAM_BY_WORKSPACE,
}

export const getWorkspaceData = (workspaceId) => {
  const id = MOCK_DATA.workspaces.find(w => w.id === workspaceId) ? workspaceId : 'ws-aurora'
  return cloneDeep({
    posts:         POSTS_BY_WORKSPACE[id]         ?? [],
    messages:      MESSAGES_BY_WORKSPACE[id]      ?? [],
    notifications: NOTIFICATIONS_BY_WORKSPACE[id] ?? [],
    analytics:     ANALYTICS_BY_WORKSPACE[id]     ?? {},
    scheduler:     SCHEDULER_BY_WORKSPACE[id]     ?? [],
    platforms:     PLATFORMS_BY_WORKSPACE[id]     ?? [],
    team:          TEAM_BY_WORKSPACE[id]           ?? [],
  })
}

export default MOCK_DATA