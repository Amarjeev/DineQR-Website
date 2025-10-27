import axios from 'axios'
import { useState } from 'react'
import { BaseUrl } from '../../../../../../BaseUrl/BaseUrl'
import { showError } from '../../../../utils/toast'

// ✅ Custom hook for refreshing table list
export const use_RefreshTable_List = () => {
  // 🔄 Unique loading state name
  const [isRefreshingTable, setIsRefreshingTable] = useState(false)

  // ✅ Function: refresh table by page number
    const handleRefreshTable = async (PageNumber: number) => {
    try {
      setIsRefreshingTable(true) // Start loading

      await axios.post(
        `${BaseUrl}manager/refresh/table`,
        { PageNumber },
        { withCredentials: true }
      )
      window.location.reload() // Reload page to reflect updated data
    } catch (error) {
      console.error('❌ Error refreshing table list:', error)
      showError('Failed to refresh table list. Please try again.')
    } finally {
      setIsRefreshingTable(false) // Stop loading
    }
  }

  return { handleRefreshTable, isRefreshingTable }
}
