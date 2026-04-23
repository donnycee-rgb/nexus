import { create } from 'zustand'
import { DEFAULT_WORKSPACE_ID, getWorkspaceData } from '@/utils/mockData'

const createId = (prefix) => {
  const random = Math.random().toString(36).slice(2, 8)
  return `${prefix}-${Date.now().toString(36)}-${random}`
}

const toUnix = (value) => new Date(value ?? 0).getTime()

const sortByDate = (items, key) => {
  return [...items].sort((a, b) => toUnix(b?.[key]) - toUnix(a?.[key]))
}

const sortPosts = (posts) => sortByDate(posts, 'createdAt')
const sortNotifications = (notifications) => sortByDate(notifications, 'createdAt')
const sortThreads = (threads) => sortByDate(threads, 'lastMessageAt')

const buildStateFromWorkspace = (workspaceId = DEFAULT_WORKSPACE_ID) => {
  const seed = getWorkspaceData(workspaceId)

  return {
    activeWorkspaceId: workspaceId,
    posts: sortPosts(seed.posts ?? []),
    notifications: sortNotifications(seed.notifications ?? []),
    messages: sortThreads(seed.messages ?? []),
    analytics: seed.analytics ?? null,
    scheduler: seed.scheduler ?? [],
    platforms: seed.platforms ?? [],
  }
}

const initialWorkspaceState = buildStateFromWorkspace(DEFAULT_WORKSPACE_ID)

export const useWorkspaceStore = create((set, get) => ({
  ...initialWorkspaceState,

  hydrateWorkspace: (workspaceId) => {
    const nextState = buildStateFromWorkspace(workspaceId)
    set(nextState)
    return true
  },

  setPosts: (posts = []) =>
    set({
      posts: sortPosts(posts),
    }),

  addPost: (post) =>
    set((state) => {
      const now = new Date().toISOString()
      const nextPost = {
        id: post?.id ?? createId('post'),
        workspaceId: state.activeWorkspaceId,
        createdAt: now,
        updatedAt: now,
        status: 'draft',
        platforms: [],
        tags: [],
        media: [],
        metrics: {
          impressions: 0,
          reach: 0,
          likes: 0,
          comments: 0,
          shares: 0,
          saves: 0,
          clicks: 0,
          engagementRate: 0,
        },
        ...post,
      }

      return {
        posts: sortPosts([nextPost, ...state.posts]),
      }
    }),

  updatePost: (postId, updates) =>
    set((state) => {
      const now = new Date().toISOString()
      return {
        posts: state.posts.map((post) =>
          post.id === postId ? { ...post, ...updates, updatedAt: now } : post,
        ),
      }
    }),

  removePost: (postId) =>
    set((state) => ({
      posts: state.posts.filter((post) => post.id !== postId),
    })),

  addNotification: (notification) =>
    set((state) => {
      const nextNotification = {
        id: notification?.id ?? createId('notif'),
        workspaceId: state.activeWorkspaceId,
        createdAt: new Date().toISOString(),
        read: false,
        type: 'system',
        severity: 'info',
        title: 'New notification',
        body: '',
        ...notification,
      }

      return {
        notifications: sortNotifications([nextNotification, ...state.notifications]),
      }
    }),

  markNotificationRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    })),

  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    })),

  clearNotifications: () =>
    set({
      notifications: [],
    }),

  setMessages: (threads = []) =>
    set({
      messages: sortThreads(threads),
    }),

  upsertThread: (thread) =>
    set((state) => {
      if (!thread?.id) {
        return state
      }

      const existingIndex = state.messages.findIndex((item) => item.id === thread.id)
      if (existingIndex === -1) {
        return {
          messages: sortThreads([
            {
              unreadCount: 0,
              messages: [],
              ...thread,
            },
            ...state.messages,
          ]),
        }
      }

      const nextMessages = [...state.messages]
      nextMessages[existingIndex] = {
        ...nextMessages[existingIndex],
        ...thread,
      }

      return {
        messages: sortThreads(nextMessages),
      }
    }),

  sendMessage: ({ threadId, sender = 'agent', senderName = 'NEXUS Team', body = '', attachments = [] }) =>
    set((state) => {
      const cleanBody = body.trim()
      if (!cleanBody && attachments.length === 0) {
        return state
      }

      const now = new Date().toISOString()
      const nextMessage = {
        id: createId('msg'),
        sender,
        senderName,
        body: cleanBody,
        sentAt: now,
        status: 'sent',
        attachments,
      }

      const resolvedThreadId = threadId || createId('thread')
      const existingIndex = state.messages.findIndex((thread) => thread.id === resolvedThreadId)

      if (existingIndex === -1) {
        return {
          messages: sortThreads([
            {
              id: resolvedThreadId,
              workspaceId: state.activeWorkspaceId,
              platform: 'internal',
              participant: {
                id: 'unknown',
                name: 'New Contact',
                handle: '@new-contact',
                avatar: '',
              },
              unreadCount: sender === 'client' ? 1 : 0,
              pinned: false,
              lastMessageAt: now,
              messages: [nextMessage],
            },
            ...state.messages,
          ]),
        }
      }

      const nextThreads = [...state.messages]
      const activeThread = nextThreads[existingIndex]
      nextThreads[existingIndex] = {
        ...activeThread,
        unreadCount:
          sender === 'client'
            ? (activeThread.unreadCount ?? 0) + 1
            : activeThread.unreadCount ?? 0,
        lastMessageAt: now,
        messages: [...(activeThread.messages ?? []), nextMessage],
      }

      return {
        messages: sortThreads(nextThreads),
      }
    }),

  markThreadRead: (threadId) =>
    set((state) => ({
      messages: state.messages.map((thread) =>
        thread.id === threadId ? { ...thread, unreadCount: 0 } : thread,
      ),
    })),

  getUnreadCounts: () => {
    const { notifications, messages } = get()
    const unreadNotifications = notifications.filter((item) => !item.read).length
    const unreadMessages = messages.reduce(
      (total, thread) => total + (thread.unreadCount ?? 0),
      0,
    )

    return {
      unreadNotifications,
      unreadMessages,
      total: unreadNotifications + unreadMessages,
    }
  },

  resetWorkspaceState: (workspaceId = DEFAULT_WORKSPACE_ID) => {
    set(buildStateFromWorkspace(workspaceId))
  },
}))

export default useWorkspaceStore
