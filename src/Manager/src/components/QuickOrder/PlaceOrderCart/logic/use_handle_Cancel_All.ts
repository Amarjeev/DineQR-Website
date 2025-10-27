import localforage from 'localforage'
import { useState } from 'react'

export const use_handle_Cancel_All = () => {
    const [isClearingCart, setIsClearingCart] = useState<boolean>(false)

  /**
   * Clear all items from cart
   */
  const handleCancelAll = async () => {
    const confirmed = window.confirm('Clear your entire cart?')
    if (confirmed) {
      // Clear cart and reset form after 2 seconds
      const fetchedUserId = sessionStorage.getItem('manager-userId')
      await localforage.removeItem(`Add-to-cart_food_list${fetchedUserId}`)
      setIsClearingCart(true)
    }
  }

  return { handleCancelAll ,isClearingCart, setIsClearingCart}
}
