import axios from 'axios'
import { useState } from 'react'
import { showError, showSuccess } from '../../../utils/toast'
import { BaseUrl } from '../../../../BaseUrl/BaseUrl'

// ============================================================================
// 🎯 TYPE DEFINITIONS
// ============================================================================

/**
 * 📊 UPDATED PORTIONS INTERFACE
 * Defines the structure for portion quantity updates
 * @example { full: 2, half: 1 }
 */
interface UpdatedPortions {
  [portionName: string]: number
}

/**
 * 📦 UPDATE ITEM PAYLOAD INTERFACE
 * Defines the payload structure for updating order items
 */
interface UpdateItemPayload {
  orderId: string
  itemId: string
  updatedPortions: UpdatedPortions
}

// ============================================================================
// 🎯 HOOK - ORDER EDITING API
// Handles order item quantity updates and management
// ============================================================================

/**
 * ✏️ USE_EDIT_ORDERS HOOK
 * Provides functionality to edit order item quantities via API
 */
export const use_Edit_Orders = () => {
  // ==========================================================================
  // 🎯 LEVEL 1: STATE MANAGEMENT
  // ==========================================================================

  /** 🔄 Loading state for save operations */
  const [isSaving, setIsSaving] = useState(false)

  // ==========================================================================
  // 🎯 LEVEL 1: API CALL FUNCTION
  // ==========================================================================

  /**
   * 📤 UPDATE ORDER ITEM QUANTITIES
   * Sends updated portion quantities to backend and handles response
   * @param payload - Contains orderId, itemId, and updated portion quantities
   */
  const handleUpdateEditData = async (payload: UpdateItemPayload) => {
    try {
      setIsSaving(true) // 🟡 Start loading

      // 🛰️ Send update request to backend
      await axios.put(
        `${BaseUrl}orders/update-item-quantities`, // 🔗 API endpoint
        payload,                                   // 📦 Update payload
        { withCredentials: true }                  // 🍪 Include credentials
      )

      showSuccess('Order updated successfully!') // ✅ Success notification
      
    } catch (error: any) {
      // ❌ Error handling
      console.error('Error updating order:', error)
      showError('Failed to update order. Please try again.') // 🚨 Error notification
    } finally {
      setIsSaving(false) // 🔄 Stop loading
    }
  }

  // ==========================================================================
  // 🎯 LEVEL 1: RETURN FUNCTIONS & STATE
  // ==========================================================================

  return { 
    handleUpdateEditData, 
    isSaving 
  }
}