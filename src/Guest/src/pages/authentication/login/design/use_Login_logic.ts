import { useState, useEffect } from 'react'
import { use_Sumbit_MobNumber } from '../logic/use_Sumbit_MobNumber'
import { use_Verify_otp } from '../logic/use_Verify_otp'
import { use_token_Validation } from '../../../../tokenValidation/use_token_Validation'
import { useNavigate } from 'react-router-dom'

export const use_Login_logic = () => {
 const navigate = useNavigate()
  const { handle_Token_Validation } = use_token_Validation()

  // =========================
  // Token Validation
  // =========================
  // Check if the staff is already logged in; redirect if valid
  useEffect(() => {
    handle_Token_Validation('login','68c016f89540bdb6226598f2')
  }, [navigate])

  // =========================
  // 🔹 Step Management
  // =========================
  const [step, setStep] = useState<'mobile' | 'otp'>(() => {
    const saved = sessionStorage.getItem('login_step')
    return saved === 'otp' ? 'otp' : 'mobile'
  })

  const [hotelKey, setHotelKey] = useState('68c016f89540bdb6226598f2')

  // 🔹 Persist step in sessionStorage
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

  // 🔹 Persist mobile number in sessionStorage
  useEffect(() => {
    if (mobile) {
      setError('')
      sessionStorage.setItem('guest_mobile', mobile)
    } else {
      sessionStorage.removeItem('guest_mobile')
    }
  }, [mobile])

  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [joinedOtp, setJoinedOtp] = useState('')

  const { handle_SubmitMobNumber_ApiCall } = use_Sumbit_MobNumber()
  const { handle_VerifyOtp_ApiCall, otpError, setOtpError } = use_Verify_otp()

  // =========================
  // 🔹 Timer & Loading/Error
  // =========================
  const [timeLeft, setTimeLeft] = useState(() => {
    const saved = sessionStorage.getItem('otp_timer_expiry')
    if (saved) {
      const expiry = parseInt(saved, 10)
      const diff = Math.floor((expiry - Date.now()) / 1000)
      return diff > 0 ? diff : 0
    }
    return 180 // ⏰ Default OTP timer: 3 minutes (180 seconds)
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // =========================
  // 🔹 Countdown Timer
  // =========================
  useEffect(() => {
    if (step !== 'otp' || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
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

  // 🔹 Store expiry time in sessionStorage when OTP step starts
  useEffect(() => {
    if (step === 'otp' && timeLeft === 180) {
      const expiry = Date.now() + timeLeft * 1000
      sessionStorage.setItem('otp_timer_expiry', expiry.toString())
    }
  }, [step])

  // =========================
  // 🔹 Format Timer
  // =========================
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

  // 🔹 Handle mobile number submission and trigger OTP send
  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (mobile.length !== 10) {
      setError('Enter a valid 10-digit mobile number')
      return
    }

    setLoading(true)
    const response = await handle_SubmitMobNumber_ApiCall(mobile, hotelKey)
    if (!response) return

    setStep('otp')
    setTimeLeft(180) // ⏰ Reset OTP timer to 3 minutes
    setError('')
    setLoading(false)
  }

  // 🔹 Handle OTP input changes
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

  // 🔹 Verify OTP
  const handleVerifyOtp = async () => {
    if (timeLeft <= 0) return
    if (joinedOtp.length !== 6) return

    const response = await handle_VerifyOtp_ApiCall(mobile, hotelKey, joinedOtp)
    if (!response) return
  }

  // 🔹 Auto-verify when OTP is fully entered
  useEffect(() => {
    if (joinedOtp.length === 6) {
      handleVerifyOtp()
    }
  }, [joinedOtp])

  // 🔹 Resend OTP
  const handleResendOtp = async () => {
    setLoading(true)

    const response = await handle_SubmitMobNumber_ApiCall(mobile, hotelKey)
    setLoading(false)
    if (!response) return

    setOtp(['', '', '', '', '', ''])
    setJoinedOtp('')
    setTimeLeft(180) // ⏰ Reset timer to 3 minutes
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
