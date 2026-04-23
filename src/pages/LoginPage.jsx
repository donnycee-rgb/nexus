import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { DEMO_CREDENTIALS } from '@/utils/mockData'
import { useAuthStore } from '@/features/auth/store'
import { useToastStore } from '@/store/toastStore'

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required.')
    .email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
})

const zodResolver = (schema) => async (values) => {
  const parsed = schema.safeParse(values)
  if (parsed.success) {
    return {
      values: parsed.data,
      errors: {},
    }
  }

  const errors = parsed.error.issues.reduce((accumulator, issue) => {
    const field = issue.path[0]
    if (!field || accumulator[field]) {
      return accumulator
    }

    return {
      ...accumulator,
      [field]: {
        type: issue.code,
        message: issue.message,
      },
    }
  }, {})

  return {
    values: {},
    errors,
  }
}

const fadeUpAnimation = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
}

export default function LoginPage() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const showSuccessToast = useToastStore((state) => state.success)
  const showErrorToast = useToastStore((state) => state.error)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (values) => {
    const result = login(values)
    if (!result?.success) {
      const message = result?.message ?? 'Unable to sign in.'
      setError('password', { type: 'manual', message })
      showErrorToast(message, { title: 'Login failed' })
      return
    }

    showSuccessToast('Login successful. Enter your 2FA code to continue.', {
      title: 'Welcome back',
    })
    navigate('/verify', { replace: true })
  }

  return (
    <motion.section
      initial={fadeUpAnimation.initial}
      animate={fadeUpAnimation.animate}
      transition={fadeUpAnimation.transition}
      className="rounded-[14px] border p-5 shadow-sm sm:p-6"
      style={{
        borderColor: 'var(--bg-border)',
        backgroundColor: 'var(--bg-surface)',
      }}
    >
      <div className="mb-5">
        <h1 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
          Sign in
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Access your NEXUS workspace.
        </p>
      </div>

      <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="grid gap-1.5">
          <span className="text-xs font-medium uppercase tracking-[0.08em]" style={{ color: 'var(--text-muted)' }}>
            Email
          </span>
          <input
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            className="w-full rounded-[10px] border px-3 py-2 text-sm outline-none transition"
            style={{
              borderColor: 'var(--bg-border)',
              backgroundColor: 'var(--bg-overlay)',
              color: 'var(--text-primary)',
            }}
            {...register('email')}
          />
          {errors.email ? (
            <span className="text-xs" style={{ color: 'var(--danger)' }}>
              {errors.email.message}
            </span>
          ) : null}
        </label>

        <label className="grid gap-1.5">
          <span className="text-xs font-medium uppercase tracking-[0.08em]" style={{ color: 'var(--text-muted)' }}>
            Password
          </span>
          <input
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="w-full rounded-[10px] border px-3 py-2 text-sm outline-none transition"
            style={{
              borderColor: 'var(--bg-border)',
              backgroundColor: 'var(--bg-overlay)',
              color: 'var(--text-primary)',
            }}
            {...register('password')}
          />
          {errors.password ? (
            <span className="text-xs" style={{ color: 'var(--danger)' }}>
              {errors.password.message}
            </span>
          ) : null}
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-2 w-full rounded-[10px] px-4 py-2 text-sm font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--text-inverse)',
          }}
        >
          {isSubmitting ? 'Signing in...' : 'Continue'}
        </button>
      </form>

      <div className="mt-5 rounded-[10px] border p-3 text-xs" style={{ borderColor: 'var(--bg-border)' }}>
        <p style={{ color: 'var(--text-muted)' }}>Demo credentials</p>
        <p className="mt-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
          {DEMO_CREDENTIALS.email} / {DEMO_CREDENTIALS.password}
        </p>
      </div>
    </motion.section>
  )
}
