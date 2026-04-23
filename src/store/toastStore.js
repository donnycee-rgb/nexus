import { create } from 'zustand'

const DEFAULT_DURATION = 4000
const DISMISS_ANIMATION_MS = 180
const timers = new Map()

const createId = () => `toast-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

const normalizeToast = (input = {}) => ({
  id: input.id ?? createId(),
  type: input.type ?? 'info',
  title: input.title ?? null,
  message: input.message ?? '',
  duration: Number.isFinite(input.duration) ? input.duration : DEFAULT_DURATION,
  createdAt: input.createdAt ?? new Date().toISOString(),
  visible: input.visible ?? true,
})

const clearToastTimer = (toastId) => {
  const timeout = timers.get(toastId)
  if (!timeout) {
    return
  }

  clearTimeout(timeout)
  timers.delete(toastId)
}

export const useToastStore = create((set, get) => ({
  toasts: [],

  pushToast: (input) => {
    const toast = normalizeToast(input)
    set((state) => ({ toasts: [...state.toasts, toast] }))

    if (toast.duration > 0) {
      clearToastTimer(toast.id)
      const timeout = setTimeout(() => {
        get().dismissToast(toast.id)
      }, toast.duration)
      timers.set(toast.id, timeout)
    }

    return toast.id
  },

  success: (message, options = {}) =>
    get().pushToast({
      ...options,
      type: 'success',
      message,
    }),

  info: (message, options = {}) =>
    get().pushToast({
      ...options,
      type: 'info',
      message,
    }),

  warning: (message, options = {}) =>
    get().pushToast({
      ...options,
      type: 'warning',
      message,
    }),

  error: (message, options = {}) =>
    get().pushToast({
      ...options,
      type: 'danger',
      message,
    }),

  dismissToast: (toastId) => {
    clearToastTimer(toastId)
    set((state) => ({
      toasts: state.toasts.map((toast) =>
        toast.id === toastId ? { ...toast, visible: false } : toast,
      ),
    }))

    const timeout = setTimeout(() => {
      get().removeToast(toastId)
    }, DISMISS_ANIMATION_MS)
    timers.set(toastId, timeout)
  },

  removeToast: (toastId) => {
    clearToastTimer(toastId)
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== toastId),
    }))
  },

  clearToasts: () => {
    for (const timeout of timers.values()) {
      clearTimeout(timeout)
    }
    timers.clear()
    set({ toasts: [] })
  },
}))

export default useToastStore
