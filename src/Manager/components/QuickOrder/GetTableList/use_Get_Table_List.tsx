import { useCallback } from 'react'
import axios from 'axios'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'


export const use_Get_Table_List = () => {
  const handleFetchTableList = useCallback(async (role: string) => {
    try {
      const response = await axios.get(`${BaseUrl}${role}/get/table-list`, {
        withCredentials: true,
      })

      const tableList = response.data.tables || []
      //   const hotelKey = response.data.hotelKey || ''

      // ✅ Save tables in sessionStorage
      sessionStorage.setItem('tableList', JSON.stringify(tableList))

      // ✅ Return both hotelKey and tables
      return tableList
    } catch (error) {
      console.error('❌ Error fetching table list:', error)
      return []
    }
  }, [])

  return { handleFetchTableList }
}
