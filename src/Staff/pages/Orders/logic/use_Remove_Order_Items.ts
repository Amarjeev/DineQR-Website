import { useState } from 'react'
import axios from 'axios'
import { BaseUrl } from '../../../../BaseUrl/BaseUrl'
import { showSuccess, showError } from '../../../utils/toast'

// ============================================================================
// 🎯 HOOK - ORDER ITEM REMOVAL API
// Handles deletion of items from orders via API
// ============================================================================

/**
 * 🗑️ USE_REMOVE_ORDER_ITEMS HOOK
 * Provides functionality to remove items from orders with loading state
 */
export const use_Remove_Order_Items = () => {
  // ==========================================================================
  // 🎯 LEVEL 1: STATE MANAGEMENT
  // ==========================================================================

  /** 🔄 Loading state for delete operations */
  const [isDeleting, setIsDeleting] = useState(false)

  // ==========================================================================
  // 🎯 LEVEL 1: API CALL FUNCTION
  // ==========================================================================

  /**
   * 📤 REMOVE ITEM FROM ORDER
   * Sends delete request to remove specific item from order
   * @param orderId - The ID of the order containing the item
   * @param itemId - The ID of the item to remove
   */
  const handleRemoveItem = async (orderId: string, itemId: string) => {
    try {
      setIsDeleting(true) // 🟡 Start loading

      // 🛰️ Send delete request to backend
      await axios.delete(
        `${BaseUrl}orders/delete-item`, // 🔗 API endpoint
        {
          data: { orderId, itemId },    // 📦 Delete payload
          withCredentials: true,        // 🍪 Include credentials
        }
      )

      showSuccess('Item deleted successfully!') // ✅ Success notification
      
    } catch (error: any) {
      // ❌ Error handling
      console.error('Error deleting item:', error)
      showError('Failed to delete item. Try again.') // 🚨 Error notification
    } finally {
      setIsDeleting(false) // 🔄 Stop loading
    }
  }

  // ==========================================================================
  // 🎯 LEVEL 1: RETURN FUNCTIONS & STATE
  // ==========================================================================

  return { 
    handleRemoveItem, 
    isDeleting 
  }
}