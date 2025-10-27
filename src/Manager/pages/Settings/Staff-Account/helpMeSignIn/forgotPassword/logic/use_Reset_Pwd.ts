import { useState } from 'react'
import { Staff_Acc_Validation } from '../../../create-Account/validation/Staff_Acc_Validation'
import {type StaffValidationErrors } from '../../../create-Account/validation/Staff_Acc_Validation'
import axios from 'axios'
import { showSuccess } from '../../../../../../utils/toast'
import { type Status } from '../../../../../../../ServerErrorUI/ServerError_UI'
import { useNavigate } from 'react-router-dom'
import { BaseUrl } from '../../../../../../../BaseUrl/BaseUrl'

export const use_Reset_Pwd = () => {
  const navigate = useNavigate()

  // State to toggle visibility of password fields modal
  const [showResetModal, setShowResetModal] = useState(true)

  // Tracks API request status: "null", "error", etc.
  const [status, setStatus] = useState<Status>('null')

  // Tracks if the form has been successfully updated
  const [isUpdated, setIsUpdated] = useState(false)

  // Tracks if there are any unsaved changes in the form
  const [hasChanges, setHasChanges] = useState(false)

  interface FormData {
    staffId: string
    name: string
    password: string
    rePassword: string
    skipPassword?: boolean // optional: determines whether password fields should be validated
  }

  // Combined state for staffId, name, and password fields
  const [formData, setFormData] = useState<FormData>({
    staffId: '',
    name: '',
    password: '',
    rePassword: '',
    skipPassword: showResetModal,
  })

  // Tracks validation errors for each form field
  const [formErrors, setFormErrors] = useState<StaffValidationErrors>({})

  // Update formData state and reset error for the specific field
  const handleChange = (
    field: 'staffId' | 'password' | 'rePassword' | 'name',
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setFormErrors((prev) => ({ ...prev, [field]: '' }))
    setHasChanges(true) // Mark that there are unsaved changes
  }

  // Validate form and submit updated data
  const handleResetPassword = async () => {
    // Run validation using shared validation function
    const result = Staff_Acc_Validation(formData, showResetModal)

    // If validation fails, show errors and stop
    if (!result.valid) {
      setFormErrors(result.errors)
      return
    }

    // Clear previous errors
    setFormErrors({})

    try {
      setIsUpdated(true) // Disable button and show loading/animation

      // API call to reset staff password or update profile
      await axios.post(
        `${BaseUrl}manager/reset-staff-password`,
        { formData },
        { withCredentials: true }
      )

      setShowResetModal(true) // Keep modal open for optional password reset

      // Show success toast message
      showSuccess('🎉 Updated successfully!')

      // Clear password fields after successful update
      setFormData((prev) => ({
        ...prev,
        password: '',
        rePassword: '',
      }))

      // Wait 2 seconds before navigating
      setTimeout(() => {
        navigate('/settings/staff-account-list') // replace with your route
      }, 2000) // 2000ms = 2 seconds
    } catch (error: any) {
      // Log unexpected errors
      console.error('Error resetting staff password:', error)

      // Handle Axios-specific errors
      if (axios.isAxiosError(error)) {
        setStatus('error')
        return
      }
    } finally {
      setIsUpdated(false) // Re-enable button
    }
  }

  return {
    handleResetPassword,
    formData,
    handleChange,
    setFormData,
    showResetModal,
    setShowResetModal,
    status,
    formErrors,
    isUpdated,
    hasChanges,
  }
}
