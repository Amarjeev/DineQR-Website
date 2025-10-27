import { useState } from 'react'
import { showError } from '../../../utils/toast'
import { use_Reject_Order } from '../../Orders/logic/use_Reject_Order'
import { use_confirm_Order_Delivered } from '../logic/use_confirm_Order_Delivered'
import { use_Get_pending_Orders } from '../logic/use_Get_pending_Orders'

// ============================================================================
// 🎯 TYPE DEFINITIONS
// ============================================================================

export interface IPortion {
  portion: string
  price: number
  quantity: number
  subtotal: number
}

export interface IItem {
  _id: string
  name: string
  portions: IPortion[]
}

export interface Order {
  _id: { $oid: string }
  hotelKey: string
  orderId: string
  orderedBy: 'staff' | 'manager' | 'guest'
  mobileNumber: string
  orderType: 'dining' | 'parcel'
  tableNumber?: string
  items: IItem[]
  orderAccepted: boolean
  orderCancelled: boolean
  paymentStatus: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export type OrderStatus = 'Preparing' | 'Cooking' | 'Ready' | 'Served'

export interface DisplayOrder {
  id: string
  orderId: string
  tableNumber: string
  orderDateTime: string
  orderType: 'Dine-in' | 'Parcel'
  status: OrderStatus
  mobileNo: string
  items: { name: string; price: number; quantity: number }[]
  totalAmount: number
  cookingStartTime: string
  estimatedReadyTime: string
  viewClickTime?: string
}

// ============================================================================
// 🎯 HOOK - APPROVED ORDERS MANAGEMENT
// Handles real-time approved orders data and operations
// ============================================================================

export const use_Approved_Orders = () => {
  // ==========================================================================
  // 🎯 LEVEL 1: STATE MANAGEMENT
  // ==========================================================================

  const [selectedOrder, setSelectedOrder] = useState<DisplayOrder | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState<string>('')
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [orderToReject, setOrderToReject] = useState<string>('')
  const [isRejecting, setIsRejecting] = useState<boolean>(false)
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<boolean>(false)
  const [clickedId, setClickedId] = useState<string | null>(null)

  const { handle_RejectOrder_ApiCall } = use_Reject_Order()
  const { handle_Confirm_Delivered_ApiCall } = use_confirm_Order_Delivered()
  const { orders, setOrders } = use_Get_pending_Orders()

  // ==========================================================================
  // 🎯 LEVEL 1: CONSTANTS
  // ==========================================================================

  const rejectionReasons = [
    'Out of ingredients',
    'Kitchen overloaded',
    'Item not available',
    'Technical issue',
    'Customer request',
    'Quality concerns',
    'Other reason',
  ]

  // ==========================================================================
  // 🎯 LEVEL 1: ORDER ACTIONS HANDLERS
  // ==========================================================================

  /**
   * 👁️ VIEW ORDER DETAILS
   * Opens modal with order details and tracks view time
   */
  const handleViewOrder = (order: DisplayOrder) => {
    const updatedOrder = { ...order, viewClickTime: new Date().toISOString() }
    setSelectedOrder(updatedOrder)
    setIsModalOpen(true)
    setOrders((prev) => prev.map((o) => (o.id === order.id ? updatedOrder : o)))
  }

  /**
   * ✅ MARK ORDER AS READY
   * Updates order status to 'Ready'
   */
  const handleReadyToServe = async (orderId: string) => {
    setClickedId(orderId)
    setIsUpdatingStatus(true)
    await handle_Confirm_Delivered_ApiCall(orderId)
    setIsUpdatingStatus(false)
     setIsModalOpen(false)
    setOrders((prev) => prev.filter((o) => o.orderId !== orderId))
  }

  const handleRejectOrder = (orderId: string) => {
    ;(setOrderToReject(orderId), setShowRejectModal(true))
  }

  /**
   * ✅ CONFIRM ORDER REJECTION
   * Processes order rejection with selected reason
   */
  const handleConfirmRejection = async () => {
    if (!rejectionReason) {
      showError('Please select a rejection reason')
      return
    }
    if (!orderToReject) {
      showError('Something went wrong. Please try again.')
      return
    }

    setIsRejecting(true)
    // Call the API to reject the order
    await handle_RejectOrder_ApiCall(orderToReject, rejectionReason)

    // Remove the rejected order from local state
    setOrders((prev) => prev.filter((o) => o.orderId !== orderToReject))

    // Reset modal and state
    setShowRejectModal(false)
    setRejectionReason('')
    setOrderToReject('')

    setIsRejecting(false)
  }

  /**
   * ↩️ CANCEL REJECTION PROCESS
   * Resets rejection state without action
   */
  const handleCancelRejection = () => {
    setShowRejectModal(false)
    setRejectionReason('')
    setOrderToReject('')
  }

  /**
   * 🚪 CLOSE ORDER MODAL
   * Resets modal and selected order state
   */
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedOrder(null)
  }

  // ==========================================================================
  // 🎯 LEVEL 1: UTILITY FUNCTIONS
  // ==========================================================================

  /**
   * 🎨 GET STATUS COLOR
   * Returns Tailwind classes for status badges
   */
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'Cooking':
        return 'bg-orange-100 text-orange-800'
      case 'Ready':
        return 'bg-green-100 text-green-800'
      case 'Served':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  /**
   * 🔣 GET STATUS ICON
   * Returns emoji icon for order status
   */
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'Cooking':
        return '👨‍🍳'
      case 'Ready':
        return '✅'
      case 'Served':
        return '🍽️'
      default:
        return '⏳'
    }
  }

  // ==========================================================================
  // 🎯 LEVEL 1: RETURN STATES & HANDLERS
  // ==========================================================================

  return {
    // 🔹 Data States
    orders,
    selectedOrder,

    // 🔹 UI States
    isModalOpen,
    showRejectModal,
    rejectionReason,

    // 🔹 Constants
    rejectionReasons,

    // 🔹 Action Handlers
    handleViewOrder,
    handleReadyToServe,
    // handleUpdateStatus,
    handleRejectOrder,
    handleConfirmRejection,
    handleCancelRejection,
    handleCloseModal,

    // 🔹 Utility Handlers
    getStatusColor,
    getStatusIcon,

    // 🔹 State Setters
    setRejectionReason,
    isRejecting,
    isUpdatingStatus,
    clickedId,
  }
}
