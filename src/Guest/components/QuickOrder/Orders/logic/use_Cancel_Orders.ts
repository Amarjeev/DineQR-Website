// ================================
// 📦 Imports
// ================================
import axios from 'axios'
import { showError, showSuccess } from '../../../../utils/toast'
import { BaseUrl } from '../../../../../../BaseUrl/BaseUrl'

// ================================
// 🚀 Hook: use_Cancel_Orders
// ================================
/**
 * Custom hook for handling order cancellation functionality
 * Provides API call to cancel orders with reason tracking
 */
export const use_Cancel_Orders = () => {
  // --------------------------------
  // 🔹 Function: handle_CancelOrder_ApiCall
  // --------------------------------
  /**
   * Handles order cancellation by sending cancellation reason to backend API
   * @param selectedReason - User-selected reason for cancellation
   * @param cancellingOrderId - Unique identifier of the order to cancel
   * @returns Promise<boolean | null> - Success status or null on failure
   */
  const handle_CancelOrder_ApiCall = async (
    selectedReason: string,
    cancellingOrderId: string
  ) => {
    try {
      // 📨 Send POST request to cancel order endpoint
      await axios.post(
        `${BaseUrl}guest/orders/reject-Order`, // API endpoint for order rejection
        {
          orderId: cancellingOrderId, // Order identifier
          rejectionReason: selectedReason, // User-provided cancellation reason
        },
        { withCredentials: true } // Include credentials for authentication
      )
      
      // ✅ Show success notification to user
      showSuccess('Order cancelled successfully')
      return true // Return success status
      
    } catch (error: any) {
      // ❌ Handle API or network errors
      console.error(
        '❌ Error cancelling order:',
        error.response?.data || error.message // Log detailed error information
      )
      
      // 🚨 Show user-friendly error message
      showError('Something went wrong while cancelling the order')
      return null // Return null to indicate failure
    }
  }

  // --------------------------------
  // 🔹 Return the function
  // --------------------------------
  return { handle_CancelOrder_ApiCall }
}