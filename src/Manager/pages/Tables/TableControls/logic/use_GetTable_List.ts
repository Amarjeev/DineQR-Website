import { useState } from 'react'
import axios from 'axios'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'

export const use_GetTable_List = () => {
  // State to store table names array
  const [tableNames, setTableNames] = useState<any[]>([])
  // State to store total number of tables
  const [totalTables, setTotalTables] = useState<number>(0)
  // Optional: loading state
  const [loading, setLoading] = useState<boolean>(false)
  const [fetchError, setFetchError] = useState<boolean>(false)
  const [PageNumber, setPageNumber] = useState<number>(1)

  const fetchTableList = async (page: number = 1, limit: number = 20) => {
    try {
      setPageNumber(page)
      setLoading(true)
      const response = await axios.get(
        `${BaseUrl}manager/get/tableList?page=${page}&limit=${limit}`,
        { withCredentials: true }
      )

      // If page=1 overwrite, otherwise append
      if (page === 1) {
        setTableNames(response.data.tableNames || [])
      } else {
        setTableNames((prev) => [...prev, ...(response.data.tableNames || [])])
      }

      setTotalTables(response.data.totalTables || 0)
    } catch (err) {
      setFetchError(true)
      console.error('Error fetching table list:', err)
    } finally {
      setLoading(false)
    }
  }

  return {
    tableNames,
    setTableNames,
    totalTables,
    loading,
    fetchTableList,
    fetchError,
    PageNumber,
  }
}
