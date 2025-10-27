import axios from 'axios'
import {BaseUrl} from '../../../../../../BaseUrl/BaseUrl'
import { useNavigate } from 'react-router-dom'
import { showError } from '../../../../utils/toast'

/**
 * use_Logout
 * ----------
 * Custom hook to handle staff logout functionality.
 * 
 * Responsibilities:
 * - Call the logout API endpoint to terminate the session on the server.
 * - Clear all sessionStorage data on successful logout.
 * - Redirect the user to the login page.
 * - Handle errors gracefully and show user-friendly messages.
 * 
 * Returns:
 * - handle_Logout_ApiCall: function - triggers the logout process
 */
export const use_Logout = () => {
  const navigate = useNavigate()

  /**
   * handle_Logout_ApiCall
   * --------------------
   * Performs the logout process:
   * 1. Calls the logout API.
   * 2. Clears session storage.
   * 3. Redirects to login page.
   * 4. Handles errors and displays toast messages if logout fails.
   */
  const handle_Logout_ApiCall = async () => {
    try {
      // Call the logout API endpoint
      await axios.post(`${BaseUrl}staff/Logout`, {}, { withCredentials: true })

      // Clear all session data from the browser
      sessionStorage.clear()

      // Redirect staff to the login page after successful logout
      navigate('/staff/login')
    } catch (err: any) {
      // Log error to console and show user-friendly error message
      console.error('Logout failed:', err?.response?.data?.message || err.message || err)
      showError('Logout failed. Please try again.')
    }
  }

  // Return the logout function for UI components to use
  return { handle_Logout_ApiCall }
}
