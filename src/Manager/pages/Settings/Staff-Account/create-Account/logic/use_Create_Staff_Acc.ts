import { useState } from 'react'
import { Staff_Acc_Validation } from '../validation/Staff_Acc_Validation'
import { type StaffValidationErrors } from '../validation/Staff_Acc_Validation'
import axios from 'axios'
import { type Status } from '../../../../../../ServerErrorUI/ServerError_UI'
import { showSuccess } from '../../../../../utils/toast'
import { BaseUrl } from '../../../../../../BaseUrl/BaseUrl'

export const use_Create_Staff_Acc = () => {
  const [formData, setFormData] = useState({
    staffId: '',
    name: '',
    password: '',
    rePassword: '',
  })

  const [formErrors, setFormErrors] = useState<StaffValidationErrors>({})
  const [status, setStatus] = useState<Status>('null')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Generate Staff ID
  const generateStaffId = () => {
    const newId = 'ST-' + Math.floor(100000 + Math.random() * 900000)
    setFormData((prev) => ({ ...prev, staffId: newId }))
  }

  // Generic handler for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCreatAccount = async () => {
    const result = Staff_Acc_Validation(formData)

    if (!result.valid) {
      setFormErrors(result.errors)
      return
    }
    setFormErrors({})

    try {
      setIsSubmitting(true)
      await axios.post(
        `${BaseUrl}manager/create/staff/account`,
        { formData },
        { withCredentials: true } // if needed
      )

      setFormData({
        staffId: '',
        name: '',
        password: '',
        rePassword: '',
      })
      showSuccess('Staff account created successfully!')
      return
    } catch (error) {
      console.error('Failed to create staff account. Please try again.', error)

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setFormErrors((prev) => ({
            ...prev,
            staffId:
              'This Staff ID is already in use. Please choose a different one.',
          }))
          // Clear only staffId
          setFormData((prev) => ({
            ...prev,
            staffId: '',
          }))
          return
        } else {
          setStatus('error')
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    handleCreatAccount,
    handleChange,
    generateStaffId,
    formData,
    formErrors,
    status,
    isSubmitting,
  }
}
