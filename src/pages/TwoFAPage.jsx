import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { z } from 'zod'
import { TWO_FA_CONFIG } from '@/utils/mockData'
import { useAuthStore } from '@/features/auth/store'
import { useToastStore } from '@/store/toastStore'

const CODE_LENGTH = 6

const codeSchema = z
  .string()
  .length(CODE_LENGTH, `Code must be ${CODE_LENGTH} digits.`)
  .regex(/^\d+$/, 'Code must contain only numbers.')

const fadeUpAnimation = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: 'easeOut' },
}

export default function TwoFAPage() {
  const navigate = useNavigate()
  const inputRef = useRef(null)
  const [code, setCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const verifyTwoFA = useAuthStore((state) => state.verifyTwoFA)
  const showSuccessToast = useToastStore((state) => state.success)
  const showErrorToast = useToastStore((state) => state.error)

  const submitCode = async (value) => {
    if (isSubmitting) {
      return
    }

    const parsed = codeSchema.safeParse(value)
    if (!parsed.success) {
      showErrorToast(parsed.error.issues[0]?.message ?? 'Invalid code format.', {
        title: 'Verification failed',
      })
      return
    }

    setIsSubmitting(true)
    const isValid = verifyTwoFA(parsed.data)

    if (!isValid) {
      setIsSubmitting(false)
      setCode('')
      showErrorToast('The code is incorrect. Try again.', {
        title: 'Verification failed',
      })
      inputRef.current?.focus()
      return
    }

    showSuccessToast('Two-factor verification complete.', {
      title: 'Access granted',
    })
    navigate('/workspace', { replace: true })
  }

  const handleCodeChange = (event) => {
    const nextCode = event.target.value.replace(/\D/g, '').slice(0, CODE_LENGTH)
    setCode(nextCode)

    if (nextCode.length === CODE_LENGTH) {
      void submitCode(nextCode)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    void submitCode(code)
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
          Two-factor verification
        </h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
          Enter the 6-digit code from your authenticator app.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={CODE_LENGTH}
          value={code}
          onChange={handleCodeChange}
          placeholder="000000"
          className="w-full rounded-[12px] border py-3 text-center text-4xl outline-none sm:py-4 sm:text-5xl"
          style={{
            borderColor: 'var(--bg-border)',
            backgroundColor: 'var(--bg-overlay)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.32em',
          }}
        />

        <button
          type="submit"
          disabled={code.length !== CODE_LENGTH || isSubmitting}
          className="w-full rounded-[10px] px-4 py-2 text-sm font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          style={{
            backgroundColor: 'var(--accent)',
            color: 'var(--text-inverse)',
          }}
        >
          {isSubmitting ? 'Verifying...' : 'Verify code'}
        </button>
      </form>

      <div className="mt-5 rounded-[10px] border p-3 text-xs" style={{ borderColor: 'var(--bg-border)' }}>
        <p style={{ color: 'var(--text-muted)' }}>Demo 2FA code</p>
        <p className="mt-1 font-mono" style={{ color: 'var(--text-secondary)' }}>
          {TWO_FA_CONFIG.validCode}
        </p>
      </div>
    </motion.section>
  )
}
