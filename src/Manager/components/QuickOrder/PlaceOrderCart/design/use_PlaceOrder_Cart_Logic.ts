import { useEffect, useState } from 'react'
import localforage from 'localforage'
import { use_PlaceOrder_Cart } from '../logic/use_PlaceOrder_Cart'
import { use_Get_Table_List } from '../../GetTableList/use_Get_Table_List'
import { use_handle_ConfirmOrder } from '../logic/use_handle_ConfirmOrder'
import { use_handle_Cancel_All } from '../logic/use_handle_Cancel_All'

/**
 * Hook to manage the Place Order Cart page
 * Handles:
 * - Cart items & image loading states
 * - Table list fetching
 * - Order form syncing
 * - Cancel individual/all items
 * - Total calculation
 */
export const use_PlaceOrder_Cart_Logic = () => {
  // Track image loading for each cart item
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({})
  const [tables, setTables] = useState<any[]>([])

  // Cart operations
  const { fetchUserCart, userId, addedFoodItems, setAddedFoodItems } = use_PlaceOrder_Cart()

  // Order form & submission
  const {
    handleConfirmOrder,
    handleFormChange,
    setOrderForm,
    orderForm,
    errors,
    isSubmitting,
    status,
  } = use_handle_ConfirmOrder()

  // Cancel all cart items
  const { handleCancelAll, isClearingCart } = use_handle_Cancel_All()

  // Fetch table list
  const { handleFetchTableList } = use_Get_Table_List()

  /**
   * Sync cart items into order form whenever cart changes
   */
  useEffect(() => {
    const simplifiedItems = addedFoodItems.map(item => ({
      _id: item.id,
      name: item.name,
      portions: item.portions,
    }))
    setOrderForm(prev => ({ ...prev, items: simplifiedItems }))
  }, [addedFoodItems, setOrderForm])

  /**
   * Fetch table list from sessionStorage or API
   */
  useEffect(() => {
    const fetchTables = async () => {
      const stored = sessionStorage.getItem('tableList')
      if (stored) {
        setTables(JSON.parse(stored))
      } else {
        const tableList = await handleFetchTableList('staff')
        setTables(tableList)
      }
    }
    fetchTables()
  }, [])

  /**
   * Fetch cart items whenever submitting or clearing the cart
   */
  useEffect(() => {
    fetchUserCart()
  }, [isSubmitting, isClearingCart])

  /**
   * Remove a single item from the cart
   * @param id - itemId of the cart item to remove
   */
  const handleCancelItem = async (id: string) => {
    try {
      const confirmed = window.confirm('Remove this item from cart?')
      if (!confirmed || !userId) return

      const storedData = await localforage.getItem<{ items: any[]; expiry: number }>(
        `Add-to-cart_food_list${userId}`
      )
      if (!storedData || !Array.isArray(storedData.items)) return

      const updatedItems = storedData.items.filter(item => item.itemId !== id)
      await localforage.setItem(`Add-to-cart_food_list${userId}`, { ...storedData, items: updatedItems })

      // Update state
      setAddedFoodItems(prev => prev.filter(item => item.id !== id))
    } catch (err) {
      console.error('Error deleting item from cart:', err)
    }
  }

  // Calculate total amount for the cart
  const totalAmount = addedFoodItems.reduce(
    (acc, item) => acc + item.portions.reduce((sum, p) => sum + p.subtotal, 0),
    0
  )

  return {
    imagesLoaded,
    setImagesLoaded,
    tables,
    addedFoodItems,
    handleCancelAll,
    handleCancelItem,
    totalAmount,
    handleConfirmOrder,
    handleFormChange,
    orderForm,
    errors,
    isSubmitting,
    status,
  }
}
