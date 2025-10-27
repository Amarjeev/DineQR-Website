import React from 'react'
import {
  Clock,
  ChevronDown,
  ChevronUp,
  XCircle,
  Receipt,
  Trash2,
  Phone,
  AlertTriangle,
  RefreshCw,
  Loader,
  CreditCard,
} from 'lucide-react'

import { use_Orders_logic } from './use_Orders_logic'
import Loading from '../../../Loading/Guest_Loading'
import { handlePayment } from '../../../PaymentButton'

/* =======================
   Helper Functions
   ======================= */

/**
 * Safely extracts order ID from various order object structures
 * @param order - The order object
 * @returns Order ID as string
 */
const getOrderId = (order: any): string => {
  return order?.orderId || order?._id || 'unknown-id'
}

/**
 * Safely extracts creation date from various order structures
 * @param order - The order object
 * @returns Creation date as ISO string
 */
const getCreatedAt = (order: any): string => {
  return (
    order?.createdAt?.$date ||
    order?.createdAt ||
    order?.orderDate ||
    new Date().toISOString()
  )
}

/**
 * Safely extracts order items array
 * @param order - The order object
 * @returns Array of order items
 */
const getOrderItems = (order: any): any[] => {
  return order?.items || order?.orderItems || []
}

// Predefined cancellation reasons for guest orders
const CANCELLATION_REASONS = [
  'Change of plans',
  'Found a better alternative',
  'Order placed by mistake',
  'Delivery time too long',
  'Item unavailable',
  'Duplicate order',
  'Incorrect order details',
  'Price too high',
  'Other reason',
]

/* =======================
   Main Orders UI Component
   ======================= */
const Guest_Orders_UI: React.FC = () => {
  // Destructure logic functions and states from custom hook
  const {
    orders,
    expandedOrderId,
    showDeleteConfirm,
    showWarning,
    loading,
    toggleOrder,
    getOrderStatus,
    calculateTotal,
    handleDelete,
    canCancelOrder,
    getTimeSinceOrder,
    setShowDeleteConfirm,
    setShowWarning,
    refreshOrders,
    showCancelReason,
    selectedReason,
    handleCancelClick,
    handleReasonSubmit,
    handleCancelReason,
    setSelectedReason,
    cancelLoading,
  } = use_Orders_logic()

  /* =======================
     Loading State - Show loading spinner when no orders exist
     ======================= */
  if (loading && orders.length === 0) {
    return <Loading />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* =======================
            Header Section
            ======================= */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div className="flex items-center gap-3 mb-4 lg:mb-0">
            <div className="p-2 bg-red-50 rounded-lg">
              <Receipt className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
              <p className="text-gray-600 mt-1 text-sm">
                {orders.length} order{orders.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>

          {/* =======================
              Actions Section (Refresh Button)
              ======================= */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={refreshOrders}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50 shadow-sm hover:shadow-md"
            >
              <RefreshCw
                className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* =======================
            Information Banner - Important cancellation policy
            ======================= */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="p-1 bg-blue-100 rounded-full mt-0.5">
              <AlertTriangle className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-blue-800 font-medium">
                Important Note
              </p>
              <p className="text-sm text-blue-700 mt-1">
                Once your order is approved and cooking has started, you cannot
                cancel it online. Please contact our hotel staff directly for
                assistance with ongoing orders.
              </p>
            </div>
          </div>
        </div>

        {/* =======================
            Loading State for Existing Orders - Shows when refreshing with existing orders
            ======================= */}
        {loading && orders.length > 0 && (
          <div className="flex items-center justify-center mb-6 p-4 bg-white rounded-lg shadow-sm">
            <Loader className="w-5 h-5 animate-spin text-red-600 mr-3" />
            <span className="text-gray-600 font-medium">
              Updating orders...
            </span>
          </div>
        )}

        {/* =======================
            Orders Grid - Main container for order cards
            ======================= */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {orders.map((order) => {
            if (!order) return null

            const orderId = getOrderId(order)
            const status = getOrderStatus(order)
            const total = calculateTotal(order)
            const isExpanded = expandedOrderId === orderId
            const timeSinceOrder = getTimeSinceOrder(getCreatedAt(order))
            const items = getOrderItems(order)

            // Determine if cancel button should be hidden based on order status
            const hideCancelButton =
              order.orderCancelled ||
              order.kitchOrderCancelation ||
              order.orderAccepted ||
              order.orderDelivered ||
              order.paymentStatus === 'paid'

            return (
              <div
                key={orderId}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full"
              >
                {/* =======================
                    Order Header - Fixed Height Section
                    ======================= */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <div
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.color}`}
                        >
                          <XCircle className="w-4 h-4" />
                          {status.text}
                        </div>
                      </div>

                      <h2 className="font-bold text-gray-900 text-sm mt-3 mb-2">
                        Order #{orderId}
                      </h2>

                      {/* Order Table and Type Information */}
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <span className="text-gray-500">Table:</span>
                          <span className="font-semibold text-gray-700">
                            {order.tableNumber || 'N/A'}
                          </span>
                        </span>
                        <span className="text-gray-300">•</span>
                        <span className="flex items-center gap-1">
                          <span className="text-gray-500">Type:</span>
                          <span className="font-semibold text-gray-700 capitalize">
                            {order.orderType || 'unknown'}
                          </span>
                        </span>
                      </div>

                      {/* Order Time Information */}
                      <div className="flex items-center gap-2 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <p className="text-sm">{timeSinceOrder}</p>
                      </div>
                    </div>

                    {/* Expand/Collapse Button */}
                    <button
                      onClick={() => toggleOrder(orderId)}
                      className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors ml-2"
                      aria-label={
                        isExpanded ? 'Collapse order' : 'Expand order'
                      }
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* =======================
                      Action Buttons: Cancel & Delete
                      ======================= */}
                  <div className="flex items-center gap-2 mt-auto pt-4">
                    {/* Cancel Order Button - Conditionally rendered */}
                    {!hideCancelButton && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCancelClick(order)
                        }}
                        disabled={!canCancelOrder(order)}
                        className={`
                          flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium flex-1 justify-center
                          ${
                            canCancelOrder(order)
                              ? 'bg-red-500 text-white hover:bg-red-600 hover:shadow-md active:scale-95 shadow-sm'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                          }
                        `}
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel Order
                      </button>
                    )}

                    {/* Delete Order Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowDeleteConfirm(orderId)
                      }}
                      className="
                        flex items-center justify-center w-11 h-11 
                        rounded-lg transition-all duration-200
                        bg-gray-100 hover:bg-red-50 hover:text-red-600 
                        hover:shadow-md active:scale-95
                        text-gray-600 border border-gray-200 shadow-sm
                      "
                      title="Delete Order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* =======================
                    Expanded Content Section - Shows when order is expanded
                    ======================= */}
                <div
                  className={`border-t border-gray-100 transition-all duration-300 ${
                    isExpanded
                      ? 'max-h-[1000px] opacity-100'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 bg-gray-50">
                    {/* Cancellation Reason Display - Shows if order was cancelled by kitchen */}
                    {order?.kitchOrderCancelation && (
                      <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="text-red-800 font-medium text-sm mb-1">
                              Order Cancelled
                            </p>
                            <p className="text-red-700 text-sm">
                              <a className="text-black text-sm">Reason :</a>{' '}
                              {order?.kitchOrdercancelationReason ||
                                'Order cancelled by kitchen'}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wide">
                      Order Items
                    </h3>

                    {/* Order Items List */}
                    {items.length > 0 ? (
                      <div className="space-y-3">
                        {items.map((item, itemIndex) => (
                          <div
                            key={item._id || itemIndex}
                            className="flex justify-between items-start py-3 border-b border-gray-200 last:border-b-0"
                          >
                            <div className="flex-1">
                              <p className="text-gray-900 font-medium text-sm mb-2">
                                {item.name || 'Unnamed Item'}
                              </p>

                              {/* Portions & Pricing Details */}
                              {Array.isArray(item.portions) &&
                                item.portions.map((portion: any) => (
                                  <div
                                    key={portion?.portion}
                                    className="flex items-center justify-between text-sm text-gray-600 mb-1 last:mb-0"
                                  >
                                    <span className="text-gray-700">
                                      {portion.portion}
                                    </span>
                                    <div className="flex items-center gap-4">
                                      <span className="font-medium text-gray-900">
                                        ₹{portion.price || 0}
                                      </span>
                                      <span className="text-gray-400">×</span>
                                      <span className="font-medium text-gray-900">
                                        {portion.quantity || 0}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                            </div>
                            <span className="font-semibold text-gray-900 text-sm ml-4">
                              ₹
                              {Array.isArray(item.portions)
                                ? item.portions
                                    .reduce(
                                      (s: any, p: any) => s + (p.subtotal || 0),
                                      0
                                    )
                                    .toFixed(2)
                                : '0.00'}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm py-4 text-center">
                        No items in this order
                      </p>
                    )}

                    {/* Total Amount Section */}
                    <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-300">
                      <span className="font-semibold text-gray-900">
                        Total Amount
                      </span>
                      <span className="font-bold text-lg text-green-600">
                        ₹{total?.toFixed(2)}
                      </span>
                    </div>

                    {/* Payment Button - Shows for accepted, unpaid orders */}
                    {!order.orderCancelled &&
                      !order.kitchOrderCancelation &&
                      !order.paymentStatus &&
                      order.orderAccepted && (
                      <button
                        onClick={()=>handlePayment(orderId)}
                          className="
                            relative
                            w-full
                            bg-gradient-to-r from-blue-600 to-purple-600
                            hover:from-blue-700 hover:to-purple-700
                            active:from-blue-800 active:to-purple-800
                            text-white
                            font-semibold
                            py-3
                            rounded-xl
                            shadow-lg
                            hover:shadow-xl
                            transform
                            hover:scale-[1.02]
                            active:scale-[0.98]
                            transition-all
                            duration-200
                            ease-out
                            border-0
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-400
                            focus:ring-opacity-50
                            group
                            overflow-hidden
                            mt-3
                          "
                        >
                          {/* Payment Icon */}
                          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                            <div
                              className="
                                w-6 h-6
                                bg-white
                                rounded-lg
                                flex items-center justify-center
                                group-hover:scale-110
                                group-hover:rotate-12
                                transition-transform
                                duration-300
                                shadow-md
                              "
                            >
                              <CreditCard className="w-3 h-3 text-blue-600" />
                            </div>
                          </div>

                          {/* Button text */}
                          <span
                            className="
                              text-sm
                              font-bold
                              tracking-wide
                              ml-10
                            "
                          >
                            Pay ₹{total.toFixed(2)}
                          </span>

                          {/* Shimmer effect */}
                          <div
                            className="
                              absolute
                              inset-0
                              rounded-xl
                              bg-gradient-to-r
                              from-transparent
                              via-white
                              via-20%
                              to-transparent
                              opacity-0
                              group-hover:opacity-20
                              transition-opacity
                              duration-500
                              -skew-x-12
                              translate-x-[-100%]
                              group-hover:translate-x-[100%]
                              group-hover:duration-1000
                            "
                          ></div>
                        </button>
                      )}

                    {/* Payment Success Message */}
                    {order?.paymentStatus && (
                      <h1 className="text-2xl font-bold text-green-600 text-center animate-pulse">
                        Payment Successful! 🎉
                      </h1>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* =======================
            Empty State Section - Shows when no orders exist
            ======================= */}
        {orders.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="  p-8 max-w-md mx-auto shadow-sm borde">
              <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No orders found
              </h3>
              <p className="text-gray-500 mb-4">
                Your orders will appear here once you place them.
              </p>
              <button
                onClick={refreshOrders}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors mx-auto"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        )}

        {/* =======================
            Cancel Reason Modal - For selecting cancellation reason
            ======================= */}
        {showCancelReason && (
          <div className="fixed inset-0  bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-gray-900 rounded-xl p-6 max-w-md w-full shadow-xl">
              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-800 rounded-full">
                  <XCircle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Cancel Order
                </h3>
              </div>

              {/* Modal Description */}
              <p className="text-gray-300 mb-4">
                Please select a reason for cancellation:
              </p>

              {/* Reason Selection Options */}
              <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
                {CANCELLATION_REASONS.map((reason) => (
                  <label
                    key={reason}
                    className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg hover:bg-gray-800 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name="cancellationReason"
                      value={reason}
                      checked={selectedReason === reason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      className="w-4 h-4 text-red-500 focus:ring-red-500 bg-gray-800 border-gray-600"
                    />
                    <span className="text-sm text-gray-200">{reason}</span>
                  </label>
                ))}
              </div>

              {/* Modal Action Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleCancelReason}
                  disabled={cancelLoading}
                  className="px-4 py-2 text-gray-300 hover:text-white font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReasonSubmit}
                  disabled={!selectedReason || cancelLoading}
                  className={`
                    px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300
                    ${
                      selectedReason && !cancelLoading
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {cancelLoading && (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  )}
                  {cancelLoading ? 'Cancelling...' : 'Submit'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =======================
            Delete Confirmation Modal - Confirms order deletion
            ======================= */}
        {showDeleteConfirm && (
          <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-black rounded-xl p-6 max-w-sm w-full shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-50 rounded-full">
                  <Trash2 className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Delete Order
                </h3>
              </div>
              <p className="text-white mb-6">
                Are you sure you want to delete this order? This action cannot
                be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  disabled={cancelLoading}
                  className="px-4 py-2 text-white hover:text-red-800 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(showDeleteConfirm)}
                  disabled={cancelLoading}
                  className={`
                    px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2
                    bg-red-500 text-white hover:bg-red-600 active:scale-95 transition-all duration-200
                    ${cancelLoading ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                >
                  {cancelLoading && (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  )}
                  {cancelLoading ? 'Deleting...' : 'Delete Order'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =======================
            Warning Modal for Cooking Orders - Shows when order cannot be cancelled
            ======================= */}
        {showWarning && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-orange-50 rounded-full">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Order Cannot Be Cancelled
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Your order has been approved and is currently being prepared.
                For cancellation requests, please contact our hotel staff
                directly.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowWarning(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    console.log('Contact hotel staff')
                    setShowWarning(null)
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  Contact Staff
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Guest_Orders_UI
