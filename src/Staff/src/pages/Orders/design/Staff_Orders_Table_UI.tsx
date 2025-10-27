import React, { useEffect } from 'react'
import { use_Orders_TableLogic } from './use_Orders_TableLogic'
import ServerError_UI from '../../../../../ServerErrorUI/ServerError_UI'
import Staff_Loading from '../../../components/Loading/Staff_Loading'


// ================================
// ✅ Orders Table UI Component
// Displays pending orders and allows viewing, editing, and approving/rejecting orders
// ================================
const Staff_Orders_Table_UI: React.FC = () => {
  // 🔹 Destructure all functions and states from the custom hook
  const {
    orders,
    status,
    selectedOrder,
    isModalOpen,
    editingItem,
    editedQuantities,
    activeTab,
    deletingItemId,
    isSaving,
    isDeleting,
    handleViewOrder,
    handleCloseModal,
    handleConfirmOrder,
    handleEditItem,
    handleSaveEdit,
    handleCancelEdit,
    handleDeleteItem,
    handleQuantityChange,
    setActiveTab,
    calculateTotal,
    rejectSuccess,
    confirmSuccess,
    confirmedOrderId,
    rejectionReason,
    setRejectionReason,
    showRejectModal,
    setShowRejectModal,
    handleCancelRejection,
    handleRejectWithReason,
  } = use_Orders_TableLogic()

  // Rejection reasons
  const rejectionReasons = [
    'Out of ingredients',
    'Kitchen overloaded',
    'Item not available',
    'Technical issue',
    'Customer request',
    'Quality concerns',
    'Other reason',
  ]

  // ================================
  // 🔹 Helper: Format date and time
  // ================================
  type FormattedDateTime = {
    date: string
    time: string
    fullDateTime: string
  }

  const formatDateTime = (dateString: string): FormattedDateTime => {
    const date = new Date(dateString)

    const formattedDate = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })

    const formattedTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

    return {
      date: formattedDate,
      time: formattedTime,
      fullDateTime: `${formattedDate} ${formattedTime}`,
    }
  }

  // ================================
  // 🔹 Handle Loading and Error States
  // ================================
  if (status === 'loading') return <Staff_Loading />
  if (status === 'error') return <ServerError_UI />

  // ================================
  // 🔹 Main JSX
  // ================================
  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-red-50 to-red-100 px-4 sm:px-6 py-4 border-b border-red-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex flex-col sm:flex-row sm:items-center gap-2">
            <div className="flex items-center">
              <span className="bg-red-600 text-white rounded-lg px-3 py-1 mr-3 text-sm">
                New
              </span>
              Pending Orders
            </div>
            <span className="bg-red-500 text-white text-sm px-2 py-1 rounded-full self-start sm:self-auto">
              {orders.length} orders
            </span>
          </h2>
        </div>

        <div className="overflow-auto max-h-120 custom-scrollbar">
          {/* Mobile Card View */}
          <div className="sm:hidden">
            {orders.map((order, index) => (
              <div
                key={order.orderId}
                className="border-b border-gray-200 p-4 hover:bg-red-50 transition-colors duration-150"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="font-semibold text-gray-700">
                    #{index + 1}
                  </span>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {order.orderType}
                  </span>
                </div>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Table:</span>{' '}
                    {order.tableNumber || 'N/A'}
                  </p>
                  <p>
                    <span className="font-medium">Order ID:</span>{' '}
                    {order.orderId}
                  </p>
                  <p>
                    <span className="font-medium">Ordered By:</span>{' '}
                    {order.orderedBy}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span>{' '}
                    {formatDateTime(order.createdAt).time}
                  </p>
                </div>
                <div className="flex space-x-2 mt-3">
                  <button
                    onClick={() => handleViewOrder(order)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-xs"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleConfirmOrder(order.orderId)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-xs"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <table className="w-full hidden sm:table">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Table Number
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order Type
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Ordered By
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order Time
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr
                  key={order.orderId}
                  className="hover:bg-red-50 transition-colors duration-150"
                >
                  <td className="px-4 sm:px-6 py-4">{index + 1}</td>
                  <td className="px-4 sm:px-6 py-4">
                    {order.tableNumber || 'N/A'}
                  </td>
                  <td className="px-4 sm:px-6 py-4">{order.orderId}</td>
                  <td className="px-4 sm:px-6 py-4">{order.orderType}</td>
                  <td className="px-4 sm:px-6 py-4">{order.orderedBy}</td>
                  <td className="px-4 sm:px-6 py-4 text-sm">
                    {formatDateTime(order.createdAt).time}
                  </td>
                  <td className="px-4 sm:px-6 py-4 space-x-2 flex items-center">
                    {/* View Button */}
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-xs font-medium
               transition-all duration-200 transform hover:scale-105 active:scale-95 hover:shadow-md"
                    >
                      View
                    </button>

                    {/* Approve Order Button */}
                    <button
                      // disabled={rejectSuccess || confirmSuccess}
                      disabled={confirmedOrderId === order.orderId}
                      onClick={() => handleConfirmOrder(order.orderId)}
                      className={`bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-xs font-medium
                transition-all duration-300 transform hover:scale-105 active:scale-95 
                hover:shadow-[0_0_8px_rgba(34,197,94,0.6)] disabled:opacity-60
                ${confirmedOrderId === order.orderId ? 'animate-bounce' : ''}`}
                    >
                      {confirmedOrderId === order.orderId
                        ? 'Approved ✅'
                        : 'Approve'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-semibold text-gray-500">
              No Pending Orders
            </h3>
            <p className="text-gray-400 mt-1">New orders will appear here</p>
          </div>
        )}
      </div>

      {/* Order Modal - Without Black Background Overlay */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden flex flex-col border-2 border-gray-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-50 to-red-100 px-4 sm:px-6 py-4 border-b border-red-200 rounded-t-2xl flex justify-between items-center">
              <h3 className="text-lg font-bold text-gray-800">Order Details</h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>

            {/* Mobile Tabs */}
            <div className="sm:hidden border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('items')}
                  className={`flex-1 py-3 text-sm font-medium ${
                    activeTab === 'items'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Order Items
                </button>
                <button
                  onClick={() => setActiveTab('bill')}
                  className={`flex-1 py-3 text-sm font-medium ${
                    activeTab === 'bill'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Bill Summary
                </button>
              </div>
            </div>

            {/* Content with scroll */}
            <div className="flex-1 overflow-hidden flex flex-col sm:flex-row">
              {/* Order Items Section */}
              <div
                className={`flex-1 overflow-y-auto p-4 sm:p-6 ${
                  activeTab === 'items' ? 'block' : 'hidden sm:block'
                } ${window.innerWidth >= 640 ? 'border-r border-gray-200' : ''}`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                  <div className="space-y-1">
                    <p className="text-sm">
                      <strong>Order ID:</strong> {selectedOrder.orderId}
                    </p>
                    <p className="text-sm">
                      <strong>Ordered By:</strong> {selectedOrder.orderedBy}
                    </p>
                    <p className="text-sm">
                      <strong>Order Date:</strong>{' '}
                      {formatDateTime(selectedOrder.createdAt).date}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm">
                      <strong>Mobile:</strong> {selectedOrder.mobileNumber}
                    </p>
                   {selectedOrder?.email&& <p className="text-sm">
                      <strong>Email:</strong> {selectedOrder?.email}
                    </p>}
                    {selectedOrder.tableNumber && (
                      <p className="text-sm">
                        <strong>Table:</strong> {selectedOrder.tableNumber}
                      </p>
                    )}
                    <p className="text-sm">
                      <strong>Order Type:</strong> {selectedOrder.orderType}
                    </p>
                    <p className="text-sm">
                      <strong>Order Time:</strong>{' '}
                      {formatDateTime(selectedOrder.createdAt).time}
                    </p>
                  </div>
                </div>

                <h4 className="mt-4 font-semibold text-lg border-b pb-2">
                  Order Items
                </h4>

                <div className="overflow-y-auto max-h-64 sm:max-h-96 custom-scrollbar mt-2">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item._id}
                      className="border border-gray-200 rounded-lg p-3 sm:p-4 mb-3 bg-white shadow-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-semibold text-gray-800 text-sm sm:text-base">
                          {item.name}
                        </h5>
                        <div className="flex space-x-1 sm:space-x-2">
                          {editingItem !== item._id ? (
                            <>
                              <button
                                onClick={() => handleEditItem(item._id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs flex items-center justify-center min-w-12"
                                disabled={
                                  isDeleting && deletingItemId === item._id
                                }
                              >
                                Edit
                              </button>

                              <button
                                onClick={() => handleDeleteItem(item._id)}
                                disabled={
                                  isDeleting && deletingItemId === item._id
                                }
                                className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-2 py-1 rounded text-xs flex items-center justify-center min-w-12 transition-all duration-200"
                              >
                                {isDeleting && deletingItemId === item._id ? (
                                  <div className="flex items-center">
                                    <svg
                                      className="animate-spin -ml-1 mr-1 h-3 w-3 text-white"
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
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                      ></path>
                                    </svg>
                                    Deleting...
                                  </div>
                                ) : (
                                  'Remove'
                                )}
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() => handleSaveEdit(item._id)}
                                disabled={isSaving}
                                className={`bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs flex items-center justify-center ${
                                  isSaving
                                    ? 'opacity-70 cursor-not-allowed'
                                    : ''
                                }`}
                              >
                                {isSaving ? (
                                  <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-1"></span>
                                ) : null}
                                Save
                              </button>

                              <button
                                onClick={handleCancelEdit}
                                disabled={isSaving}
                                className="bg-gray-600 hover:bg-gray-700 text-white px-2 py-1 rounded text-xs"
                              >
                                Cancel
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {editingItem === item._id ? (
                        <div className="space-y-2 mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm font-medium text-gray-700">
                            Adjust Portions:
                          </p>
                          {item.portions.map((portion) => (
                            <div
                              key={portion.portion}
                              className="flex items-center justify-between"
                            >
                              <span className="text-sm capitalize">
                                {portion.portion}
                              </span>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item._id,
                                      portion.portion,
                                      (editedQuantities[item._id]?.[
                                        portion.portion
                                      ] || portion.quantity) - 1
                                    )
                                  }
                                  className="w-6 h-6 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center text-xs"
                                >
                                  -
                                </button>
                                <span className="w-8 text-center text-sm">
                                  {editedQuantities[item._id]?.[
                                    portion.portion
                                  ] || portion.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleQuantityChange(
                                      item._id,
                                      portion.portion,
                                      (editedQuantities[item._id]?.[
                                        portion.portion
                                      ] || portion.quantity) + 1
                                    )
                                  }
                                  className="w-6 h-6 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center text-xs"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-600">
                          {item.portions
                            .map((p) => `${p.portion} x${p.quantity}`)
                            .join(', ')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bill Section */}
              <div
                className={`w-full sm:w-80 bg-gray-50 p-4 sm:p-6 overflow-y-auto ${
                  activeTab === 'bill' ? 'block' : 'hidden sm:block'
                }`}
              >
                <h4 className="font-semibold text-lg border-b pb-2 mb-4">
                  Bill Summary
                </h4>

                <div className="space-y-3 mb-6 max-h-64 sm:max-h-96 overflow-y-auto">
                  {selectedOrder.items.map((item) => (
                    <div key={item._id} className="text-sm">
                      <div className="font-medium text-gray-800">
                        {item.name}
                      </div>
                      {item.portions.map((portion) => {
                        const quantity =
                          editedQuantities[item._id]?.[portion.portion] ||
                          portion.quantity
                        const price = portion.price || 0
                        return quantity > 0 ? (
                          <div
                            key={portion.portion}
                            className="flex justify-between text-gray-600 ml-2 text-xs sm:text-sm"
                          >
                            <span className="capitalize">
                              {portion.portion}
                            </span>
                            <span>
                              ₹{price} x {quantity} = ₹{price * quantity}
                            </span>
                          </div>
                        ) : null
                      })}
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    disabled={rejectSuccess || confirmSuccess}
                    onClick={() => handleConfirmOrder(selectedOrder.orderId)}
                    className={`w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-sm sm:text-base
    transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-60
    ${confirmSuccess ? 'animate-bounce' : ''}`}
                  >
                    {confirmSuccess ? 'Approved ✅' : 'Approve Order'}
                  </button>

                  <button
                    disabled={rejectSuccess || confirmSuccess} // disable while API is running
                    onClick={() => setShowRejectModal(true)}
                    className="w-full flex justify-center items-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold text-sm sm:text-base"
                  >
                    {/* Show spinner when API is running */}
                    {rejectSuccess && (
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
                          d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                        ></path>
                      </svg>
                    )}
                    {rejectSuccess ? 'Rejecting...' : 'Reject Order'}
                  </button>

                  <button
                    onClick={handleCloseModal}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold text-sm sm:text-base"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Reason Modal */}
      {showRejectModal && (
        <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="bg-gradient-to-r from-red-50 to-red-100 px-6 py-4 border-b border-red-200 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-800">
                  Reject Order
                </h3>
                <button
                  onClick={handleCancelRejection}
                  className="text-gray-500 hover:text-gray-700 text-xl"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-600">
                Please select a reason for rejecting this order:
              </p>

              <div className="space-y-2">
                {rejectionReasons.map((reason) => (
                  <label
                    key={reason}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="rejectionReason"
                      value={reason}
                      checked={rejectionReason === reason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="text-red-600 focus:ring-red-500"
                    />
                    <span className="text-sm text-gray-700">{reason}</span>
                  </label>
                ))}
              </div>

              {rejectionReason === 'Other reason' && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Please specify:
                  </label>
                  <input
                    type="text"
                    placeholder="Enter rejection reason..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    onChange={(e) => setRejectionReason(e.target.value)}
                  />
                </div>
              )}

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={handleRejectWithReason}
                  disabled={!rejectionReason}
                  className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Confirm Rejection
                </button>
                <button
                  onClick={handleCancelRejection}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Staff_Orders_Table_UI
