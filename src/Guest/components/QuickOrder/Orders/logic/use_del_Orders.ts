// ================================
// 📦 Imports
// ================================
import axios from 'axios'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'
import { showError, showSuccess } from '../../../../utils/toast'

// ================================
// 🚀 Hook: use_del_Orders
// ================================
/**
 * Custom hook for handling order deletion functionality
 * Provides API call to permanently delete guest orders
 */
export const use_del_Orders = () => {
  // --------------------------------
  // 🔹 Function: handle_del_Order_ApiCall
  // --------------------------------
  /**
   * Handles permanent deletion of a guest order by sending order ID to backend API
   * @param orderId - Unique identifier of the order to delete
   * @returns Promise<boolean | null> - Success status or null on failure
   */
  const handle_del_Order_ApiCall = async (orderId: string) => {
    try {
      // 📨 Send DELETE request to backend API
      // Note: Axios requires the data to be in the `data` field for DELETE requests
      await axios.delete(
        `${BaseUrl}guest/delete/guest-order`, // API endpoint for guest order deletion
        {
          data: { orderId }, // Order identifier payload
          withCredentials: true, // Include credentials for authentication
        }
      )

      // ✅ Show success notification to user
      showSuccess('Order deleted successfully')
      return true // Return success status

    } catch (error: any) {
      // ❌ Handle API or network errors
      console.error(
        '❌ Error deleting order:',
        error.response?.data || error.message // Log detailed error information
      )
      
      // 🚨 Show user-friendly error message
      showError('Something went wrong while deleting the order')
      return null // Return null to indicate failure
    }
  }

  // --------------------------------
  // 🔹 Return the API function
  // --------------------------------
  return { handle_del_Order_ApiCall }
}