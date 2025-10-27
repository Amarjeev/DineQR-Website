import axios from 'axios'
import { BaseUrl } from '../../../../BaseUrl/BaseUrl'

interface UserInfo {
  userId: string
  hotelKey: string
  staffName: string
}

/**
 * use_GetUserInfo
 * ----------------
 * Custom hook to fetch and manage staff user information (userId, hotelKey, staffName).
 *
 * Responsibilities:
 * - Check sessionStorage for existing staff info.
 * - If missing, fetch staff info from the backend API based on role.
 * - Store fetched info in sessionStorage for future use.
 * - Return staff info as an object for use in dashboard components.
 *
 * Returns:
 * - fetch_UserId_hotelKey: async function - retrieves userId, hotelKey, and staffName
 */
export const use_GetUserInfo = () => {
  /**
   * fetch_UserId_hotelKey
   * ---------------------
   * Retrieves staff info from sessionStorage or backend API.
   * @param role - 'staff' or other roles to determine API endpoint
   * @returns Promise<UserInfo> - Contains userId, hotelKey, and staffName
   */
  const fetch_UserId_hotelKey = async (role: string): Promise<UserInfo> => {
    // =========================
    // Read from sessionStorage
    // =========================
    let fetchedUserId = sessionStorage.getItem('staff-userId') || ''
    let fetchedHotelKey = sessionStorage.getItem('DineQR_hotelKey') || ''
    let fetchedStaffName = sessionStorage.getItem('staff-userName') || ''

    // =========================
    // Fetch from API if missing
    // =========================
    if (!fetchedUserId || !fetchedHotelKey || !fetchedStaffName) {
      try {
        const response = await axios.get(`${BaseUrl}${role}/get/userId`, {
          withCredentials: true,
        })

        fetchedUserId = response.data.userId || ''
        fetchedHotelKey = response.data.hotelKey || ''
        fetchedStaffName = response.data.name || ''

        // Save fetched values to sessionStorage
        sessionStorage.setItem('staff-userId', fetchedUserId)
        sessionStorage.setItem('DineQR_hotelKey', fetchedHotelKey)
        sessionStorage.setItem('staff-userName', fetchedStaffName)
      } catch (err: any) {
        console.error('Error fetching userId/hotelKey:', err.message)
      }
    }

    // Return staff info
    return { userId: fetchedUserId, hotelKey: fetchedHotelKey, staffName: fetchedStaffName }
  }

  // Return fetch function for use in components
  return { fetch_UserId_hotelKey }
}
