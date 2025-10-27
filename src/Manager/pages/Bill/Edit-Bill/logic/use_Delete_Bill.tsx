import axios from 'axios'
import { useState } from 'react'
import { showError } from '../../../../utils/toast'
import { useNavigate } from "react-router-dom"
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'

// Custom hook to handle deleting a bill for the manager
export const use_Delete_Bill = () => {
  // Track whether the delete operation is in progress
  const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false)

  // Hook to navigate programmatically after deletion
  const navigate = useNavigate()

  // Function to delete a bill
  const handleDelete = async () => {
    // 1️⃣ Ask for user confirmation before deleting
    const confirmed = window.confirm(
      'Are you sure you want to delete this bill?'
    )
    if (!confirmed) return // stop if user clicks Cancel

    try {
      setDeleteSuccess(true) // Start delete process

      // 2️⃣ Call the delete API
      await axios.post(
        `${BaseUrl}manager/delete/bill`,
        {}, // empty body for the request
        { withCredentials: true } // include cookies for authentication
      )

      // 3️⃣ Navigate back to the bill list after successful deletion
      navigate("/Manager-Dashboard/create/Bill")
    } catch (error: any) {
      // 4️⃣ Catch network or server errors
      console.error('Error deleting bill:', error)
      showError('Something went wrong while deleting the bill') // Show error toast
    } finally {
      setDeleteSuccess(false) // Reset delete flag
    }
  }

  // Return the delete function and delete status for component use
  return { handleDelete, deleteSuccess }
}
