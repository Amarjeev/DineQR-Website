import axios from 'axios'
import { useState } from 'react'
import { showError, showMessage } from '../../../../utils/toast'
import { useNavigate } from 'react-router-dom'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'

/**
 * ============================================================
 * Custom Hook: use_Verify_otp
 * ------------------------------------------------------------
 * Handles OTP verification by making a POST request to backend.
 * Manages errors, sets OTP error state, and navigates on success.
 * ============================================================
 */
export const use_Verify_otp = () => {
  // =========================
  // 🔹 Navigation & OTP Error State
  // =========================
  const navigate = useNavigate()
  const [otpError, setOtpError] = useState('')

  /**
   * 🔹 Function: handle_VerifyOtp_ApiCall
   * -------------------------------------
   * Verifies the OTP for a given mobile number and hotel key.
   *
   * @param mobile   - User's mobile number (without +91)
   * @param hotelKey - Unique hotel key
   * @param otp      - OTP entered by the user
   * @returns boolean | null - API success flag or null if failed
   */
  const handle_VerifyOtp_ApiCall = async (
    mobile: string,
    hotelKey: string,
    otp: string
  ) => {
    try {
      // =========================
      // 🔹 Validate Input
      // =========================
      if (!mobile || !hotelKey || !otp) {
        showMessage('Please provide both mobile number and hotel key')
        return null
      }

      // =========================
      // 🔹 Call Backend API
      // =========================
      const response = await axios.post(
        `${BaseUrl}auth/login/verify-otp`,
        {
          mobileNumber: `+91${mobile}`,
          hotelKey,
          otp,
        },
        {
          withCredentials: true,
        }
      )

      sessionStorage.removeItem('guest_mobile')
      sessionStorage.removeItem('login_step')
      sessionStorage.removeItem('otp_timer_expiry')

      // =========================
      // 🔹 Navigate on success
      // =========================
      navigate('/guest-dashboard', { replace: true })

      // =========================
      // 🔹 Return success flag
      // =========================
      return response.data.success
    } catch (error: any) {
      // =========================
      // 🔹 Handle Errors
      // =========================
      console.error('OTP Verification Error:', error)

      // 🔹 Invalid OTP (HTTP 401)
      if (error.response?.status === 401) {
        setOtpError('Invalid OTP')
        return null
      }

      // 🔹 Generic API/network error
      showError('Something went wrong')
      return null
    }
  }

  // =========================
  // 🔹 Return function and state
  // =========================
  return { handle_VerifyOtp_ApiCall, otpError, setOtpError }
}
