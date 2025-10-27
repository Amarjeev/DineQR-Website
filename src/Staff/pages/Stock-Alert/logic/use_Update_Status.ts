import { useEffect, useState } from 'react'
import { BaseUrl } from '../../../../BaseUrl/BaseUrl'
import axios from 'axios'
import { showError, showSuccess } from '../../../utils/toast'

// ============================================================================
// 🎯 Hook: use_Update_Status
// 📝 Purpose: Update the status of a food item with API call, manage loading
// state, and provide toast notifications for success/error.
// ============================================================================
export const use_Update_Status = () => {
  // --------------------------------------------------------------------------
  // 🔹 State: Stores the ID and new status of the food item to be updated
  // --------------------------------------------------------------------------
  const [updateStatusData, setUpdateStatusData] = useState<{
    id: string
    status: string
  } | null>(null)

  // --------------------------------------------------------------------------
  // 🔹 State: Boolean flag to indicate if status update is in progress
  // --------------------------------------------------------------------------
  const [isStatusUpdating, setIsStatusUpdating] = useState(false)

  // --------------------------------------------------------------------------
  // 🔹 Effect: Trigger API call when updateStatusData changes
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleUpdateStatus = async () => {
      setIsStatusUpdating(true) // Start loading animation
      try {
        // 🔹 API Call to update food item status
        await axios.post(
          `${BaseUrl}staff/post/stock-alert/update-status/${updateStatusData?.id}/${updateStatusData?.status}`,
          {},
          { withCredentials: true }
        )

        showSuccess('Status updated successfully')
      } catch (error) {
        console.error('❌ Error updating status:', error)
        showError('Failed to update food item status')
      } finally {
        // 🔹 Reset state to avoid repeated triggers and stop loading
        setUpdateStatusData(null)
        setIsStatusUpdating(false)
      }
    }

    // ✅ Trigger update only if both id and status exist
    if (updateStatusData?.id && updateStatusData?.status) {
      handleUpdateStatus()
    }
  }, [updateStatusData])

  // --------------------------------------------------------------------------
  // 🔹 Return: Setter for status update, loading flag, and current update ID
  // --------------------------------------------------------------------------
  return { setUpdateStatusData, isStatusUpdating, updateStatusData }
}
