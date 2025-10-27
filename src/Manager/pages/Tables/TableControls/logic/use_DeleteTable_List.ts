import axios from 'axios'
import { useState } from 'react'
import { BaseUrl } from '../../../../../../BaseUrl/BaseUrl'
import { showError, showSuccess } from '../../../../utils/toast'

// ✅ Custom hook for deleting a table
export const use_DeleteTable_List = () => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false)

  // Function: delete table by itemId
  const handleDelete = async (itemId: string, PageNumber?: number) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this table?'
    )
    if (!confirmDelete) return // Exit if user cance
    try {
      setIsDeleting(true) // 🔄 Start deleting state

      // ✅ API call to backend
      await axios.post(
        `${BaseUrl}manager/delete/table`,
        { itemId, PageNumber },
        { withCredentials: true }
      )
      setDeleteSuccess(true)

      showSuccess(`deleted successfully`)
    } catch (error) {
      // ❌ Handle error
      console.error('❌ Error deleting table:', error)
      showError('Failed to delete table. Please try again.')
    } finally {
      setIsDeleting(false) // 🔄 Reset state after success/failure
    }
  }

  return { handleDelete, isDeleting, deleteSuccess, setDeleteSuccess }
}
