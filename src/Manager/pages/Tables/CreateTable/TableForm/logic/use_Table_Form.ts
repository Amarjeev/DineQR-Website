import axios from 'axios'
import { useEffect, useState } from 'react'
import { showError, showSuccess } from '../../../../../utils/toast'
import { type Status } from '../../../../../../ServerErrorUI/ServerError_UI'
import { BaseUrl } from '../../../../../../BaseUrl/BaseUrl'

/**
 * Hook: useMgrTableform
 * ----------------------
 * A custom hook to manage the Manager Table creation and editing form.
 * Handles state, validation, API calls, and error handling for tables.
 */
export const use_Table_Form = () => {
  // =========================
  // Creation Section States
  // =========================
  const [createdTableName, setCreatedTableName] = useState<string>('') // Stores new table name
  const [error, setError] = useState<string>('') // Stores creation errors
  const [status, setStatus] = useState<Status>('null') // Tracks creation API status
  const [isUploading, setIsUploading] = useState<boolean>(false) // Tracks creation API progress

  // =========================
  // Editing Section States
  // =========================
  const [EditedtableName, setEditedTableName] = useState<string>('') // Edited table name
  const [editItemId, setEditItemId] = useState<string>('') // ID of table being edited
  const [editError, setEditError] = useState<string>('') // Validation or API errors while editing
  const [editAlertError, setEditAlertError] = useState<string>('') // Alerts during editing
  const [editStatus, setEditStatus] = useState<Status>('null') // Tracks editing API status
  const [isEditUploading, setIsEditUploading] = useState<boolean>(false) // Editing API in progress
  const [editSuccess, setEditSuccess] = useState<boolean>(false)
  const [ExistName, setExistName] = useState<string>('')
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
  const [editIndex, setEditIndex] = useState<string>('')

  useEffect(() => {
    setIsButtonDisabled(false)
  }, [EditedtableName])

  // =========================
  // Function: handleSave
  // -------------------------
  // Handles both creation and editing of tables.
  // Performs validation, API calls, and error handling.
  // =========================
  const handleSave = async (action: string ,PageNumber?:number) => {
    const tableName = createdTableName || EditedtableName


 // ✅ Put this inside your component (before return)
if (action !== "upload") {
  if (
    ExistName.toLowerCase().trim() === EditedtableName.toLowerCase().trim()
  ) {
    setIsButtonDisabled(true);
    return;
  } else {
    setIsButtonDisabled(false);
  }
}

    // -------------------------
    // Validation
    // -------------------------
    const validNameRegex = /^[A-Za-z0-9]+$/
    if (!tableName) {
      setError('Table name is required')
      return
    }
    if (!validNameRegex.test(tableName)) {
      setError('Only letters and digits are allowed')
      return
    }
    if (tableName.length > 6) {
      setError('Maximum 6 characters allowed')
      return
    }
    setError('') // Clear previous errors

    // -------------------------
    // API Request
    // -------------------------
    try {
      if (action === 'upload') {
        // Creation API
        setIsUploading(true)
        const response = await axios.post(
          `${BaseUrl}manager/create/table`,
          { tableName },
          { withCredentials: true }
        )
        if (response.data.success) {
          showSuccess('Table added successfully!')
          setCreatedTableName('')
          return
        }
      } else {
        // Editing API
        setIsEditUploading(true)

        const response = await axios.patch(
          `${BaseUrl}manager/edit/table`,
          { tableName, editItemId ,PageNumber},
          { withCredentials: true }
        )
        if (response.data.success) {
           setEditSuccess(true)
          setEditIndex('')
          setEditAlertError('')
          setEditError('')
          setIsEditUploading(false)
          return
        }
      }
    } catch (error: unknown) {
      // -------------------------
      // Error Handling
      // -------------------------
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              showError('Invalid request. Please check your input.')
              action === 'Edit' &&
                setEditAlertError('Invalid request. Please check your input.')
              break
            case 409:
              setError(
                'Table name already exists. Please choose a different name.'
              )
              action === 'Edit' &&
                setEditError(
                  'Table name already exists. Please choose a different name.'
                )
              break
            case 500:
              setStatus('error')
              action === 'Edit' && setEditStatus('error')
              break
            default:
              showError('Something went wrong. Please try again.')
              action === 'Edit' &&
                setEditAlertError('Something went wrong. Please try again.')
          }
        } else {
          setError('Network error. Please check your connection.')
          action === 'Edit' &&
            setEditAlertError('Network error. Please check your connection.')
        }
      }
    } finally {
      setIsUploading(false)
      setIsEditUploading(false)
    }
  }

  // =========================
  // Return Object
  // -------------------------
  // Expose state and handler functions for components
  // =========================
  return {
    createdTableName,
    setCreatedTableName,
    error,
    status,
    isUploading,
    EditedtableName,
    setEditedTableName,
    editItemId,
    setEditItemId,
    editError,
    editAlertError,
    editStatus,
    isEditUploading,
    setIsEditUploading,
    handleSave,
    editSuccess,
    ExistName,
    setExistName,
    isButtonDisabled,
    editIndex,
    setEditIndex,
    setEditSuccess
  }
}
