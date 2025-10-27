import axios from 'axios'
import { showError } from '../../../utils/toast'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'

export const use_Notification_Update = () => {
  // ==============================================
  // 🧩 NOTIFICATION STATUS UPDATE API CALL
  // ==============================================
  
  // Handles API call to update notification status
  // itemId: ID of the notification to update
  // actionStatus: The new status to apply to the notification
  const handle_Notification_Action_ApiCall = async (
    itemId: string,
    actionStatus: string
  ) => {
    try {
      // Make POST request to update notification status
      // Empty object as second parameter for request body
      // withCredentials: true to include cookies in request
      await axios.post(
        `${BaseUrl}manager/${itemId}/${actionStatus}/update/notification-status`,
        {},
        { withCredentials: true }
      )
    } catch (error) {
      // ==============================================
      // 🧩 ERROR HANDLING
      // ==============================================
      
      // Log detailed error for debugging
      console.error('Error updating notification status:', error)
      // Show user-friendly error message
      showError('Failed to update notification status, please try again')
    }
  }

  // ==============================================
  // 🧩 RETURN EXPOSED FUNCTIONS
  // ==============================================
  
  return { handle_Notification_Action_ApiCall }
}