import { useState } from 'react'
import axios from 'axios'
import { type Filters } from '../design/use_OrderHistory_TableLogic'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'

// ============================================================
// 🧾 TYPE DEFINITIONS
// ============================================================

// Portion of an item in an order
export interface Portion {
  portion: string
  price: number
  quantity: number
  subtotal: number
}

// Single item in an order
export interface OrderItem {
  _id: string
  name: string
  portions: Portion[]
}

// Full order structure
export interface Order {
  _id: string
  orderId: string
  orderType: string
  tableNumber?: string
  orderedBy: string
  orderedById: string
  hotelKey: string
  mobileNumber: string
  email: string
  items: OrderItem[]
  orderAccepted: boolean
  orderDelivered: boolean
  orderCancelled: boolean
  paymentStatus: boolean
  isDeleted: boolean
  createdAt: string
  kitchOrderCancelation?: boolean
  kitchOrdercancelationReason?: string
  orderCancelationReason?: string
}

// ============================================================
// 🧩 CUSTOM HOOK
// ============================================================
export const use_Get_OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]) // Stores fetched orders
  const [loading, setLoading] = useState(false) // Loading state
  const [page, setPage] = useState(1) // Track current page for pagination
  const [hasMore, setHasMore] = useState(false) // If more data exists for infinite scroll

  // ============================================================
  // 📡 INITIAL FETCH FUNCTION (RESETS DATA)
  // ============================================================
  const handle_Fetch_OrderHistory_ApiCall = async (filterItems: Filters) => {
    try {
      setLoading(true) // Start loader
      setPage(1) // Reset to first page for fresh fetch

      // Call API with filters, first page, and limit
      const response = await axios.get(`${BaseUrl}manager/get/orders-history`, {
        params: { ...filterItems, page: 1, limit: 20 }, // Pagination params
        withCredentials: true,
      })

      const fetchedOrders: Order[] = response.data?.data || [] // Orders array
      const arrayLength = response.data.totalCount // Total count returned by server

      setOrders(fetchedOrders) // Set orders in state

      // Determine if there are more orders to fetch
      // If total count > 20, there are more orders available
      setHasMore(arrayLength.length > 20)
    } catch (error: any) {
      console.error('Error fetching order history:', error)
      throw error.response?.data || { message: 'Unknown server error' }
    } finally {
      setLoading(false) // Stop loader
    }
  }

  // ============================================================
  // 📡 INFINITE SCROLL FETCH FUNCTION
  // ============================================================
  const handle_Fetch_MoreOrders = async (filterItems: Filters) => {
    if (!hasMore) return // Stop if no more data

    try {
      setLoading(true) // Start loader
      const nextPage = page + 1 // Increment page

      // Fetch next page of data
      const response = await axios.get(`${BaseUrl}manager/get/orders-history`, {
        params: { ...filterItems, page: nextPage, limit: 20 },
        withCredentials: true,
      })

      const fetchedOrders: Order[] = response.data?.data || []

      // Append new orders to existing ones
      setOrders((prev) => [...prev, ...fetchedOrders])

      setPage(nextPage) // Update current page
      setHasMore(fetchedOrders.length > 0) // If new data exists, keep hasMore true
    } catch (error: any) {
      console.error('Error fetching more orders:', error)
      setHasMore(false) // Stop further requests on error
    } finally {
      setLoading(false) // Stop loader
    }
  }

  // ============================================================
  // 🔄 RETURNED HOOK VALUES
  // ============================================================
  return {
    orders, // Array of orders
    loading, // Loading state
    hasMore, // If more orders can be fetched
    handle_Fetch_OrderHistory_ApiCall, // Initial fetch
    handle_Fetch_MoreOrders, // Infinite scroll fetch
  }
}
