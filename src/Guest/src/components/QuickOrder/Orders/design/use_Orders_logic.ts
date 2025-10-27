import { useEffect, useState, useCallback } from 'react'
import { use_get_Orders } from '../logic/use_get_Orders'
import { use_Cancel_Orders } from '../logic/use_Cancel_Orders'
import { use_del_Orders } from '../logic/use_del_Orders'

/* =======================
   Type Definitions
   ======================= */

/**
 * Represents a portion of an item with pricing and quantity
 */
export interface Portion {
  portion: string
  price: number
  quantity: number
  subtotal: number
}

/**
 * Represents an individual item in an order with multiple portions
 */
export interface Item {
  _id: string
  name: string
  portions: Portion[]
}

/**
 * Represents an entire order with all relevant properties
 */
export interface Order {
  _id: { $oid: string }
  orderId: string
  orderedBy: string
  orderType: string
  tableNumber: string
  items: Item[]
  orderCancelled: boolean
  orderAccepted: boolean
  kitchOrderCancelation: boolean
  orderDelivered: boolean
  paymentStatus: boolean
  createdAt: { $date: string }
  updatedAt: { $date: string }
}

/**
 * Possible status values for an order throughout its lifecycle
 */
export type OrderStatus =
  | 'pending'
  | 'cooking'
  | 'delivered'
  | 'paid'
  | 'cancelled'

/* =======================
   Custom Hook: use_Orders_logic
   ======================= */
export const use_Orders_logic = () => {
  /* =======================
     Local UI State Management
     ======================= */
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null) // Currently expanded order ID
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(
    null
  ) // Delete confirmation modal state
  const [showWarning, setShowWarning] = useState<string | null>(null) // General warning modal state
  const [cancelLoading, setCancelLoading] = useState(false) // Loading state for cancellation/deletion operations

  // Cancellation modal specific state
  const [showCancelReason, setShowCancelReason] = useState<string | null>(null) // Controls cancel reason modal visibility
  const [selectedReason, setSelectedReason] = useState<string>('') // User-selected cancellation reason
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(
    null
  ) // ID of order currently being cancelled

  /* =======================
     API Hook Integrations
     ======================= */
  const { handle_FetchOrders_ApiCall, orders, loading, setOrders } =
    use_get_Orders()
  const { handle_CancelOrder_ApiCall } = use_Cancel_Orders()
  const { handle_del_Order_ApiCall } = use_del_Orders()

  /* =======================
     Effect: Fetch Orders on Component Mount
     ======================= */
  useEffect(() => {
    handle_FetchOrders_ApiCall()
  }, [])

  /* =======================
     Order Status Calculation
     ======================= */
  const getOrderStatus = useCallback((order: Order) => {
    // Check order cancellation status first
    if (order.orderCancelled)
      return {
        text: 'You Cancelled',
        color: 'bg-red-100 text-red-700',
        icon: 'XCircle',
        type: 'cancelled' as OrderStatus,
      }
    
    // Check kitchen cancellation status
    if (order.kitchOrderCancelation)
      return {
        text: 'Hotel Rejected Your Order',
        color: 'bg-red-100 text-red-700',
        icon: 'XCircle',
        type: 'cancelled' as OrderStatus,
      }
    
    // Check pending approval status
    if (!order.orderAccepted)
      return {
        text: 'Awaiting Approval',
        color: 'bg-yellow-100 text-yellow-700',
        icon: 'Clock',
        type: 'pending' as OrderStatus,
      }
    
    // Check cooking status
    if (order.orderAccepted && !order.orderDelivered)
      return {
        text: 'Cooking',
        color: 'bg-orange-100 text-orange-700',
        icon: 'Loader',
        type: 'cooking' as OrderStatus,
      }
    
    // Check delivered but unpaid status
    if (order.orderDelivered && !order.paymentStatus)
      return {
        text: 'Delivered (Pending Payment)',
        color: 'bg-green-300 text-black',
        icon: 'CheckCircle',
        type: 'delivered' as OrderStatus,
      }
    
    // Check completed payment status
    if (order.paymentStatus)
      return {
        text: 'Payment Completed',
        color: 'bg-green-100 text-green-700',
        icon: 'CheckCircle',
        type: 'paid' as OrderStatus,
      }
    
    // Default fallback status
    return {
      text: 'Unknown',
      color: 'bg-gray-100 text-gray-600',
      icon: 'Clock',
      type: 'pending' as OrderStatus,
    }
  }, [])

  /* =======================
     Total Calculation Functions
     ======================= */
  const calculateTotal = useCallback(
    (order: Order) =>
      order?.items?.reduce(
        (sum, item) => sum + item?.portions?.reduce((s, p) => s + p?.subtotal, 0),
        0
      ),
    []
  )

  const calculateEditedTotal = useCallback(
    (items: Item[]) =>
      items.reduce(
        (sum, item) => sum + item.portions.reduce((s, p) => s + p.subtotal, 0),
        0
      ),
    []
  )

  /* =======================
     Event Handlers
     ======================= */

  /**
   * Toggle order details expansion/collapse
   * @param orderId - ID of order to toggle
   */
  const toggleOrder = useCallback(
    (orderId: string) =>
      setExpandedOrderId((current) => (current === orderId ? null : orderId)),
    []
  )

  /**
   * Delete an order with validation and API call
   * @param orderId - ID of order to delete
   */
  const handleDelete = async (orderId: string | null) => {
    if (!orderId) return
    
    // Find target order for validation
    const targetOrder = orders.find((order) => order.orderId === orderId)

    // Prevent deletion of orders that are cancelled, accepted, delivered, or paid
    if (
      targetOrder?.kitchOrderCancelation ||
      targetOrder?.orderAccepted ||
      targetOrder?.orderDelivered ||
      targetOrder?.paymentStatus
    )
      return

    setCancelLoading(true) // Show loading spinner during deletion
    const response = await handle_del_Order_ApiCall(orderId) // Call delete API
    setCancelLoading(false)
    
    if (!response) return // Exit if API call failed

    // ✅ Remove the deleted order from local state immediately for instant UI update
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.orderId !== orderId)
    )

    // Hide delete confirmation modal after successful deletion
    setShowDeleteConfirm(null)
  }

  /**
   * Check if an order can be cancelled based on its status
   * @param order - Order object to check
   * @returns Boolean indicating if order can be cancelled
   */
  const canCancelOrder = useCallback(
    (order: Order) => !order.orderAccepted || order.kitchOrderCancelation,
    []
  )

  /**
   * Calculate human-readable time since order was placed
   * @param orderDate - Order creation date string
   * @returns Formatted time string (e.g., "5m ago", "2h ago")
   */
  const getTimeSinceOrder = useCallback((orderDate: string) => {
    const orderTime = new Date(orderDate).getTime()
    const diff = Math.floor((Date.now() - orderTime) / 60000) // Difference in minutes
    
    if (diff < 1) return 'Just now'
    if (diff < 60) return `${diff}m ago`
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`
    return `${Math.floor(diff / 1440)}d ago`
  }, [])

  /**
   * Manually refresh orders by re-fetching from API
   */
  const refreshOrders = useCallback(() => {
    handle_FetchOrders_ApiCall()
  }, [handle_FetchOrders_ApiCall])

  /* =======================
     Cancellation Modal Handlers
     ======================= */

  /**
   * Handle cancel button click - opens cancellation modal
   * @param order - Order to be cancelled
   */
  const handleCancelClick = (order: Order) => {
    const orderId = getOrderId(order)
    setCancellingOrderId(orderId)
    setShowCancelReason(orderId) // Show cancel reason modal
    setSelectedReason('') // Reset selected reason for new cancellation
  }

  /**
   * Submit cancellation reason and process order cancellation
   */
  const handleReasonSubmit = async () => {
    if (selectedReason && cancellingOrderId) {
      setCancelLoading(true)
      const response = await handle_CancelOrder_ApiCall(
        selectedReason,
        cancellingOrderId
      )
      if (!response) return

      // ✅ Instantly update the cancelled order in UI for immediate feedback
      setOrders((prevOrders: Order[]) =>
        prevOrders.map((order) =>
          getOrderId(order) === cancellingOrderId
            ? {
                ...order,
                orderCancelled: true,
                orderCancelationReason: selectedReason, // Save cancellation reason
              }
            : order
        )
      )

      // Reset modal state after successful cancellation
      setShowCancelReason(null)
      setSelectedReason('')
      setCancellingOrderId(null)
      setCancelLoading(false)
    }
  }

  /**
   * Close cancellation modal without saving changes
   */
  const handleCancelReason = () => {
    setShowCancelReason(null)
    setSelectedReason('')
    setCancellingOrderId(null)
  }

  /* =======================
     Return Hook State & Handlers
     ======================= */
  return {
    orders,
    expandedOrderId,
    showDeleteConfirm,
    showWarning,
    loading,
    toggleOrder,
    getOrderStatus,
    calculateTotal,
    calculateEditedTotal,
    handleDelete,
    canCancelOrder,
    getTimeSinceOrder,
    setShowDeleteConfirm,
    setShowWarning,
    refreshOrders,
    showCancelReason,
    selectedReason,
    cancellingOrderId,
    handleCancelClick,
    handleReasonSubmit,
    handleCancelReason,
    setSelectedReason,
    cancelLoading,
  }
}

/* =======================
   Helper Function: getOrderId
   ======================= */

/**
 * Safely extracts order ID from various order object structures
 * @param order - Order object with potential ID variations
 * @returns Order ID as string, falls back to 'unknown-id'
 */
function getOrderId(order: any) {
  return order?.orderId || order?._id?.$oid || 'unknown-id'
}