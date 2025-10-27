import { useState, useCallback } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { type Status } from '../../../../../ServerErrorUI/ServerError_UI'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'

/**
 * Type representing a single food item
 */
export interface Foodtype {
  _id: string
  productName: string
  foodCategory: string
  availability: 'Available' | 'SoldOut' | 'ComingSoon'
  blurHash: string
  s3Url: string
  prices: {
    quarter: string
    half: string
    full: string
  }
}

/**
 * Custom hook: use_Get_Food_List
 * --------------------------------
 * Fetches a paginated list of food items for a specific dish category.
 * Handles loading, error states, infinite scrolling, and deduplication.
 */
export const use_Get_Food_List = () => {
  const { dishName } = useParams<{ dishName: string }>()
  
  const [foodList, setFoodList] = useState<Foodtype[]>([])
  const [status, setStatus] = useState<Status>('null')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [totalCount, setTotalCount] = useState(0)

  const pageSize = 12 // Number of items per request

  /**
   * Fetches food items from the API with pagination
   * Ensures deduplication and updates hasMore for infinite scrolling
   */
  const fetchFoodList = useCallback(async () => {
    if (!hasMore) return // Stop fetching if all items are loaded

    // Show loading indicator on initial fetch
    if (foodList.length === 0) setStatus('loading')

    try {
      const res = await axios.get(
        `${BaseUrl}guest/get/food-list/${dishName}?page=${page}&limit=${pageSize}`,
        { withCredentials: true }
      )

      const fetchedData: Foodtype[] = res.data.data || []
      const total: number = res.data.totalCount || 0

      setTotalCount(total)

      // If no data is returned, mark as complete
      if (fetchedData.length === 0) {
        setStatus('null')
        setHasMore(false)
        return
      }

      // Deduplicate and merge new items with existing list
      setFoodList((prev) => {
        const idSet = new Set(prev.map((item) => item._id))
        const uniqueItems = fetchedData.filter((item) => !idSet.has(item._id))
        const mergedList = [...prev, ...uniqueItems]

        // Disable further fetching if we have loaded all items
        if (mergedList.length >= total) setHasMore(false)

        return mergedList
      })

      setPage((prev) => prev + 1) // Prepare next page
      setStatus('null') // Reset status after fetch
    } catch (err: any) {
      console.error('Failed to fetch food list:', err)
      setStatus('error')
    }
  }, [dishName, page, hasMore, foodList.length])

  return {
    foodList,
    fetchFoodList,
    hasMore,
    status,
    totalCount,
  }
}
