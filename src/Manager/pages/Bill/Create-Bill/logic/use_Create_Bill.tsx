import axios from 'axios'
import { useState } from 'react'
import { showSuccess } from '../../../../utils/toast'
import { type Status } from '../../../../../ServerErrorUI/ServerError_UI'
import { Validate_Bill } from '../Validation/Validate_Bill'
import { type BillErrors } from '../Validation/Validate_Bill'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'

export const use_Create_Bill = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<Status>('null')

  const [formData, setFormData] = useState({
    restaurantName: '',
    address: '',
    gstNumber: '',
    contactNumber: '',
  })

  const [errors, setErrors] = useState<BillErrors>({})

  const initialFormData = {
    restaurantName: '',
    address: '',
    gstNumber: '',
    contactNumber: '',
  }

  const initialErrors = {
    restaurantName: '',
    address: '',
    gstNumber: '',
    contactNumber: '',
    duplicatError: '',
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // clear error for this field on change
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 🔍 validations
    const validationErrors = Validate_Bill(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      setIsSubmitting(true)
      await axios.post(`${BaseUrl}manager/create/bill`, formData, {
        withCredentials: true,
      })
      setFormData(initialFormData)
      setErrors(initialErrors)
      // Success
      showSuccess('Bill created Suceesfully')
      return
    } catch (error: any) {
      if (error.response.status === 409) {
        // Duplicate bill error
        setErrors((prev) => ({
          ...prev,
          duplicatError:
            'You already have a bill for this hotel. Please delete the existing bill before creating a new one.',
        }))
        return
      } else {
        setStatus('error')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return { formData, errors, handleChange, handleSubmit, isSubmitting, status }
}
