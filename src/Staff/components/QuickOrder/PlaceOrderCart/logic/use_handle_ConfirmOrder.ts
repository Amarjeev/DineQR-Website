import axios from 'axios'
import { useState, useEffect } from 'react'
import { showSuccess } from '../../../../utils/toast'
import localforage from 'localforage'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'
import { type Status } from '../../../../../ServerErrorUI/ServerError_UI'

// Type for validation errors
type OrderFormErrors = {
  mobileNumber?: string
  email?: string
  tableNumber?: string
  items?: string
}

// Portion interface
interface Portion {
  portion: string
  price: number
  quantity: number
  subtotal: number
}

// Single order item interface
interface OrderFormItem {
  _id: string
  name: string
  portions: Portion[]
}

// Full order form data
interface OrderFormData {
  mobileNumber: string
  email?: string
  orderType: 'dining' | 'parcel'
  tableNumber: string
  items: OrderFormItem[]
}

/**
 * Hook for managing order confirmation workflow
 * Handles form state, validation, and submission
 */
export const use_handle_ConfirmOrder = (addedFoodItems: any[] = []) => {
  const [errors, setErrors] = useState<OrderFormErrors>({})
  const [status, setStatus] = useState<Status>('null')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderForm, setOrderForm] = useState<OrderFormData>({
    mobileNumber: '',
    email: '',
    orderType: 'dining',
    tableNumber: '',
    items: [],
  })

  /**
   * Update form fields and clear errors
   */
  const handleFormChange = (
    field: keyof Omit<OrderFormData, 'items'>,
    value: string | 'dining' | 'parcel'
  ) => {
    setOrderForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  /**
   * Add cart items to the order form
   */
  const handleAddItems = (items: any[]) => {
    const simplifiedItems: OrderFormItem[] = items.map((item) => ({
      _id: item.id,
      name: item.name,
      portions: item.portions,
    }))
    setOrderForm((prev) => ({ ...prev, items: simplifiedItems }))
    setErrors((prev) => ({ ...prev, items: '' }))
  }

  // Sync cart items whenever addedFoodItems changes
  useEffect(() => {
    if (addedFoodItems && addedFoodItems.length > 0) {
      handleAddItems(addedFoodItems)
    }
  }, [addedFoodItems])

  /**
   * Validate and submit order
   * @param role - API role (e.g., 'staff')
   */
  const handleConfirmOrder = async (role: string) => {
    const newErrors: OrderFormErrors = {}

    // Validate mobile number
    if (!orderForm.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Please enter mobile number'
    } else if (!/^[0-9]{10}$/.test(orderForm.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number'
    }

    // Validate email (optional)
    if (orderForm.email?.trim()) {
      const email = orderForm.email.trim()
      const emailRegex = /^\S+@\S+\.\S+$/
      if (email.length > 254)
        newErrors.email = 'Email cannot exceed 254 characters'
      else if (!emailRegex.test(email))
        newErrors.email = 'Please enter a valid email address'
    }

    // Table number validation for dining
    if (orderForm.orderType === 'dining' && !orderForm.tableNumber) {
      newErrors.tableNumber = 'Please select table number'
    }

    // Ensure at least one item is present
    if (!orderForm.items || orderForm.items.length === 0) {
      newErrors.items = 'Add at least one item'
    }

    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    try {
      setIsSubmitting(true)

      // 🔹 Add +91 if not already present
      const mobileNumber = orderForm.mobileNumber.startsWith('+91')
        ? orderForm.mobileNumber
        : `+91${orderForm.mobileNumber}`

      // 🔹 Create a new object to send (with normalized mobile)
      const payload = {
        ...orderForm,
        mobileNumber,
      }

      // Submit order
      await axios.post(`${BaseUrl}${role}/post/confirm/orders`, payload, {
        withCredentials: true,
      })

      showSuccess('Order confirmed successfully!')

      // Clear cart and reset form after 2 seconds
      const fetchedUserId = sessionStorage.getItem('staff-userId')
      setTimeout(async () => {
        await localforage.removeItem(`Add-to-cart_food_list${fetchedUserId}`)
        setOrderForm({
          mobileNumber: '',
          orderType: 'dining',
          tableNumber: '',
          items: [],
        })
        setIsSubmitting(false)
      }, 2000)
    } catch (error: any) {
      setIsSubmitting(false)
      setStatus('error')
      console.error(
        '❌ Error confirming order:',
        error.response?.data || error.message
      )
    }
  }

  return {
    handleConfirmOrder,
    handleFormChange,
    handleAddItems,
    setOrderForm,
    orderForm,
    errors,
    isSubmitting,
    status,
  }
}
