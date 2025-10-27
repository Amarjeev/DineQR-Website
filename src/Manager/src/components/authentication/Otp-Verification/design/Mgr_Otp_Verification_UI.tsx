import React, { useEffect, useState } from 'react'
import { use_Otp_Verification } from '../logic/use_Otp_Verification'

/**
 * Manager OTP Verification Component
 *
 * Handles OTP input, countdown timer, verification, and resending OTP.
 */
const Mgr_Otp_Verification_UI: React.FC = () => {
  // Custom hook managing OTP state, API interactions, and errors
  const {
    otp,
    setOtp,
    handleVerifyOTP,
    loading,
    email,
    error,
    handleResendOTP,
    resendSuccess,
  } = use_Otp_Verification()

  const handleOtpChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (/^\d*$/.test(value)) {
        setOtp(value) // Only numeric input
      }
    },
    [setOtp]
  )

  // Timer state for OTP validity in seconds (default 3 minutes)
  const [timeLeft, setTimeLeft] = useState(() => {
    // Load previous timer from sessionStorage to persist countdown across reloads
    const saved = sessionStorage.getItem('otpTimer')
    return saved ? Number(saved) : 180
  })

  // State to track if OTP verification was successful
  const [verified, setVerified] = useState(false)

  /**
   * Countdown effect
   * Decrements `timeLeft` every second until it reaches 0
   * Stops automatically when OTP is verified
   */
  useEffect(() => {
    if (timeLeft <= 0 || verified) return // Stop countdown when timer expires

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer) // Cleanup interval on unmount or update
  }, [timeLeft, verified])

  /**
   * Handles OTP verification
   * Stops timer upon successful verification
   */
  const handleVerifyOTPWithStop = async () => {
    await handleVerifyOTP()
    setVerified(true) // Mark OTP as verified
  }

  /**
   * Resends OTP and resets the countdown timer
   */
  const handleResendOTPWithTimer = async () => {
    await handleResendOTP() // Call custom hook to resend OTP
    setTimeLeft(180) // Reset timer to 3 minutes
    sessionStorage.setItem('otpTimer', '180') // Persist new timer
  }

  /**
   * Persist `timeLeft` in sessionStorage on change
   */
  useEffect(() => {
    if (timeLeft === 0) return
    sessionStorage.setItem('otpTimer', timeLeft.toString())
  }, [timeLeft])

  /**
   * Formats seconds into MM:SS for display
   * @param seconds - time in seconds
   * @returns string formatted as "MM:SS"
   */
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0') // Ensure two-digit minutes
    const s = (seconds % 60).toString().padStart(2, '0') // Ensure two-digit seconds
    return `${m}:${s}`
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Page Title */}
        <h1 className="text-2xl font-bold mb-4 text-center">Verify OTP</h1>

        {/* Display email instructions */}
        <p className="mb-6 text-center text-gray-600">
          Enter the OTP sent to your email:
          <span className="font-bold block">{email}</span>
        </p>

        {/* OTP Input Field */}
        <div className="mb-4">
          <input
            type="tel"
            value={otp}
            onChange={handleOtpChange}
            placeholder="Enter 4-digit OTP"
            className="w-full p-3 border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-600 
                       text-center tracking-widest"
            maxLength={4}
          />
        </div>

        {/* Timer and error display */}
        <p className="text-center text-gray-600 mb-4">
          ⏳ Time left:{' '}
          <span className="font-semibold">{formatTime(timeLeft)}</span>
          {error && <h1 className="mt-3 text-red-600">{error}</h1>}
        </p>

        {/* Verify OTP Button (active only when timer > 0) */}
        {timeLeft !== 0 && (
          <button
            type="button"
            onClick={handleVerifyOTPWithStop} // Trigger OTP verification
            disabled={loading || timeLeft <= 0} // Disable if verifying or expired
            className={`w-full py-3 rounded-lg transition duration-300 text-white ${
              loading || timeLeft <= 0
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        )}

        {/* Resend OTP Button (visible only when timer expires) */}
        {timeLeft === 0 && (
          <button
            type="button"
            onClick={handleResendOTPWithTimer} // Resend OTP & restart timer
            disabled={resendSuccess} // Disable if resend in progress
            className={`w-full py-3 rounded-lg transition duration-300 text-white ${
              resendSuccess
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {resendSuccess ? 'Resending...' : 'Resend OTP'}
          </button>
        )}
      </div>
    </div>
  )
}

export default Mgr_Otp_Verification_UI
