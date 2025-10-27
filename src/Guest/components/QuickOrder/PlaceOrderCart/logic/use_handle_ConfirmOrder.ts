import axios from 'axios'
import { useState, useEffect } from 'react'
import { showSuccess } from '../../../../utils/toast'
import localforage from 'localforage'
import { type Status } from '../../../../../../ServerErrorUI/ServerError_UI'
import { BaseUrl } from '../../../../../../BaseUrl/BaseUrl'

// Define error types for form validation
type OrderFormErrors = {
  email?: string
  tableNumber?: string
  items?: string
}

// Interface for portion details (quantity, price, subtotal)
interface Portion {
  portion: string
  price: number
  quantity: number
  subtotal: number
}

// Interface for order items with multiple portions
interface OrderFormItem {
  _id: string
  name: string
  portions: Portion[] // Support multiple portions per item
}

// Main order form data structure
interface OrderFormData {
  email?: string
  orderType: 'dining' | 'parcel'
  tableNumber: string
  items: OrderFormItem[]
}

/**
 * Custom hook for managing order confirmation process
 * Handles form state, validation, and API submission
 */
export const use_handle_ConfirmOrder = (addedFoodItems: any[] = []) => {
  // State for form validation errors
  const [errors, setErrors] = useState<OrderFormErrors>({})
  // State for API request status
  const [status, setStatus] = useState<Status>('null')
  // State for submission loading state
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  // State for order form data
  const [orderForm, setOrderForm] = useState<OrderFormData>({
    email: '',
    orderType: 'dining',
    tableNumber: '',
    items: [],
  })

  /**
   * Update form fields (excluding items)
   * Clears any existing errors for the field
   */
  const handleFormChange = (
    field: keyof Omit<OrderFormData, 'items'>,
    value: string | 'dining' | 'parcel'
  ) => {
    setOrderForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  /**
   * Add items to order form with all portion details
   * Converts cart items to order form format
   */
  const handleAddItems = (items: any[]) => {
    const simplifiedItems: OrderFormItem[] = items.map((item) => ({
      _id: item.id,
      name: item.name,
      portions: item.portions, // Preserve all portion options
    }))

    setOrderForm((prev) => ({ ...prev, items: simplifiedItems }))
    setErrors((prev) => ({ ...prev, items: '' }))
  }

  // Sync cart items to order form when cart changes
  useEffect(() => {
    if (addedFoodItems && addedFoodItems.length > 0) {
      handleAddItems(addedFoodItems)
    }
  }, [addedFoodItems])

  /**
   * Validate and submit order to backend API
   * @param role - User role for API endpoint (staff, etc.)
   */
  const handleConfirmOrder = async (role: string) => {
    const newErrors: OrderFormErrors = {}

    // 🔹 Validate email (optional)
    if (orderForm.email && orderForm.email.trim()) {
      const email = orderForm.email.trim()
      const emailRegex = /^\S+@\S+\.\S+$/

      if (email.length > 254) {
        newErrors.email = 'Email cannot exceed 254 characters'
      } else if (!emailRegex.test(email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }

    // Validate table number is selected for dining orders
    if (orderForm.orderType === 'dining' && !orderForm.tableNumber) {
      newErrors.tableNumber = 'Please select table number'
    }

    // Validate at least one item is in cart
    if (!orderForm.items || orderForm.items.length === 0) {
      newErrors.items = 'Add at least one item'
    }

    // Set errors and exit if validation fails
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    try {
      // Set loading state and submit order
      setIsSubmitting(true)
      await axios.post(`${BaseUrl}${role}/post/confirm/orders`, orderForm, {
        withCredentials: true,
      })

      // Show success notification
      showSuccess('Order confirmed successfully!')

      // Clear cart and reset form after 2 seconds
      const fetchedUserId = sessionStorage.getItem('guest-userId')
      setTimeout(async () => {
        await localforage.removeItem(`Add-to-cart_food_list${fetchedUserId}`)
        // Reset form to initial state
        setOrderForm({
          orderType: 'dining',
          tableNumber: '',
          items: [],
        })
        setIsSubmitting(false)
      }, 2000)
    } catch (error: any) {
      // Handle API errors
      setIsSubmitting(false)
      setStatus('error')
      console.error(
        '❌ Error confirming order:',
        error.response?.data || error.message
      )
    }
  }

  // Return state and functions for component use
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
