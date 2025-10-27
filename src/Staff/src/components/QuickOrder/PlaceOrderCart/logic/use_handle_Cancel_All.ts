import { useState } from 'react'
import localforage from 'localforage'

/**
 * Hook to handle clearing all items from the cart
 * Provides a flag to indicate the clearing process
 */
export const use_handle_Cancel_All = () => {
  const [isClearingCart, setIsClearingCart] = useState<boolean>(false)

  /**
   * Clears the entire cart for the current staff user
   */
  const handleCancelAll = async () => {
    const confirmed = window.confirm('Clear your entire cart?')
    if (!confirmed) return

    try {
      const staffUserId = sessionStorage.getItem('staff-userId')
      if (!staffUserId) return

      // Remove cart from localforage
      await localforage.removeItem(`Add-to-cart_food_list${staffUserId}`)

      // Set clearing flag to true
      setIsClearingCart(true)
    } catch (err) {
      console.error('Error clearing cart:', err)
    }
  }

  return { handleCancelAll, isClearingCart }
}
