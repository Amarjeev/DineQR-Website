import axios from 'axios'
import { useState } from 'react'
import { type Status } from '../../../../../../ServerErrorUI/ServerError_UI'
import { useNavigate } from 'react-router-dom'
import { BaseUrl } from '../../../../../../BaseUrl/BaseUrl'

/**
 * use_Login_Account
 * -----------------
 * Custom hook to manage staff login functionality.
 *
 * Responsibilities:
 * - Handle form state for staffId and password inputs.
 * - Validate input fields before submission.
 * - Perform API login request and handle responses.
 * - Manage loading and error states for UI feedback.
 * - Redirect to staff dashboard on successful login.
 *
 * Returns:
 * - formData: current form values
 * - handleChange: input change handler
 * - handleSubmit: form submit handler
 * - errors: field-specific and general errors
 * - status: API request status ('null', 'error', etc.)
 * - isLoading: loading indicator for UI
 */
export const use_Login_Account = () => {
  const navigate = useNavigate()

  // =========================
  // Form State
  // =========================
  const [formData, setFormData] = useState({
    staffId: '', // Staff ID input
    password: '', // Password input
  })

  // =========================
  // Error State
  // =========================
  const [errors, setErrors] = useState({
    staffId: '', // Staff ID specific error
    password: '', // Password specific error
    commonError: '', // General/API level errors
  })

  const [status, setStatus] = useState<Status>('null') // API request status
  const [isLoading, setIsLoading] = useState(false) // Loading indicator

  // =========================
  // Input Change Handler
  // =========================
  /**
   * Updates form state on input change.
   * Clears field-specific errors when user types.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value.trim(),
    }))

    // Clear current field error
    setErrors((prev) => ({
      ...prev,
      [id]: '',
    }))
  }

  // =========================
  // Form Submission Handler
  // =========================
  /**
   * Validates inputs and performs login API call.
   * Handles loading state, error states, and navigation on success.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let valid = true
    const newErrors = { staffId: '', password: '', commonError: '' }

    // Input validations
    if (!formData.staffId.trim()) {
      newErrors.staffId = 'Staff ID is required'
      valid = false
    }
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
      valid = false
    }

    if (!valid) {
      setErrors(newErrors)
      return
    }

    try {
      setIsLoading(true)

      // Login API call
      await axios.post(
        `${BaseUrl}auth/login/staff`,
        formData,
        { withCredentials: true }
      )

      // Reset form and errors
      setFormData({ staffId: '', password: '' })
      setErrors({ staffId: '', password: '', commonError: '' })

      // Navigate to staff dashboard
      navigate('/staff-dashboard', { replace: true })
    } catch (error: any) {
      console.error('❌ Login error:', error)

      if (error.response?.status === 401) {
        setErrors((prev) => ({
          ...prev,
          commonError: 'Invalid credentials',
        }))
      } else {
        setStatus('error')
      }
    } finally {
      setIsLoading(false)
    }
  }

  // =========================
  // Return values
  // =========================
  return { formData, handleChange, handleSubmit, errors, status, isLoading }
}
