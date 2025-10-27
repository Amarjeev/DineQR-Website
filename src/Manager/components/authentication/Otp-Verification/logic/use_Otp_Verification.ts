import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { showError } from '../../../../utils/toast'
import axios, { isAxiosError } from 'axios'
import { BaseUrl } from '../../../../../../BaseUrl/BaseUrl'

/**
 * Custom hook for managing OTP verification and resending for manager login
 */
export const use_Otp_Verification = () => {
  // Get email passed via location state
  const location = useLocation()
  const { email } = location.state as { email: string }

  // Navigation hook to redirect user
  const navigate = useNavigate()

  // State to store OTP entered by the user
  const [otp, setOtp] = useState<string>('')

  // Loading state for API calls
  const [loading, setLoading] = useState<boolean>(false)

  // State to store error messages
  const [error, setError] = useState<string>('')

  // State to show resend OTP success/failure
  const [resendSuccess, setResendSuccess] = useState<boolean>(false)

  /**
   * Function to verify OTP
   */
  const handleVerifyOTP = async () => {
    try {
      if (!email) return navigate('/') // If email is missing, redirect to login

      setLoading(true)

      // Send OTP verification request
      await axios.post(
        `${BaseUrl}auth/manager/verify-otp`,
        { otp, email },
        { withCredentials: true }
      )

      sessionStorage.setItem('otpTimer', '180')

      // navigate manager Dashboard
      navigate('/manager-dashboard')
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        // Handle invalid OTP
        if (error.response?.status === 400) {
          setError('Invalid OTP')
          return
        }

        // Handle server errors or unprocessable requests
        if (error.response?.status === 422 || error.response?.status === 500) {
          navigate('/')
          return
        }

        // Generic network error
        showError('Network error. Please check your connection.')
      } else {
        console.error('Unexpected error:', error)
        showError('Something went wrong. Please try again later.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Interface for Resend OTP API response
  interface ResendOtpResponse {
    success: boolean
  }

  /**
   * Function to resend OTP
   */
  const handleResendOTP = async () => {
    try {
      if (!email) return navigate('/')

      setResendSuccess(true)

      await axios.post<ResendOtpResponse>(`${BaseUrl}auth/manager/Resend-otp`, {
        email,
      })

      setOtp('')
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        // Handle server errors or unprocessable requests
        if (error.response?.status === 422 || error.response?.status === 500) {
          navigate('/')
          return
        }
        showError('Server error, please try again')
      } else {
        console.error('Unexpected error:', error)
        showError('Something went wrong. Please try again later.')
      }
    } finally {
      setResendSuccess(false)
    }
  }

  return {
    otp,
    handleVerifyOTP,
    loading,
    setOtp,
    email,
    error,
    handleResendOTP,
    resendSuccess,
  }
}
