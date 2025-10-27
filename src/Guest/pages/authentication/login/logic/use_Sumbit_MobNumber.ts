import axios from 'axios'
import { showError, showMessage } from '../../../../utils/toast'
import { BaseUrl } from '../../../../../../BaseUrl/BaseUrl'

/**
 * ============================================================
 * Custom Hook: useSubmitMobNumber
 * ------------------------------------------------------------
 * Handles sending OTP to a user's mobile number via API.
 * Validates input, handles errors, and returns API response.
 * ============================================================
 */
export const use_Sumbit_MobNumber = () => {
  /**
   * 🔹 Function: handleSubmitMobNumber_ApiCall
   * ------------------------------------------------
   * Sends a POST request to backend to trigger OTP.
   *
   * @param mobile - User's mobile number (without +91)
   * @param hotelKey - Unique hotel identifier
   * @returns boolean | null - API success or null on failure
   */
  const handle_SubmitMobNumber_ApiCall = async (
    mobile: string,
    hotelKey: string
  ) => {
    // =========================
    // 🔹 Validate Inputs
    // =========================
    if (!mobile || !hotelKey) {
      showMessage('Please provide both mobile number and hotel key')
      return null
    }

    try {
      // =========================
      // 🔹 Call Backend API
      // =========================
      const response = await axios.post(`${BaseUrl}auth/login/send-otp`, {
        mobileNumber: `+91${mobile}`, // Ensure Indian format
        hotelKey,
      })

      // =========================
      // 🔹 Return success flag
      // =========================
      return response.data.success
    } catch (err: any) {
      // =========================
      // 🔹 Handle Errors
      // =========================
      console.error('API Error:', err)
      showError(err?.response?.data?.message || 'Failed to send OTP')
      return null
    }
  }

  // =========================
  // 🔹 Return Function
  // =========================
  return { handle_SubmitMobNumber_ApiCall }
}
