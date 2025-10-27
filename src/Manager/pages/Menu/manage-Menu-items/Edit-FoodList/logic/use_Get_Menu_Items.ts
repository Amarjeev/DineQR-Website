import axios from 'axios'
import { useState } from 'react'
import { type Status } from '../../../../../../ServerErrorUI/ServerError_UI'
import { BaseUrl } from '../../../../../../BaseUrl/BaseUrl'

// ✅ Type for menu items
export interface MenuItem {
  _id: string
  productName: string
  s3Url: string
  blurHash?: string
  hotelKey: string
}

export const use_Get_Menu_Items = () => {
  const [menuList, setMenuList] = useState<MenuItem[]>([])
  const [totalCount, setTotalCount] = useState<number>(0)
  const [status, setStatus] = useState<Status>('null')
  const [page, setPage] = useState<number>(1)
  const [loadMoreItems, setLoadMoreItems] = useState<number>(12)

  const handleFetchData = async (dishCategory: string) => {
    setStatus('loading')
    try {
      const response = await axios.get(
        `${BaseUrl}manager/menu-list/${dishCategory}?page=${page}`,
        { withCredentials: true }
        )
      const items = response?.data?.data

      if (page === 1) {
        setMenuList(items) // first page: replace
      } else {
        setMenuList((prev) => [...prev, ...items]) // subsequent pages: append
      }
      setTotalCount(response.data.count)

      setStatus('null') // Successfully loaded data
    } catch (error) {
      console.error('Error fetching menu list:', error)
      setStatus('error') // Server error
    }
  }

  const handleViewMore = () => {
    setPage((prev) => prev + 1)
    setLoadMoreItems((prev) => prev + 12)
  }

  return {
    handleFetchData,
    menuList,
    totalCount,
    status,
    handleViewMore,
    page,
    loadMoreItems,
  }
}
