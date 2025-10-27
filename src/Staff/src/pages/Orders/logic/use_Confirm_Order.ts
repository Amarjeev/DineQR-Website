import axios from 'axios'
import { showError, showSuccess } from '../../../utils/toast'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'

// ============================================================================
// 🎯 HOOK - ORDER CONFIRMATION API
// Handles order confirmation API calls and user feedback
// ============================================================================

/**
 * ✅ USE_CONFIRM_ORDER HOOK
 * Provides functionality to confirm orders via API
 */
export const use_Confirm_Order = () => {

  // ==========================================================================
  // 🎯 LEVEL 1: API CALL FUNCTION
  // ==========================================================================

  /**
   * 📤 CONFIRM ORDER API CALL
   * Sends confirmation request to backend and handles response
   * @param orderId - The ID of the order to confirm
   */
  const handle_ConfirmOrder_ApiCall = async (orderId: string) => {
    try {
      // Send confirmation request to backend
      await axios.post(
        `${BaseUrl}staff/orders/confirm-Order`, // 🔗 API endpoint
        { orderId },                            // 📦 Request payload
        { withCredentials: true }               // 🍪 Include credentials
      )

      showSuccess('Order confirmed successfully!') // ✅ Success notification
      
    } catch (error: any) {
      // ❌ Error handling
      console.error('Error confirming order:', error)
      showError('Failed to confirm order. Please try again.') // 🚨 Error notification
    }
  }

  // ==========================================================================
  // 🎯 LEVEL 1: RETURN API FUNCTION
  // ==========================================================================

  return { 
    handle_ConfirmOrder_ApiCall 
  }
}