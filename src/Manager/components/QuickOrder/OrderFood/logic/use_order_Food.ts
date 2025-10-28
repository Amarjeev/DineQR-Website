import { useState } from 'react'
import localforage from 'localforage'
import { showError, showSuccess } from '../../../../utils/toast'



export const use_order_Food = () => {
  const [selectedItems, setSelectedItems] = useState<any[]>([])
  const [isUpdating, setIsUpdating] = useState(false)

  const handleAddToCart = async (userId: string) => {
    try {
      setIsUpdating(true)

      // 1. Get existing cart (with expiry check)
      const storedData: any =
        (await localforage.getItem(`Add-to-cart_food_list${userId}`)) || {}
      let existingCart: any[] = []

      if (storedData.expiry && storedData.expiry > Date.now()) {
        existingCart = storedData.items || []
      } else {
        existingCart = [] // expired or not found
      }

      // 2. Build a Set of selected itemIds for quick lookup
      const newItemIds = new Set(selectedItems.map((item) => item.itemId))

      // 3. Filter existing cart once (remove items with same itemId)
      let updatedCart = existingCart.filter(
        (item) => !newItemIds.has(item.itemId)
      )

      // 4. Add the new selected items
      updatedCart = [...updatedCart, ...selectedItems]

      // 5. Save back with new expiry
      await localforage.setItem(`Add-to-cart_food_list${userId}`, {
        items: updatedCart,
        expiry: Date.now() + 8 * 60 * 60 * 1000 // 8 hours
      })

      // ✅ Success message
      showSuccess('Items successfully added to cart!')
    } catch (err) {
      showError('Something went wrong while adding to cart.')
      console.error('Error adding to cart:', err)
    } finally {
      setIsUpdating(false)
    }
  }

  return { handleAddToCart, setSelectedItems, selectedItems, isUpdating }
}
