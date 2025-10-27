import { useCallback } from 'react'
import axios from 'axios'
import { BaseUrl } from '../../../../BaseUrl/BaseUrl'

/**
 * Represents a table item in the restaurant
 */
interface TableItem {
  name: string
}

/**
 * Custom hook to fetch and manage the list of tables for staff
 * Provides a function to retrieve tables from the API, sort them logically,
 * and store them in sessionStorage for quick access
 */
export const use_Get_Table_List = () => {
  /**
   * Fetches table list for a given staff role
   * @param role - User role (e.g., "staff")
   * @returns Sorted array of table names
   */
  const handleFetchTableList = useCallback(async (role: string) => {
    try {
      // API call to fetch table list
      const response = await axios.get(`${BaseUrl}${role}/get/table-list`, {
        withCredentials: true,
      })

      let tableList: TableItem[] = response.data.tables || []

      // ✅ Sort tables logically: A1, A2, ..., A10, B1, ...
      tableList = tableList.sort((a: TableItem, b: TableItem) => {
        const regex = /^([A-Z]+)(\d+)$/
        const [, letterA, numA] = a.name.match(regex) || []
        const [, letterB, numB] = b.name.match(regex) || []

        // Compare alphabetic part first
        if (letterA < letterB) return -1
        if (letterA > letterB) return 1

        // Compare numeric part if letters match
        return Number(numA) - Number(numB)
      })

      // ✅ Save sorted tables in sessionStorage for reuse
      sessionStorage.setItem('tableList', JSON.stringify(tableList))

      return tableList
    } catch (error) {
      console.error('❌ Error fetching table list:', error)
      return []
    }
  }, [])

  return { handleFetchTableList }
}
