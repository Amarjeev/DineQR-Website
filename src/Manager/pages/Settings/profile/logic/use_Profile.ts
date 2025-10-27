import axios from 'axios'
import { useState } from 'react'
import { Profile_Validation } from '../validation/Profile_Validation'
import { type ProfileData } from '../validation/Profile_Validation'
import { showSuccess } from '../../../../utils/toast'
import { type Status } from '../../../../../../ServerErrorUI/ServerError_UI'
import { BaseUrl } from '../../../../../../BaseUrl/BaseUrl'

export const use_Profile = () => {
  // ✅ Single useState to collect all fields
  const [formData, setFormData] = useState<ProfileData>({
    name: '',
    email: '',
    mobileNumber: '',
    Password: '',
    rePassword: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isModified, setIsModified] = useState(false)
  const [isUpdating, setIsUpdating] = useState(false)
  const [status, setStatus] = useState<Status>('null')

  const handleFetchProfile = async () => {
    setStatus('loading')
    try {
      const response = await axios.get(`${BaseUrl}manager/get/profile`, {
        withCredentials: true,
      })
      setFormData(response.data)
      setStatus('null')
    } catch (error: any) {
      setStatus('null')
      setStatus('error')
      console.error(
        'Failed to fetch profile:',
        error.response?.data || error.message
      )
    }
  }

  // ✅ Universal change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setIsModified(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // ✅ call external validator
    const validationErrors = Profile_Validation(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) return

    try {
      setIsUpdating(true)
      await axios.post(
        `${BaseUrl}manager/edit/profile`,
        { formData },
        { withCredentials: true }
      )

      showSuccess('Profile updated successfully!')
      // ✅ Clear only password fields
      setFormData((prev) => ({
        ...prev,
        Password: '',
        rePassword: '',
      }))
      setIsModified(false)
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message)
        if (error.response?.status === 409) {
          setErrors((prev) => ({
            ...prev,
            email: 'This email is already in use. Please use a different one.',
          }))
        }
      } else {
        setStatus('error')
        console.error('Unexpected error:', error)
      }
    } finally {
      setIsUpdating(false)
    }
  }

  return {
    handleChange,
    handleSubmit,
    formData,
    handleFetchProfile,
    errors,
    isModified,
    isUpdating,
    status,
  }
}
