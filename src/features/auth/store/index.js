import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { DEMO_CREDENTIALS, DEMO_USER, TWO_FA_CONFIG, WORKSPACES } from '../../../utils/mockData';

const initialState = {
  isAuthenticated: false,
  twoFAVerified:   false,
  hasWorkspace:    false,
  user:            null,
  workspaces:      [],
  activeWorkspace: null,
  lastLoginAt:     null,
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      // ── Login ──────────────────────────────────────────────
      login: (payload = {}) => {
        const email    = String(payload.email    ?? '').trim().toLowerCase();
        const password = String(payload.password ?? '');
        const validEmail = DEMO_CREDENTIALS.email.toLowerCase();

        if (email !== validEmail || password !== DEMO_CREDENTIALS.password) {
          return { success: false, message: 'Invalid email or password.' };
        }

        set({
          isAuthenticated: true,
          twoFAVerified:   false,
          user:            DEMO_USER,
          workspaces:      WORKSPACES,
          lastLoginAt:     new Date().toISOString(),
        });

        return { success: true, requiresTwoFA: true };
      },

      // ── 2FA ────────────────────────────────────────────────
      verifyTwoFA: (code) => {
        if (!get().isAuthenticated) return false;
        const isValid = String(code).trim() === String(TWO_FA_CONFIG.validCode);
        if (!isValid) return false;
        set({ twoFAVerified: true });
        return true;
      },

      // ── Workspace ──────────────────────────────────────────
      setWorkspace: (workspace) => {
        if (!workspace?.id) return false;
        set({ activeWorkspace: workspace, hasWorkspace: true });
        return true;
      },

      setWorkspaces: (workspaces = []) => {
        set({ workspaces: Array.isArray(workspaces) ? workspaces : [] });
      },

      clearWorkspace: () => set({ activeWorkspace: null, hasWorkspace: false }),

      // ── Logout ─────────────────────────────────────────────
      logout: () => set({ ...initialState }),
    }),
    {
      name:    'nexus-auth',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        isAuthenticated: s.isAuthenticated,
        twoFAVerified:   s.twoFAVerified,
        hasWorkspace:    s.hasWorkspace,
        user:            s.user,
        workspaces:      s.workspaces,
        activeWorkspace: s.activeWorkspace,
        lastLoginAt:     s.lastLoginAt,
      }),
    },
  ),
);

export default useAuthStore;