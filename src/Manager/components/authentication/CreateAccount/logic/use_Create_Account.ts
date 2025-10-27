// ================================
// Hook: useCreateAccount
// Purpose: Manage signup form state, validation, and submission
// Features:
//   - Tracks form input values
//   - Validates with Zod schema
//   - Handles field-level errors
//   - Checks email uniqueness with backend
//   - Submits valid data to backend API
// ================================

import { useState, useEffect } from 'react'
import { createAccountSchema } from './create_AccountSchema'
import { showSuccess, showError } from '../../../../utils/toast'
import axios, { isAxiosError } from 'axios'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'

// ----------------------
// Types
// ----------------------

// Form input values
interface FormData {
  name: string
  email: string
  mobileNumber: string
  password: string
  rePassword: string
}

// Validation errors for each field
interface FormErrors {
  name?: string
  email?: string
  mobileNumber?: string
  password?: string
  rePassword?: string
}

export const use_Create_Account = () => {
  // ----------------------
  // State
  // ----------------------
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
    rePassword: '',
  })
  const [showLoader, setShowLoader] = useState(false) // Loader shown during submission
  const [loading, setLoading] = useState(false) // Tracks if form is valid
  const [error, setError] = useState<FormErrors>({}) // Field-level errors
  const [emailError, setEmailError] = useState<string>('') // Backend email uniqueness error

  // ----------------------
  // Effect: Enable/disable submit based on validation
  // ----------------------
  useEffect(() => {
    const validateForm = () => {
      setLoading(Object.keys(error).length !== 0)
    }

    // Only validate if all fields are filled
    const isAnyFieldFilled = Object.values(formData).every(
      (value) => value !== ''
    )
    if (isAnyFieldFilled) validateForm()
  }, [formData, error])

  // ----------------------
  // Effect: Debounced backend email check
  // ----------------------
  interface CheckEmailResponse {
    exists: boolean
  }

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const checkEmailExistence = async () => {
        try {
          if (formData.email) {
            const response = await axios.post<CheckEmailResponse>(
              `${BaseUrl}check-email`,
              { email: formData.email }
            )

            // Show error if email already exists
            if (response?.data?.exists) {
              setEmailError(
                'This email is already used, please choose another one.'
              )
            } else {
              setEmailError('')
            }
          }
        } catch (error) {
          console.error('Error checking email:', error)
        }
      }

      if (formData?.email) {
        checkEmailExistence()
      }
    }, 500) // 500ms delay after user stops typing

    return () => clearTimeout(delayDebounce) // Clean up previous timer
  }, [formData.email])

  // ----------------------
  // Handle input changes + validate field
  // ----------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    const newFormData = { ...formData, [id]: value }
    setFormData(newFormData)

    // Validate entire form using Zod
    const result = createAccountSchema.safeParse(newFormData)
    if (result.success) {
      setError({})
      return
    }

    // Set error only for current field
    setError((prevErrors) => {
      const updatedErrors = { ...prevErrors }
      const fieldError = result.error.issues.find((err) => err.path[0] === id)

      if (fieldError) {
        updatedErrors[id as keyof FormErrors] = fieldError.message
      } else {
        delete updatedErrors[id as keyof FormErrors]
      }

      return updatedErrors
    })
  }

  // ----------------------
  // Handle form submission
  // ----------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prevent submit if validation errors exist
    if (Object.keys(error).length !== 0 || emailError) return
    setShowLoader(true)

    // Password match check
    if (formData.password !== formData.rePassword) {
      setError({ rePassword: 'Passwords do not match' })
      setShowLoader(false)
      return
    }

    // Final Zod validation before API call
    const result = createAccountSchema.safeParse(formData)
    if (!result.success) {
      setShowLoader(false)
      showError('Please fill in all fields.')
      return
    }

    try {
      await axios.post(`${BaseUrl}auth/signup/manager`, formData)

      // Reset form on successful signup
      setFormData({
        name: '',
        email: '',
        mobileNumber: '',
        password: '',
        rePassword: '',
      })
      showSuccess('Signup successful! You can now log in.')
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        // ✅ Safe to access error.response here
        if (error.response?.status === 409) {
          showError('Email already in use. Please use a different email.')
          return
        } else if (error.response) {
          showError('Something went wrong. Please try again.')
        }
      } else {
        // Non-Axios errors (e.g., network issues, unexpected errors)
        showError('Network error. Please check your connection.')
      }
    } finally {
      setShowLoader(false)
    }
  }

  // ----------------------
  // Expose state + handlers for component use
  // ----------------------
  return {
    formData,
    handleChange,
    handleSubmit,
    loading,
    error,
    showLoader,
    emailError,
  }
}
