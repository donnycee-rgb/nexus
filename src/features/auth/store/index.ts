import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Workspace {
  id: string
  company: string
  initials: string
  color: string
  platforms: string[]
  role: 'admin' | 'member'
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthState {
  isAuthenticated: boolean
  twoFAVerified: boolean
  hasWorkspace: boolean
  user: User | null
  activeWorkspace: Workspace | null
  workspaces: Workspace[]

  // Actions
  login: (user: User) => void
  verifyTwoFA: () => void
  setWorkspace: (workspace: Workspace) => void
  setWorkspaces: (workspaces: Workspace[]) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      twoFAVerified: false,
      hasWorkspace: false,
      user: null,
      activeWorkspace: null,
      workspaces: [],

      login: (user) => set({
        isAuthenticated: true,
        user,
      }),

      verifyTwoFA: () => set({
        twoFAVerified: true,
      }),

      setWorkspace: (workspace) => set({
        activeWorkspace: workspace,
        hasWorkspace: true,
      }),

      setWorkspaces: (workspaces) => set({ workspaces }),

      logout: () => set({
        isAuthenticated: false,
        twoFAVerified: false,
        hasWorkspace: false,
        user: null,
        activeWorkspace: null,
      }),
    }),
    {
      name: 'nexus-auth',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        twoFAVerified: state.twoFAVerified,
        hasWorkspace: state.hasWorkspace,
        user: state.user,
        activeWorkspace: state.activeWorkspace,
        workspaces: state.workspaces,
      }),
    }
  )
)