import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import PlatformChip from '@/components/ui/PlatformChip'
import { useAuthStore } from '@/features/auth/store'
import { useWorkspaceStore } from '@/features/workspace/store'
import { MOCK_WORKSPACES } from '@/utils/mockData'
import { useToastStore } from '@/store/toastStore'

const fadeUpAnimation = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
}

export default function WorkspacePage() {
  const navigate = useNavigate()
  const workspaces = useAuthStore((state) => state.workspaces)
  const activeWorkspace = useAuthStore((state) => state.activeWorkspace)
  const setWorkspace = useAuthStore((state) => state.setWorkspace)
  const hydrateWorkspace = useWorkspaceStore((state) => state.hydrateWorkspace)
  const pushSuccessToast = useToastStore((state) => state.success)
  const pushErrorToast = useToastStore((state) => state.error)

  const list = useMemo(() => {
    return workspaces.length > 0 ? workspaces : MOCK_WORKSPACES
  }, [workspaces])

  const handleSelectWorkspace = (workspace) => {
    const success = setWorkspace(workspace)
    if (!success) {
      pushErrorToast('Unable to activate selected workspace.', {
        title: 'Workspace error',
      })
      return
    }

    hydrateWorkspace(workspace.id)
    pushSuccessToast(`Switched to ${workspace.company}.`, {
      title: 'Workspace ready',
    })
    navigate('/dashboard', { replace: true })
  }

  return (
    <motion.section
      initial={fadeUpAnimation.initial}
      animate={fadeUpAnimation.animate}
      transition={fadeUpAnimation.transition}
      className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6"
    >
      <div className="mb-6">
        <h1
          className="text-2xl font-bold sm:text-3xl"
          style={{
            color: 'var(--text-primary)',
            fontFamily: '"Cabinet Grotesk", var(--font-display)',
          }}
        >
          Choose your workspace
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Select where you want to continue in NEXUS.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((workspace) => {
          const isActive = activeWorkspace?.id === workspace.id
          return (
            <button
              key={workspace.id}
              type="button"
              onClick={() => handleSelectWorkspace(workspace)}
              className="rounded-[14px] border p-4 text-left transition hover:-translate-y-0.5"
              style={{
                borderColor: isActive ? 'var(--accent-border)' : 'var(--bg-border)',
                backgroundColor: 'var(--bg-surface)',
                boxShadow: isActive ? '0 0 0 1px var(--accent-border) inset' : 'none',
              }}
            >
              <div className="mb-3 flex items-start gap-3">
                <div
                  className="grid size-11 shrink-0 place-items-center rounded-full text-sm font-semibold"
                  style={{
                    backgroundColor: workspace.color ?? 'var(--accent)',
                    color: 'white',
                  }}
                >
                  {workspace.initials}
                </div>
                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {workspace.company}
                  </h2>
                  <p
                    className="truncate text-[11px] uppercase"
                    style={{
                      color: 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {workspace.role}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {workspace.platforms.map((platform) => (
                  <PlatformChip key={`${workspace.id}-${platform}`} platform={platform} compact />
                ))}
              </div>
            </button>
          )
        })}
      </div>
    </motion.section>
  )
}
