import { useEffect, useState } from 'react'
import { showError } from '../../../../utils/toast'
import { use_GetTable_List } from '../logic/use_GetTable_List'
import { use_DeleteTable_List } from '../logic/use_DeleteTable_List'
import { use_SearchTable_List } from '../logic/use_SearchTable_List'
import { use_Table_Form } from '../../CreateTable/TableForm/logic/use_Table_Form'
import { use_RefreshTable_List } from '../logic/use_RefreshTable_List'

interface Table {
  _id: string
  name: string
}

export const use_Mgr_Edit_Table_logic = () => {
  const {
    fetchTableList,
    tableNames,
    setTableNames,
    totalTables,
    fetchError,
    loading,
    PageNumber,
  } = use_GetTable_List()

  const { handleDelete, isDeleting, deleteSuccess, setDeleteSuccess } =
    use_DeleteTable_List()
  const { handleSearchApiCall } = use_SearchTable_List()
  const { handleRefreshTable, isRefreshingTable } = use_RefreshTable_List()

  const {
    handleSave,
    setEditItemId,
    setEditedTableName,
    EditedtableName,
    isEditUploading,
    editError,
    editStatus,
    editAlertError,
    editSuccess,
    setExistName,
    isButtonDisabled,
    editIndex,
    setEditIndex,
    setEditSuccess,
  } = use_Table_Form()

  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [filteredTables, setFilteredTables] = useState<Table[]>(tableNames)

  useEffect(() => {
    fetchTableList(page)
  }, [page])

  useEffect(() => {
    setFilteredTables(tableNames)
  }, [tableNames])

  useEffect(() => {
    if (editSuccess || deleteSuccess) {
      setTableNames([])
      fetchTableList()
      setEditSuccess(false)
      setDeleteSuccess(false)
    }
  }, [editSuccess, deleteSuccess])

  useEffect(() => {
    if (editAlertError) showError(editAlertError)
  }, [editAlertError])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredTables(tableNames)
    } else {
      const filtered = tableNames?.filter((table) =>
        table.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredTables(filtered)
    }
  }, [searchTerm, tableNames])

  useEffect(() => {
    if (!searchTerm) return

    const handler = setTimeout(() => {
      const fetchData = async () => {
        try {
          if (filteredTables.length === 0) {
            const result = await handleSearchApiCall(searchTerm)
            setFilteredTables([result])
          }
        } catch (error: any) {
          if (error?.response?.status !== 404) {
            showError('Something went wrong, try again')
          }
        }
      }
      fetchData()
    }, 500)

    return () => clearTimeout(handler)
  }, [searchTerm, fetchTableList])

  const handleLoadMore = () => setPage((prev) => prev + 1)

  const handleEdit = (id: string, currentName: string) => {
    setEditIndex(id)
    setEditItemId(id)
    setEditedTableName(currentName)
    setExistName(currentName)
  }

  const handleCancel = () => setEditIndex('')

  return {
    // UI states
    loading,
    fetchError,
    totalTables,
    filteredTables,
    searchTerm,
    setSearchTerm,
    handleLoadMore,
    handleEdit,
    handleCancel,

    // Edit & Delete
    isDeleting,
    isEditUploading,
    handleDelete,
    handleSave,
    editError,
    EditedtableName,
    setEditedTableName,
    editIndex,
    isButtonDisabled,
    PageNumber,
    editStatus,
    handleRefreshTable,
    isRefreshingTable,
  }
}
