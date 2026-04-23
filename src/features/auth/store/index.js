import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { DEMO_CREDENTIALS, DEMO_USER, TWO_FA_CONFIG, WORKSPACES } from '@/utils/mockData'

const normalizeWorkspaces = (workspaces) => {
  return Array.isArray(workspaces) ? workspaces : []
}

const isValidCredentialPayload = (payload) => {
  const hasCredentialInput =
    typeof payload.email === 'string' || typeof payload.password === 'string'

  if (!hasCredentialInput) {
    return true
  }

  const email = String(payload.email ?? '')
    .trim()
    .toLowerCase()
  const password = String(payload.password ?? '')
  const expectedEmail = DEMO_CREDENTIALS.email.toLowerCase()

  return email === expectedEmail && password === DEMO_CREDENTIALS.password
}

const resolveWorkspace = (workspaceInput, workspaces) => {
  if (!workspaceInput) {
    return null
  }

  if (typeof workspaceInput === 'string') {
    return workspaces.find((workspace) => workspace.id === workspaceInput) ?? null
  }

  if (typeof workspaceInput === 'object') {
    if (!workspaceInput.id) {
      return null
    }

    return (
      workspaces.find((workspace) => workspace.id === workspaceInput.id) ??
      workspaceInput
    )
  }

  return null
}

const initialState = {
  isAuthenticated: false,
  twoFAVerified: false,
  user: null,
  workspaces: [],
  activeWorkspace: null,
  hasWorkspace: false,
  lastLoginAt: null,
}

const createNoopStorage = () => ({
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
})

const authStorage = createJSONStorage(() =>
  typeof window === 'undefined' ? createNoopStorage() : window.localStorage,
)

export const useAuthStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      login: (payload = {}) => {
        if (!isValidCredentialPayload(payload)) {
          return {
            success: false,
            message: 'Invalid email or password.',
          }
        }
        const nextUser = payload.user ?? DEMO_USER
        const nextWorkspaces = normalizeWorkspaces(payload.workspaces ?? WORKSPACES)
        const shouldBypassTwoFA = Boolean(payload.skipTwoFA)
        const activeWorkspace = resolveWorkspace(
          payload.workspace ?? payload.workspaceId ?? null,
          nextWorkspaces,
        )

        set({
          isAuthenticated: true,
          twoFAVerified: shouldBypassTwoFA,
          user: nextUser,
          workspaces: nextWorkspaces,
          activeWorkspace,
          hasWorkspace: Boolean(activeWorkspace),
          lastLoginAt: new Date().toISOString(),
        })

        return {
          success: true,
          requiresTwoFA: !shouldBypassTwoFA,
        }
      },

      verifyTwoFA: (code) => {
        if (!get().isAuthenticated) {
          return false
        }

        const normalizedCode = String(code ?? '').trim()
        const isValidCode = normalizedCode === String(TWO_FA_CONFIG.validCode)
        if (!isValidCode) {
          return false
        }

        set({ twoFAVerified: true })
        return true
      },

      setWorkspace: (workspaceInput) => {
        const { workspaces } = get()
        const activeWorkspace = resolveWorkspace(workspaceInput, workspaces)
        if (!activeWorkspace) {
          return false
        }

        set({
          activeWorkspace,
          hasWorkspace: true,
        })

        return true
      },

      setWorkspaces: (workspaces = []) =>
        set((state) => {
          const nextWorkspaces = normalizeWorkspaces(workspaces)
          const activeWorkspace = resolveWorkspace(
            state.activeWorkspace?.id ?? null,
            nextWorkspaces,
          )

          return {
            workspaces: nextWorkspaces,
            activeWorkspace,
            hasWorkspace: Boolean(activeWorkspace),
          }
        }),

      clearWorkspace: () =>
        set({
          activeWorkspace: null,
          hasWorkspace: false,
        }),

      logout: () => set({ ...initialState }),
    }),
    {
      name: 'nexus-auth',
      storage: authStorage,
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        twoFAVerified: state.twoFAVerified,
        user: state.user,
        workspaces: state.workspaces,
        activeWorkspace: state.activeWorkspace,
        hasWorkspace: state.hasWorkspace,
        lastLoginAt: state.lastLoginAt,
      }),
    },
  ),
)

export default useAuthStore
