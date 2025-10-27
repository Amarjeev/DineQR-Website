import axios from 'axios'
import { useEffect, useState } from 'react'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'
import { showError } from '../../../utils/toast'

// ============================================================================
// 🧩 Type Definitions
// ============================================================================
export interface IMenuItem {
  _id: string
  hotelKey?: string
  productName: string
  availability: string
  foodCategory: string
  foodType: string
  blurHash?: string
  s3Url?: string
  isDeleted?: boolean
}

interface ApiResponse {
  success: boolean
  message: string
  data: IMenuItem[]
}

// ============================================================================
// 🎯 Hook: use_Get_MenuItems
// ============================================================================

export const use_Get_MenuItems = () => {
  // --------------------------------------------------------------------------
  // ⚙️ State: Selected category, status filter, and items
  // --------------------------------------------------------------------------
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    return sessionStorage.getItem('selectedCategory') || ''
  })
  const [statusFilter, setStatusFilter] = useState<string>('Available')
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [foodItems, setFoodItems] = useState<IMenuItem[]>([])
  
  // --------------------------------------------------------------------------
  // ⚙️ State: Loading, pagination, and infinite scroll
  // --------------------------------------------------------------------------
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>(1) // Pagination page
  const [hasMore, setHasMore] = useState<boolean>(true) // For infinite scroll

  // --------------------------------------------------------------------------
  // 🔄 Function: Fetch food items from API
  // --------------------------------------------------------------------------
  const fetchFoodList = async () => {
    try {
      setIsLoading(true) // Start loading indicator

      const response = await axios.get<ApiResponse>(
        `${BaseUrl}staff/get/menue-itemse/${selectedCategory}/${statusFilter}?page=${page}&limit=10`,
        { withCredentials: true }
      )

      const fetchedItems = response.data?.data || []

      // Append new items or replace if page 1
      if (page === 1) {
        setFoodItems(fetchedItems)
      } else {
        setFoodItems((prev) => [...prev, ...fetchedItems])
      }

      // Update hasMore for infinite scroll logic
      setHasMore(fetchedItems.length === 10)

      // Increment page for next fetch
      setPage((prev) => prev + 1)
    } catch (err: any) {
      console.error('Menu fetch error:', err)
      showError('Something went wrong, please try again')
    } finally {
      setIsLoading(false) // Stop loading indicator
    }
  }

  // --------------------------------------------------------------------------
  // 🔄 Effect: Reset items and page when category or status changes
  // --------------------------------------------------------------------------
  useEffect(() => {
    // Store selected category in session storage
    sessionStorage.setItem('selectedCategory', selectedCategory)

    // Reset infinite scroll
    setHasMore(true)

    if (selectedCategory && statusFilter) {
      // Clear previous items
      setFoodItems([])
      // Fetch fresh list
      fetchFoodList()
    }
  }, [selectedCategory, statusFilter])

  // --------------------------------------------------------------------------
  // 🔗 Return: States and functions for component usage
  // --------------------------------------------------------------------------
  return {
    selectedCategory,
    setSelectedCategory,
    statusFilter,
    setStatusFilter,
    foodItems,
    isLoading,
    selectedItem,
    setSelectedItem,
    setFoodItems,
    fetchFoodList,
    hasMore,
    setPage,
  }
}
