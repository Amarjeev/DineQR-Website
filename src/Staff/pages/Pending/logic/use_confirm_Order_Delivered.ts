import axios from 'axios'
import { BaseUrl } from '../../../../BaseUrl/BaseUrl'
import { showError, showSuccess } from '../../../utils/toast'

// ============================================================================
// 🎯 HOOK - ORDER DELIVERED CONFIRMATION API
// Handles marking orders as delivered
// ============================================================================

/**
 * ✅ use_confirm_Order_Delivered HOOK
 * Provides functionality to confirm orders as delivered via API
 */
export const use_confirm_Order_Delivered = () => {
  // ========================================================================
  // 📤 API CALL FUNCTION
  // ========================================================================

  /**
   * confirmOrderDeliveredApiCall
   * Sends request to backend to mark order as delivered
   * @param orderId - The ID of the order to confirm
   */
  const handle_Confirm_Delivered_ApiCall = async (orderId: string) => {
    try {
      await axios.post(
        `${BaseUrl}staff/orders/confirm/pending-Order`, // API endpoint
        { orderId }, // Request payload
        { withCredentials: true } // Include credentials
      )

      showSuccess('Order updated successfully!')
    } catch (error: any) {
      console.error('Error confirming order:', error)
      showError('Failed to pending - confirm order. Please try again.')
    }
  }

  // ========================================================================
  // 🧩 RETURN API FUNCTION
  // ========================================================================

  return { handle_Confirm_Delivered_ApiCall }
}
