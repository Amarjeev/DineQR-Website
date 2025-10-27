import { useState } from 'react'
import axios from 'axios'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'

// Custom hook to fetch bill data for the manager
export const use_Get_Bill = () => {
  // State to store the fetched bill data
  const [bill, setBill] = useState<any>(null)

  // Function to fetch bill data from the backend
  const handleFetchBill = async () => {
    try {
      // Sending GET request to fetch bill, including credentials for authentication
      const response = await axios.get(`${BaseUrl}manager/create/bill`, {
        withCredentials: true,
      })

      // Set the fetched bill data in state
      setBill(response.data.bill)

      // Return success status
      return { error: false, loading: false }
    } catch (error: any) {
      // Log error to console for debugging
      console.error('Error fetching bill:', error)

      // Handle 404 separately: no bill found is not treated as a full error
      if (error.response?.status === 404) {
        // Optionally, you could show a toast or message here
        // showError('No bill found for this hotel.')
        return { error: false, loading: false }
      } else {
        // For other errors, indicate failure and loading state
        return { error: true, loading: true }
      }
    }
  }

  // Return the bill state and the fetch function to be used in components
  return { bill, handleFetchBill }
}
