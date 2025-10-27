import React, { useEffect, useState } from 'react'
import axios, { isAxiosError } from 'axios'
import { showError } from '../../../../utils/toast'
import { useNavigate } from 'react-router-dom'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'

/**
 * Custom Hook: useLoginAccount
 * ----------------------------
 * Handles login form state, input change,
 * email existence validation (debounced),
 * and login submission with error handling.
 */
export const use_Login_Account = () => {
  const navigate = useNavigate()

  // ----------------------
  // Interfaces for type safety
  // ----------------------
  interface FormData {
    email: string
    password: string
  }

  interface CheckEmailResponse {
    exists: boolean
  }

  interface CheckLoginResponse {
    success: boolean
  }

  // ----------------------
  // Local State
  // ----------------------
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })

  const [error, setError] = useState<string>('') // Stores error messages
  const [emailExist, setEmailExist] = useState<boolean>(false) // Tracks if email exists in DB
  const [loading, setLoading] = useState<boolean>(false) // Tracks submission state

  // ----------------------
  // Effect: Debounced backend email validation
  // ----------------------
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const checkEmailExistence = async () => {
        try {
          if (formData.email) {
            const response = await axios.post<CheckEmailResponse>(
              `${BaseUrl}check-email`,
              { email: formData.email }
            )

            // Update state based on backend response
            if (response?.data?.exists) {
              setEmailExist(true)
            } else {
              setEmailExist(false)
            }
          }
        } catch (error: unknown) {
          if (isAxiosError(error)) {
            console.log('Error checking email:', error)
          }
          showError('Something went wrong. Please try again.')
        }
      }

      if (formData?.email) {
        checkEmailExistence()
      }
    }, 500) // Delay check until 500ms after user stops typing

    return () => clearTimeout(delayDebounce) // Cleanup previous timer on re-render
  }, [formData.email])

  // ----------------------
  // Handler: Input Change
  // ----------------------
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    const newFormData = { ...formData, [id]: value }
    setFormData(newFormData)
  }

  // ----------------------
  // Handler: Form Submit
  // ----------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation: Check required fields
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.')
      return
    }

    // Validation: Ensure email exists in DB
    if (!emailExist) {
      setError('Invalid credentials! Login failed')
      return
    } else {
      setError('')
    }

    try {
      setLoading(true)

      // Send login request
      await axios.post<CheckLoginResponse>(
        `${BaseUrl}auth/login/manager`,
        formData
      )

      // Reset form after successful login
      setLoading(false)
      // After login success, go to OTP page
      navigate('/Mgr/otp-verification', { state: { email: formData.email } })

      setFormData({
        email: '',
        password: '',
      })
    } catch (error: unknown) {
      setLoading(false)
      if (isAxiosError(error)) {
        // Handle backend error responses
        if (error.response?.status === 404) {
          setError('Invalid credentials! Login failed')
          return
        }
        if (error.response?.status === 500) {
          showError('Something went wrong. Please try again.')
          return
        }
      }
      showError('Network error. Please check your connection.')
    }
  }

  // ----------------------
  // Return hook API
  // ----------------------
  return { handleChange, handleSubmit, error, formData, loading }
}
