import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { use_Sumbit_MobNumber } from '../logic/use_Sumbit_MobNumber'
import { use_Verify_otp } from '../logic/use_Verify_otp'
import { use_token_Validation } from '../../../../tokenValidation/use_token_Validation'

export const use_Login_logic = () => {
  const navigate = useNavigate()
  const { hotelKey } = useParams<{ hotelKey: string }>()
  const { handle_Token_Validation } = use_token_Validation()

  // =========================
  // 🔹 Hotel Key Management
  // =========================
  const [hotelId, setHotelId] = useState<string>(() => {
    // Prefer URL param, then fallback to stored value
    return hotelKey || sessionStorage.getItem('hotelKey') || ''
  })

  useEffect(() => {
    // If a new key is found in URL, persist it
    if (hotelKey) {
      sessionStorage.setItem('hotelKey', hotelKey)
      setHotelId(hotelKey)
    }
  }, [hotelKey])

  // =========================
  // 🔹 Token Validation
  // =========================
  useEffect(() => {
    if (hotelId) {
      handle_Token_Validation('login', hotelId)
    }
  }, [hotelId, navigate])

  // =========================
  // 🔹 Step Management
  // =========================
  const [step, setStep] = useState<'mobile' | 'otp'>(() => {
    const saved = sessionStorage.getItem('login_step')
    return saved === 'otp' ? 'otp' : 'mobile'
  })

  useEffect(() => {
    sessionStorage.setItem('login_step', step)
  }, [step])

  // =========================
  // 🔹 Mobile & OTP States
  // =========================
  const [mobile, setMobile] = useState(() => {
    const savedMobile = sessionStorage.getItem('guest_mobile')
    return savedMobile || ''
  })

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [joinedOtp, setJoinedOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { handle_SubmitMobNumber_ApiCall } = use_Sumbit_MobNumber()
  const { handle_VerifyOtp_ApiCall, otpError, setOtpError } = use_Verify_otp()

  // Persist mobile
  useEffect(() => {
    if (mobile) {
      setError('')
      sessionStorage.setItem('guest_mobile', mobile)
    } else {
      sessionStorage.removeItem('guest_mobile')
    }
  }, [mobile])

  // =========================
  // 🔹 Timer
  // =========================
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = sessionStorage.getItem('otp_timer_expiry')
    if (saved) {
      const expiry = parseInt(saved, 10)
      const diff = Math.floor((expiry - Date.now()) / 1000)
      return diff > 0 ? diff : 0
    }
    return 180
  })

  useEffect(() => {
    if (step !== 'otp' || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setError('OTP expired')
          sessionStorage.removeItem('otp_timer_expiry')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [step, timeLeft])

  useEffect(() => {
    if (step === 'otp' && timeLeft === 180) {
      const expiry = Date.now() + timeLeft * 1000
      sessionStorage.setItem('otp_timer_expiry', expiry.toString())
    }
  }, [step])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  // =========================
  // 🔹 Handlers
  // =========================
  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (mobile.length !== 10) {
      setError('Enter a valid 10-digit mobile number')
      return
    }

    setLoading(true)
    const response = await handle_SubmitMobNumber_ApiCall(mobile, hotelId)
    setLoading(false)

    if (!response) return

    setStep('otp')
    setTimeLeft(180)
    setError('')
  }

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      setJoinedOtp(newOtp.join(''))

      if (value && index < 5)
        document.getElementById(`otp-${index + 1}`)?.focus()

      if (error) setError('')
    }
  }

  const handleVerifyOtp = async () => {
    if (timeLeft <= 0 || joinedOtp.length !== 6) return

    const response = await handle_VerifyOtp_ApiCall(mobile, hotelId, joinedOtp)
    if (!response) return
  }

  useEffect(() => {
    if (joinedOtp.length === 6) handleVerifyOtp()
  }, [joinedOtp])

  const handleResendOtp = async () => {
    setLoading(true)
    const response = await handle_SubmitMobNumber_ApiCall(mobile, hotelId)
    setLoading(false)

    if (!response) return

    setOtp(['', '', '', '', '', ''])
    setJoinedOtp('')
    setTimeLeft(180)
    setError('')
    setOtpError('')
  }

  return {
    step,
    mobile,
    otp,
    joinedOtp,
    timeLeft,
    loading,
    error,
    otpError,
    formatTime,
    setMobile,
    setStep,
    handleMobileSubmit,
    handleOtpChange,
    handleVerifyOtp,
    handleResendOtp,
  }
}
