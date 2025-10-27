import { useState } from 'react'
import { Validate_Bill } from '../../Create-Bill/Validation/Validate_Bill'
import { type BillErrors } from '../../Create-Bill/Validation/Validate_Bill'
import {type BillData } from '../../Create-Bill/Validation/Validate_Bill'
import axios from 'axios'
import { type Status } from '../../../../../../ServerErrorUI/ServerError_UI'
import { showSuccess } from '../../../../utils/toast'
import { BaseUrl } from '../../../../../../BaseUrl/BaseUrl'

// Custom hook to manage bill editing logic for manager
export const use_Edit_Bill = () => {
  // Store the original bill data to allow canceling edits
  const [originalData, setOriginalData] = useState<BillData | null>(null)

  // Boolean flag to track if edit operation is in progress
  const [editSuccess, setEditSuccess] = useState<boolean>(false)

  // Status of the request: 'null', 'loading', or 'error'
  const [status, setStatus] = useState<Status>('null')

  // Store validation errors for the form fields
  const [errors, setErrors] = useState<BillErrors>({})

  // Boolean flag to detect if any field has changed
  const [isChanged, setIsChanged] = useState<boolean>(true)

  // Form data state to manage input values
  const [formData, setFormData] = useState<BillData>({
    restaurantName: '',
    address: '',
    gstNumber: '',
    contactNumber: '',
  })

  // Update formData on input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setIsChanged(false)
  }

  // Save changes to the backend
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()

    // 🔍 Validate form data before sending to backend
    const validationErrors = Validate_Bill(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors) // Set validation errors to display in UI
      return
    }

    try {
      setEditSuccess(true) // Start edit process
      // Send PATCH request to update bill on backend
      await axios.patch(`${BaseUrl}manager/edit/bill`, formData, {
        withCredentials: true,
      })

      // ⏳ Wait 2 seconds before showing success toast
      // await new Promise((resolve) => setTimeout(resolve, 2000))
      showSuccess('Bill updated successfully')
    } catch (error) {
      setStatus('error') // Set error status if request fails
      console.error('Something went wrong while editing the bill:', error)
    } finally {
      setEditSuccess(false) // Reset edit flag
    }
  }

  // Expose hook API for component use
  return {
    handleChange,
    formData,
    setFormData,
    handleSave,
    errors,
    originalData,
    setOriginalData,
    status,
    setStatus,
    editSuccess,
    isChanged,
    setIsChanged,
  }
}
