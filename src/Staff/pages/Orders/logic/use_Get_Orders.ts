import { useState, useEffect } from 'react'
import { socket } from '../../../config/Socket'
import { showError } from '../../../utils/toast'
import { type Status } from '../../../../ServerErrorUI/ServerError_UI'


// ============================================================================
// 🎯 TYPE DEFINITIONS
// ============================================================================

/**
 * 📊 PORTION INTERFACE
 * Defines the structure for meal portions
 */
export interface IPortion {
  portion: string // Portion type (e.g., full, half)
  price: number // Price of this portion
  quantity: number // Quantity ordered
  subtotal: number // Calculated subtotal
}

/**
 * 🍽️ ITEM INTERFACE
 * Defines the structure for menu items in an order
 */
export interface IItem {
  _id: string // Unique item identifier
  name: string // Item name
  portions: IPortion[] // Available portions
}

/**
 * 📦 ORDER INTERFACE
 * Defines the complete order structure
 */
export interface Order {
  _id: { $oid: string } // MongoDB document ID
  hotelKey: string // Hotel identifier
  orderId: string // Unique order ID
  orderedBy: 'staff' | 'manager' | 'guest' // Order origin
  mobileNumber: string // Customer contact
  email?: string //Email
  orderType: 'dining' | 'parcel' // Service type
  tableNumber?: string // Optional table number
  items: IItem[] // Ordered items
  orderAccepted: boolean // Acceptance status
  orderCancelled: boolean // Cancellation status
  paymentStatus: boolean // Payment status
  isDeleted: boolean // Soft delete flag
  createdAt: string // Order creation timestamp
  updatedAt: string // Last update timestamp
  __v: number // Version key
}

// ============================================================================
// 🎯 HOOK - ORDERS MANAGEMENT
// Handles real-time order fetching and state management via Socket.IO
// ============================================================================

/**
 * 📥 USE_GET_ORDERS HOOK
 * Manages order data with real-time updates through WebSocket connections
 */
export const use_Get_Orders = () => {
  // ==========================================================================
  // 🎯 LEVEL 1: STATE MANAGEMENT
  // ==========================================================================

  /** 📋 All orders list */
  const [orders, setOrders] = useState<Order[]>([])

  /** 🔍 Currently selected order for detailed view */
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  /** 📊 Data fetching status */
  const [status, setStatus] = useState<Status>('null')

  // ==========================================================================
  // 🎯 LEVEL 1: SOCKET.IO REAL-TIME COMMUNICATION
  // ==========================================================================

  useEffect(() => {
    // 🔐 Get hotel key for room identification
    const hotelKey = sessionStorage.getItem('DineQR_hotelKey') || ''

    if (!hotelKey) {
      showError('Something went wrong, please try again')
      return
    }

    // 🚪 Join hotel-specific room for order updates
    socket.emit('joinHotelOrdersChannel', hotelKey)

    // ==========================================================================
    // 🎯 LEVEL 2: SOCKET EVENT LISTENERS
    // ==========================================================================

    /**
     * 📥 INITIAL ORDERS LOAD
     * Receives complete order list on connection
     */
    const handleInitialOrders = (orderData: Order[]) => {
      setStatus('loading')
      setOrders(orderData)
      setStatus('null')
    }

    /**
     * 🆕 NEW ORDER NOTIFICATION
     * Adds new orders in real-time with duplicate protection
     */
    const handleNewOrder = (order: Order) => {
      setOrders((prev) => {
        // 🛡️ Prevent duplicate orders by ID
        if (prev.some((o) => o._id === order._id)) return prev
        return [order, ...prev] // 📥 Add new order to top
      })
    }

    /**
     * 🔌 CONNECTION ERROR HANDLER
     * Manages socket connection failures
     */
    const handleConnectionError = (err: Error) => {
      console.error('Connection error:', err.message)
      setStatus('error')
    }

    // ==========================================================================
    // 🎯 LEVEL 2: EVENT LISTENER REGISTRATION
    // ==========================================================================

    // 📡 Register socket event listeners
    socket.on('initialOrders', handleInitialOrders)
    socket.on('newOrder', handleNewOrder)
    socket.on('connect_error', handleConnectionError)

    // ==========================================================================
    // 🎯 LEVEL 1: CLEANUP FUNCTION
    // ==========================================================================

    return () => {
      // 🧹 Remove all event listeners on component unmount
      socket.off('initialOrders', handleInitialOrders)
      socket.off('newOrder', handleNewOrder)
      socket.off('connect_error', handleConnectionError)
    }
  }, []) // 🎯 Empty dependency array - run once on mount

  // ==========================================================================
  // 🎯 LEVEL 1: RETURN STATES & SETTERS
  // ==========================================================================

  return {
    // 🔹 Data States
    orders,
    selectedOrder,
    status,

    // 🔹 State Setters
    setOrders,
    setSelectedOrder,
  }
}
