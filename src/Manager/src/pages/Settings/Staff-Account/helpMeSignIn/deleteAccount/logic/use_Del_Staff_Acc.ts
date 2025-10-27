import axios from 'axios'
import { useState, useEffect } from 'react'
import { type Status } from '../../../../../../../../ServerErrorUI/ServerError_UI'
import { showSuccess } from '../../../../../../utils/toast'
import { useNavigate } from 'react-router-dom'
import { BaseUrl } from '../../../../../../../../BaseUrl/BaseUrl'

interface FormData {
  staffId: string
  password: string
  otp: string
}

export const use_Del_Staff_Acc = () => {
  const navigate = useNavigate()

  // ==============================
  // Step management: password or OTP
  // ==============================
  const [step, setStep] = useState<'password' | 'otp'>(() => {
    const savedStep = sessionStorage.getItem('deleteStep')
    if (savedStep === 'password' || savedStep === 'otp') {
      return savedStep
    }
    return 'password'
  })

  // ==============================
  // Error & status handling
  // ==============================
  const [error, setError] = useState<string>('')
  const [status, setStatus] = useState<Status>('null')

  // ==============================
  // Password verification state
  // ==============================
  const [isPasswordVerified, setIsPasswordVerified] = useState<boolean>(false)
  const [isOTPVerified, setIsOTPVerified] = useState<boolean>(false)

  // ==============================
  // Form data state
  // ==============================
  const [formData, setFormData] = useState<FormData>({
    staffId: '',
    password: '',
    otp: '',
  })

  // ==============================
  // Persist step in session storage
  // ==============================
  useEffect(() => {
    sessionStorage.setItem('deleteStep', step)
  }, [step])

  // ==============================
  // Handle form field changes
  // ==============================
  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError('') // Clear error on input change
  }

  // ==============================
  // Verify password before proceeding to OTP
  // ==============================
  const handlePasswordCheck = async () => {
    if (!formData.staffId) return
    if (!formData.password.trim()) {
      setError('Please Enter Password')
      return
    }

    try {
      setError('') // Clear previous errors
      setIsPasswordVerified(true) // Show loading state
      await axios.post(
        `${BaseUrl}manager/check-password/delete/staff-account`,
        { formData },
        { withCredentials: true }
      )

      setError('') // Clear any remaining error
      setStep('otp') // Move to OTP verification step
    } catch (error: any) {
      // ❌ Handle API errors
      console.error('Error verifying password:', error)
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 401) {
          setError('Invalid password') // Incorrect password
          return
        } else {
          setStatus('error') // Other errors
        }
      }
    } finally {
      setIsPasswordVerified(false) // Reset loading state
    }
  }

  // ==============================
  // Verify OTP and delete staff account
  // ==============================
  const handleOTPCheck = async () => {
    if (!formData.staffId) return
    if (!formData.otp.trim()) {
      setError('Please Enter OTP')
      return
    }

    try {
      setError('') // Clear previous errors
      setIsOTPVerified(true)
      await axios.post(
        `${BaseUrl}manager/OtpVerify/delete/staff-account`,
        { formData },
        { withCredentials: true }
      )
      showSuccess('Account deleted successfully') // Show success toast
      setStep('password') // Reset step for next use
      setFormData({
        staffId: '',
        password: '',
        otp: '',
      }) // Clear form fields
      setTimeout(() => {
        navigate('/settings/staff-account-list') // Redirect after delay
      }, 2000)
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.status === 401) {
          setError('Invalid OTP') // Wrong OTP
          return
        }
      } else {
        setStatus('error') // Other errors
        return
      }
    } finally {
      setIsOTPVerified(false)
    }
  }

  // ==============================
  // Cancel deletion and reset state
  // ==============================
  const handleCancel = () => {
    setStep('password')
    setFormData({
      staffId: '',
      password: '',
      otp: '',
    })
    navigate('/settings/staff-account-list')
  }

  // ==============================
  // Expose handlers & state
  // ==============================
  return {
    handlePasswordCheck,
    handleChange,
    formData,
    step,
    setFormData,
    error,
    status,
    isPasswordVerified,
    handleOTPCheck,
    handleCancel,
    isOTPVerified
  }
}
