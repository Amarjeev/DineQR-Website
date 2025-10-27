import React, { useEffect, useState } from 'react'
import Loading from '../../../../components/Loading/Mgr_Loading'
import { use_Delete_Bill } from '../logic/use_Delete_Bill'
import { use_Edit_Bill } from '../logic/use_Edit_Bill'
import { type BillData } from '../../Create-Bill/Validation/Validate_Bill'
import { use_Get_Bill } from '../logic/use_Get_Bill'
import ServerError_UI from '../../../../../../ServerErrorUI/ServerError_UI'

const Mgr_Edit_Bill_UI: React.FC = () => {
  // Type definition for the result returned by fetch operation
  type FetchBillResult = {
    error: boolean
    loading: boolean
  }

  // Custom hook to fetch bill data
  const { handleFetchBill, bill } = use_Get_Bill()

  // Custom hook to handle deletion of bill
  const { handleDelete, deleteSuccess } = use_Delete_Bill()

  // Custom hook to handle editing logic including form state, validation, and saving
  const {
    handleChange,
    formData,
    setFormData,
    handleSave,
    errors,
    originalData,
    setOriginalData,
    status,
    setStatus,
    editSuccess,
    isChanged,
    setIsChanged,
  } = use_Edit_Bill()

  // Local state to track whether the form is currently in edit mode
  const [isEditing, setIsEditing] = useState(false)

  // Effect to fetch bill data initially and when edit/delete actions succeed
  useEffect(() => {
    setIsChanged(true)
    const fetchData = async () => {
      if (!editSuccess) setStatus('loading') // Set loading state before fetching
      const { error, loading }: FetchBillResult = await handleFetchBill()
      if (!loading) setStatus('null') // Reset status if loading finished
      if (error) {
        setStatus('error') // Set error state if fetch fails
        return
      }
    }
    // Only fetch data if we are not in the middle of edit or delete success
    if (!editSuccess || !deleteSuccess) {
      fetchData()
    }
  }, [editSuccess, deleteSuccess])

  // Enable editing mode when edit button is clicked
  const handleEdit = () => {
    setIsEditing(true)
  }

  // Effect to populate form with fetched bill data
  useEffect(() => {
    if (bill) {
      const mappedData: BillData = {
        restaurantName: bill.restaurantName || '',
        address: bill.address || '',
        gstNumber: bill.gstNumber || '',
        contactNumber: bill.contactNumber || '',
      }
      setFormData(mappedData) // Set current form data
      setOriginalData(mappedData) // Store original data to allow cancel
    }
  }, [bill, setFormData])

  // Cancel editing and revert form to original data
  const handleCancel = () => {
    if (originalData) setFormData(originalData)
    setIsEditing(false)
  }

  // Conditional rendering based on loading or error state
  if (status === 'loading') return <Loading />
  if (status === 'error') return <ServerError_UI />

  return (
    <div className="max-w-lg mx-auto my-6 bg-white p-6 rounded-xl shadow-md">
      {bill ? (
        <>
          {/* Header + Delete Button Row */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Bill</h2>
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteSuccess} // disable while deleting
                title="Delete"
                className={`
    relative flex items-center justify-center px-4 py-2 text-xl rounded 
    transition-all duration-300 transform
    hover:scale-110
    ${deleteSuccess ? 'bg-red-400 cursor-not-allowed opacity-70' : 'bg-red-500 hover:bg-red-600'}
  `}
              >
                {deleteSuccess ? (
                  <div className="flex items-center space-x-2">
                    {/* Spinner */}
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      ></path>
                    </svg>
                    <span>Deleting...</span>
                  </div>
                ) : (
                  '🗑️ Delete'
                )}
              </button>
            )}
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Restaurant Name */}
            <div>
              <label className="block text-sm font-medium">
                Name of Restaurant/Hotel
              </label>
              <input
                type="text"
                name="restaurantName"
                value={formData.restaurantName}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 w-full border rounded-md px-3 py-2 text-sm transition ${
                  isEditing
                    ? 'border-yellow-400 bg-yellow-50 focus:ring-2 focus:ring-yellow-300'
                    : 'bg-gray-100 cursor-not-allowed'
                }`}
              />
              {errors?.restaurantName && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.restaurantName}
                </p>
              )}
            </div>

            {/* Full Address */}
            <div>
              <label className="block text-sm font-medium">
                Full Address (with PIN code)
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 w-full border rounded-md px-3 py-2 text-sm transition ${
                  isEditing
                    ? 'border-yellow-400 bg-yellow-50 focus:ring-2 focus:ring-yellow-300'
                    : 'bg-gray-100 cursor-not-allowed'
                }`}
              />
              {errors?.address && (
                <p className="text-red-600 text-xs mt-1">{errors.address}</p>
              )}
            </div>

            {/* GST Number */}
            <div>
              <label className="block text-sm font-medium">
                GSTIN (if registered)
              </label>
              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 w-full border rounded-md px-3 py-2 text-sm transition ${
                  isEditing
                    ? 'border-yellow-400 bg-yellow-50 focus:ring-2 focus:ring-yellow-300'
                    : 'bg-gray-100 cursor-not-allowed'
                }`}
              />
              {errors?.gstNumber && (
                <p className="text-red-600 text-xs mt-1">{errors.gstNumber}</p>
              )}
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium">
                Contact Number
              </label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                disabled={!isEditing}
                className={`mt-1 w-full border rounded-md px-3 py-2 text-sm transition ${
                  isEditing
                    ? 'border-yellow-400 bg-yellow-50 focus:ring-2 focus:ring-yellow-300'
                    : 'bg-gray-100 cursor-not-allowed'
                }`}
              />
              {errors?.contactNumber && (
                <p className="text-red-600 text-xs mt-1">
                  {errors.contactNumber}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-2 text-2xl">
              {!isEditing && (
                <button
                  type="button"
                  onClick={handleEdit}
                  title="Edit"
                  className="hover:scale-110 transition"
                >
                  ✏️
                </button>
              )}

              {isEditing && (
                <>
                  <button
                    type="submit"
                    title="Save"
                    disabled={editSuccess || isChanged}
                    onClick={handleSave}
                    className={`
      relative px-5 py-2 rounded-xl text-white font-semibold 
      transition-all duration-300 transform
      hover:scale-105 hover:shadow-lg
      ${editSuccess ? 'bg-green-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}
    `}
                  >
                    {editSuccess ? (
                      <div className="flex items-center space-x-2">
                        <svg
                          className="animate-spin h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                          ></path>
                        </svg>
                        <span>Saving...</span>
                      </div>
                    ) : (
                      <span>💾 Save</span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    title="Cancel"
                    className="hover:scale-110 transition"
                  >
                    ❌
                  </button>
                </>
              )}
            </div>
          </form>
        </>
      ) : (
        // ✅ Friendly message when bill is null
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg font-medium mb-2">
            Currently, you have no bill.
          </p>
          <p>Create a new one to get started!</p>
        </div>
      )}
    </div>
  )
}

export default Mgr_Edit_Bill_UI
