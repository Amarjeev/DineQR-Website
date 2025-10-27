import { useState, useEffect } from 'react'
import { socket } from '../../../../config/socket'
import { showError } from '../../../../utils/toast'

/**
 * Custom hook for managing guest orders with real-time updates
 * Handles fetching initial orders and listening for live updates via socket
 */
export const use_get_Orders = () => {
  // State for storing orders and loading status
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  /**
   * Fetches initial orders for the guest user
   * Joins hotel-specific socket room for real-time order updates
   */
  const handle_FetchOrders_ApiCall = () => {
    // Retrieve user and hotel identifiers from session storage
    const userId = sessionStorage.getItem('guest-userId') || ''
    const hotelKey = sessionStorage.getItem('hotelKey') || ''

    // Validate required identifiers
    if (!userId || !hotelKey) {
      return showError('Something went wrong')
    }

    setLoading(true)

    // 🚪 Join hotel-specific room for order updates via socket
    socket.emit('joinHotelGuestOrdersChannel', { hotelKey, userId })

    // Listen for initial orders response from server
    socket.once('initialGuestOrders', (data: any) => {
      setOrders(data)
      setLoading(false)
      // console.log('✅ Orders fetched successfully:', data)
    })
  }

  /**
   * Effect: Set up real-time order updates via socket
   * Listens for order updates and maintains order list
   */
  useEffect(() => {
    const userId = sessionStorage.getItem('guest-userId') || ''
    const hotelKey = sessionStorage.getItem('hotelKey') || ''
    
    // Exit if required identifiers are missing
    if (!userId || !hotelKey) return

    /**
     * Handler for real-time order updates
     * @param updatedOrders - Updated order data from server
     */
    const handleUpdate = (updatedOrders: any) => {
      // setOrders(updatedOrders)
      console.log('live updates :', updatedOrders)
      
      // Update orders state by replacing existing order with updated version
      setOrders((prevOrders) => {
        // Remove old version of this order (if exists)
        const filtered = prevOrders.filter(
          (order) => order.orderId !== updatedOrders.orderId
        )
        // Add updated version at the top (or bottom)
        return [updatedOrders, ...filtered]
      })
    }

    // Subscribe to order update events
    socket.on('updateGuestOrders', handleUpdate)

    // Cleanup: Unsubscribe from socket events when component unmounts
    return () => {
      socket.off('updateGuestOrders', handleUpdate)
    }
  }, []) // Empty dependency array - effect runs only on mount/unmount

  // Return state and functions for external use
  return { handle_FetchOrders_ApiCall, orders, loading, setOrders }
}