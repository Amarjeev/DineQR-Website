import axios from 'axios'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'
import { showError, showSuccess } from '../../../utils/toast'

// ============================================================================
// 🎯 HOOK - ORDER REJECTION API
// Handles order rejection with reason via API
// ============================================================================

/**
 * 🚫 USE_REJECT_ORDER HOOK
 * Provides functionality to reject orders with specified reasons via API
 */
export const use_Reject_Order = () => {

  // ==========================================================================
  // 🎯 LEVEL 1: API CALL FUNCTION
  // ==========================================================================

  /**
   * 📤 REJECT ORDER API CALL
   * Sends rejection request with reason to backend and handles response
   * @param orderId - The ID of the order to reject
   * @param rejectionReason - The reason for rejecting the order
   */
  const handle_RejectOrder_ApiCall = async (
    orderId: string,
    rejectionReason: string
  ) => {
    try {
      // 🛰️ Send rejection request to backend
      await axios.post(
        `${BaseUrl}staff/orders/reject-Order`, // 🔗 API endpoint
        { orderId, rejectionReason },          // 📦 Rejection payload
        { withCredentials: true }              // 🍪 Include credentials
      )

      showSuccess('Order rejected successfully!') // ✅ Success notification
      
    } catch (error: any) {
      // ❌ Error handling
      console.error('Error rejecting order:', error)
      showError('Failed to reject order. Please try again.') // 🚨 Error notification
    }
  }

  // ==========================================================================
  // 🎯 LEVEL 1: RETURN API FUNCTION
  // ==========================================================================

  return { 
    handle_RejectOrder_ApiCall 
  }
}