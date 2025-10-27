import { useState } from 'react'
import localforage from 'localforage'
import { showError, showSuccess } from '../../../../utils/toast'

/**
 * Custom hook for managing food ordering and cart operations.
 *
 * Responsibilities:
 * - Maintain selected items state
 * - Add selected items to cart with localForage persistence
 * - Handle cart expiry (8 hours)
 * - Provide loading state for UI feedback
 */
export const use_order_Food = () => {
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const [isUpdating, setIsUpdating] = useState(false)

  /**
   * Add currently selected items to the user's cart
   * @param userId - Unique identifier of the user
   */
  const handleAddToCart = async (userId: string) => {
    try {
      setIsUpdating(true)

      // 1️⃣ Retrieve existing cart data
      const storedData: any =
        (await localforage.getItem(`Add-to-cart_food_list${userId}`)) || {}

      let existingCart: any[] = []

      if (storedData.expiry && storedData.expiry > Date.now()) {
        existingCart = storedData.items || []
      } else {
        existingCart = [] // Cart expired or not found
      }

      // 2️⃣ Remove existing items that are being updated
      const newItemIds = new Set(selectedItems.map((item) => item.itemId))
      let updatedCart = existingCart.filter(
        (item) => !newItemIds.has(item.itemId)
      )

      // 3️⃣ Add new selected items
      updatedCart = [...updatedCart, ...selectedItems]

      // 4️⃣ Save back to localForage with new expiry (8 hours)
      await localforage.setItem(`Add-to-cart_food_list${userId}`, {
        items: updatedCart,
        expiry: Date.now() + 8 * 60 * 60 * 1000, // 8 hours
      })

      console.log('Updated cart:', updatedCart)

      // 5️⃣ Show success toast
      showSuccess('Items successfully added to cart!')
    } catch (err) {
      console.error('Error adding to cart:', err)
      showError('Something went wrong while adding to cart.')
    } finally {
      setIsUpdating(false)
    }
  }

  return { handleAddToCart, setSelectedItems, selectedItems, isUpdating }
}
