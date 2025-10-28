import { useState } from 'react'
import { type HotelInfoForm } from '../validation/HotelInfo_Validation'
import { HotelInfo_Validation } from '../validation/HotelInfo_Validation'
import axios from 'axios'
import { showSuccess } from '../../../../utils/toast'
import { type Status } from '../../../../../ServerErrorUI/ServerError_UI'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'

export const use_HotelInfo = () => {
  const [formData, setFormData] = useState<HotelInfoForm>({
    name: '',
    contactNumber: '',
    email: '',
    openingTime: '',
    closingTime: '',
    website: '',
    address: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isUpdating, setIsUpdating] = useState(false)
  const [status, setStatus] = useState<Status>('null')
  const [isModified, setIsModified] = useState(false)

  // Generic handler to update state
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setIsModified(true)
  }

  const handelFetchHotelInfo = async () => {
    try {
      setStatus('loading')
      const response = await axios.get(`${BaseUrl}manager/get/Hotelinfo`, {
        withCredentials: true,
      })

      setStatus('null')

      if (response.data?.data) {
        setFormData(response.data.data)
      }
    } catch (error: any) {
      console.error('Error fetching hotel info:', error)

      if (axios.isAxiosError(error)) {
        setStatus('null')
        setStatus('error')
      }
    }
  }

  const handleSubmit = async () => {
    try {
      // Run validation
      const validationErrors = HotelInfo_Validation(formData)
      setErrors(validationErrors)

      // Stop submission if there are validation errors
      if (Object.keys(validationErrors).length !== 0) return

      setIsUpdating(true)

      // Send data to backend
      await axios.post(
        `${BaseUrl}manager/upload/Hotelinfo`,
        { formData },
        { withCredentials: true }
      )

      setIsModified(false)

      showSuccess('updated successfully!')
    } catch (error: any) {
      // Handle axios/network errors
      console.error('Error submitting form:', error)

      if (axios.isAxiosError(error)) {
        setStatus('error')
      }
    } finally {
      setIsUpdating(false)
    }
  }

  return {
    handleChange,
    handleSubmit,
    formData,
    errors,
    isUpdating,
    status,
    handelFetchHotelInfo,
    isModified,
  }
}
