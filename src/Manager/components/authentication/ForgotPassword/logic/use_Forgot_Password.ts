import { useState, useEffect, type ChangeEvent } from 'react'
import { showError, showSuccess } from '../../../../utils/toast'
import { useNavigate } from 'react-router-dom'
import axios, { isAxiosError } from 'axios'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'

export const use_Forgot_Password = () => {
  const navigate = useNavigate()

  // ================================
  // State variables
  // ================================
  // Controls which section of UI is visible: email input or password reset
  const [isEmailVisible, setIsEmailVisible] = useState<boolean>(() => {
    const saved = sessionStorage.getItem('isEmailVisible')
    return saved ? JSON.parse(saved) : true
  })
  // Shows/hides password input section
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)
  // Form inputs
  const [email, setEmail] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [otp, setOtp] = useState<string>('')

  // Error and validation state
  const [error, setError] = useState<string>('') // general error message
  const [newPasswordError, setNewPasswordError] = useState<string>('') // password validation
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('') // password match validation
  const [emailExist, setEmailExist] = useState<boolean | null>(null) // backend email existence
  const [loading, setLoading] = useState<boolean>(false) // API call loading state
  const [passwordResetSuccess, setPasswordResetSuccess] =
    useState<boolean>(false) //This helps show a success message and optionally prevent warnings

  // ================================
  // Types
  // ================================
  interface CheckEmailResponse {
    exists: boolean
  }

  // ================================
  // Persist UI section state in sessionStorage
  // ================================
  useEffect(() => {
    sessionStorage.setItem('isEmailVisible', JSON.stringify(isEmailVisible))
  }, [isEmailVisible])

  // ================================
  // Debounced email existence check
  // ================================
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const checkEmailExistence = async () => {
        try {
          if (email) {
            const response = await axios.post<CheckEmailResponse>(
              `${BaseUrl}check-email`,
              { email: email }
            )

            // Update state based on backend response
            if (response?.data?.exists) {
              setEmailExist(true)
            } else {
              setEmailExist(false)
            }
          }
        } catch (error) {
          showError('Something went wrong. Please try again.')
        }
      }

      if (email) {
        checkEmailExistence()
      }
    }, 500) // Delay 500ms after user stops typing

    return () => clearTimeout(delayDebounce) // cleanup on re-render
  }, [email])

  // ================================
  // Password & confirm password validation
  // ================================
  useEffect(() => {
    // Validate new password
    if (newPassword) {
      if (newPassword.length < 6) {
        setNewPasswordError('Password must be at least 6 characters')
      } else if (newPassword.length > 15) {
        setNewPasswordError('Password cannot exceed 15 characters')
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,15}$/.test(
          newPassword
        )
      ) {
        setNewPasswordError(
          'Password must contain at least 1 lowercase, 1 uppercase, 1 number, 1 special character (@, $, !, %, *, ?, &) and be 6–15 characters long'
        )
      } else {
        setNewPasswordError('')
      }
    }

    // Confirm password validation
    if (confirmPassword) {
      if (newPassword !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match')
      } else {
        setConfirmPasswordError('')
      }
    }
  }, [newPassword, confirmPassword])

  // ================================
  // Input change handler
  // ================================
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    if (id === 'email') setEmail(value)
    if (id === 'otp') {
      // Only digits, max 6
      const digitsOnly = value.replace(/\D/g, '').slice(0, 6)
      setOtp(digitsOnly)
    }
    if (id === 'newPassword') setNewPassword(value)
    if (id === 'confirmPassword') setConfirmPassword(value)
  }

  // ================================
  // Step 1: Confirm email exists
  // ================================
  const handleEmailConfirm = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Basic validation
      if (email.length < 5 || email.length > 254) {
        setError('Please enter a valid email address')
        return
      }

      // If the email existence check has not completed yet, do nothing
      if (emailExist === null) return

      setLoading(true)

      if (!emailExist) {
        setError('Invalid email or account not found.')
        setEmailExist(null)
        return
      }

      // API call to trigger OTP
      await axios.post(`${BaseUrl}forgot-password/check-email`, { email })

      // Success -> show OTP section
      setError('')
      setIsEmailVisible(false)
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        console.error('Error in handleEmailConfirm:', error.message)
      } else {
        console.error('Unexpected error:', error)
      }
      setError('Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  // ================================
  // Step 2: Submit OTP
  // ================================
  const handleSubmitOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (otp.length !== 6) {
        showError('OTP must be 6 digits')
        return
      }

      if (!email) {
        setIsEmailVisible(true)
        return
      }

      setLoading(true)
      await axios.post(`${BaseUrl}forgot-password/verify-otp`, { email, otp })

      setError('')
      setIsPasswordVisible(true)
    } catch (err: unknown) {
      console.error('❌ Error in handleSubmitOtp:', err)

      if (isAxiosError(err)) {
        if (err.response?.status === 404) {
          setIsEmailVisible(true)
          return
        } else if (err.response?.status === 400) {
          setError('❌ Invalid OTP')
          return
        } else {
          setError('Something went wrong. Please try again later.')
        }
      } else {
        // Non-Axios or unexpected error
        setError('Unexpected error occurred.')
      }
    } finally {
      setLoading(false)
    }
  }

  // ================================
  // Step 3: Reset password
  // ================================
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Validation
      if (!newPassword || !confirmPassword) {
        showError('All fields are required')
        return
      }
      if (newPasswordError || confirmPasswordError) {
        showError('Please fix the errors before submitting')
        return
      }
      if (!email) {
        setIsPasswordVisible(false)
        setIsEmailVisible(true)
        return
      }

      setLoading(true)

      // API call to reset password
      await axios.post(`${BaseUrl}forgot-password/create-newpassword`, {
        newPassword,
        confirmPassword,
        email,
      })
      // Clear sensitive fields
      setNewPassword('')
      setConfirmPassword('')
      setEmail('')
      setPasswordResetSuccess(true)

      showSuccess('Password reset successfully!')
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error: unknown) {
      console.error('Error resetting password:', error)

      if (isAxiosError(error)) {
        // You can check backend status codes if needed
        if (error.response?.status === 500) {
          showError('Server error. Please try again later.')
          return
        }
        showError('Something went wrong. Please try again later.')
      } else {
        // Non-Axios or unexpected error
        showError('Unexpected error occurred. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  // Back button handler
  const handleBackClick = () => {
    // If password was successfully reset, go back immediately
    if (passwordResetSuccess) return navigate('/')
    // Ask user before navigating back
    const confirmBack = window.confirm(
      'Are you about to leave the password reset area. Unsaved changes will be lost. Continue?'
    )

    if (confirmBack) {
      setEmail('')
      setIsEmailVisible(true)
      navigate('/')
    }
  }

  return {
    isEmailVisible,
    isPasswordVisible,
    email,
    otp,
    newPassword,
    confirmPassword,
    handleChange,
    handleSubmitOtp,
    handleResetPassword,
    handleEmailConfirm,
    error,
    loading,
    newPasswordError,
    confirmPasswordError,
    handleBackClick,
  }
}
