import { use_Approved_Orders } from './use_Approved_Orders'

// ============================================================================
// 🎯 COMPONENT - APPROVED ORDERS TABLE UI
// ============================================================================

const Staff_ApprovedOrdersTable: React.FC = () => {
  // ==========================================================================
  const {
    orders,
    selectedOrder,
    isModalOpen,
    showRejectModal,
    rejectionReason,
    rejectionReasons,
    handleViewOrder,
    handleReadyToServe,
    handleRejectOrder,
    handleConfirmRejection,
    handleCancelRejection,
    handleCloseModal,
    getStatusColor,
    getStatusIcon,
    setRejectionReason,
    isRejecting,
    isUpdatingStatus,
    clickedId,
  } = use_Approved_Orders()

  // ==========================================================================
  return (
    <>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 sm:px-6 py-4 border-b border-green-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center mb-2 sm:mb-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center">
                <span className="bg-green-600 text-white rounded-lg px-2 sm:px-3 py-1 mr-2 sm:mr-3 text-xs sm:text-sm">
                  Approved
                </span>
                Kitchen Orders
              </h2>
              <span className="ml-2 sm:ml-3 bg-green-500 text-white text-xs sm:text-sm px-2 py-1 rounded-full">
                {orders.length} orders
              </span>
            </div>
            <p className="text-xs sm:text-sm text-gray-600">
              Track cooking progress and manage orders
            </p>
          </div>
        </div>

        <div className="overflow-auto max-h-120 custom-scrollbar">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Table
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order Time
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <OrderTableRow
                  key={`${order.id}-${index}`}
                  order={order}
                  index={index}
                  onViewOrder={handleViewOrder}
                  onRejectOrder={handleRejectOrder}
                  onReadyToServe={handleReadyToServe}
                  onUpdateStatus={handleReadyToServe}
                  getStatusColor={getStatusColor}
                  getStatusIcon={getStatusIcon}
                  isUpdatingStatus={isUpdatingStatus}
                  clickedId={clickedId}
                />
              ))}
            </tbody>
          </table>
        </div>

        {orders.length === 0 && <EmptyOrdersState />}
      </div>

      {isModalOpen && selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={handleCloseModal}
          onReadyToServe={handleReadyToServe}
          onUpdateStatus={handleReadyToServe}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
          isUpdatingStatus={isUpdatingStatus}
          clickedId={clickedId}
        />
      )}

      {showRejectModal && (
        <RejectionModal
          rejectionReason={rejectionReason}
          rejectionReasons={rejectionReasons}
          onReasonChange={setRejectionReason}
          onConfirm={handleConfirmRejection}
          onCancel={handleCancelRejection}
          isRejecting={isRejecting}
        />
      )}
    </>
  )
}

// ============================================================================
// 🎯 ORDER TABLE ROW COMPONENT
// ============================================================================

interface OrderTableRowProps {
  order: any
  index: number
  onViewOrder: (order: any) => void
  onRejectOrder: (orderId: string) => void
  onReadyToServe: (orderId: string) => void
  onUpdateStatus: (orderId: string, status: any) => void
  getStatusColor: (status: any) => string
  getStatusIcon: (status: any) => string
  isUpdatingStatus: boolean
  clickedId: string | null
}

const OrderTableRow: React.FC<OrderTableRowProps> = ({
  order,
  index,
  onViewOrder,
  onRejectOrder,
  onReadyToServe,
  onUpdateStatus,
  getStatusColor,
  getStatusIcon,
  isUpdatingStatus,
  clickedId
}) => (
  <tr className="hover:bg-green-50 transition-colors duration-150">
    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900 bg-gray-100 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center">
        {index + 1}
      </div>
    </td>
    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
      <div className="text-xs sm:text-sm font-mono font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
        {order.orderId}
      </div>
    </td>
    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center mr-2 sm:mr-3 ${
            order.orderType === 'Dine-in' ? 'bg-green-100' : 'bg-orange-100'
          }`}
        >
          <span
            className={`font-bold text-xs sm:text-sm ${
              order.orderType === 'Dine-in'
                ? 'text-green-600'
                : 'text-orange-600'
            }`}
          >
            {order.orderType === 'Dine-in' ? 'T' : 'P'}
          </span>
        </div>
        <div>
          <div className="text-xs sm:text-sm font-semibold text-gray-900">
            {order.tableNumber || 'Takeaway'}
          </div>
          <div className="text-xs text-gray-500">
            {order.orderType === 'Dine-in' ? 'Table' : 'Parcel'}
          </div>
        </div>
      </div>
    </td>
    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
      <div className="text-xs sm:text-sm text-gray-900 font-medium">
        {new Date(order.orderDateTime).toLocaleDateString()}
      </div>
      <div className="text-xs text-gray-500">
        {new Date(order.orderDateTime).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </td>
    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
      <span
        className={`inline-flex px-2 sm:px-3 py-1 text-xs font-semibold rounded-full ${
          order.orderType === 'Dine-in'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-orange-100 text-orange-800'
        }`}
      >
        {order.orderType}
      </span>
    </td>
    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
      <span
        className={`inline-flex items-center px-2 sm:px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
          order.status
        )}`}
      >
        <span className="mr-1 sm:mr-2">{getStatusIcon(order.status)}</span>
        {order.status}
        {order.status === 'Cooking' && (
          <span className="ml-1 sm:ml-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full animate-pulse"></span>
        )}
      </span>
    </td>
    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
      <OrderActionButtons
        order={order}
        onViewOrder={onViewOrder}
        onRejectOrder={onRejectOrder}
        onReadyToServe={onReadyToServe}
        onUpdateStatus={onUpdateStatus}
        isUpdatingStatus={isUpdatingStatus}
          clickedId={clickedId}
      />
    </td>
  </tr>
)

interface OrderActionButtonsProps {
  order: any
  onViewOrder: (order: any) => void
  onRejectOrder: (orderId: string) => void
  onReadyToServe: (orderId: string) => void
  onUpdateStatus: (orderId: string, status: any) => void
  isUpdatingStatus: boolean
   clickedId: string | null 
}

const OrderActionButtons: React.FC<OrderActionButtonsProps> = ({
  order,
  onViewOrder,
  onRejectOrder,
  onReadyToServe,
  isUpdatingStatus,
   clickedId,
}) => (
  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
    <button
      onClick={() => onViewOrder(order)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-colors duration-200 flex items-center justify-center"
    >
      <span className="mr-1">👁️</span>View
    </button>

    <button
      onClick={() => onRejectOrder(order.orderId)}
      className="bg-red-600 hover:bg-red-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-colors duration-200 flex items-center justify-center"
    >
      <span className="mr-1">❌</span>Reject
    </button>

      <button
        disabled={isUpdatingStatus}
        onClick={() => onReadyToServe(order.orderId)}
        className={`bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs font-semibold transition-colors duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${
          clickedId === order.orderId ? 'animate-pulse' : ''
        }`}
      >
        <span className="mr-1">✅</span>
        {isUpdatingStatus && clickedId === order.orderId
          ? 'Processing...'
          : 'Ready'}
      </button>

  </div>
)

// ============================================================================
// 🎯 ORDER DETAILS MODAL COMPONENT
// ============================================================================

interface OrderDetailsModalProps {
  order: any
  onClose: () => void
  onReadyToServe: (orderId: string) => void
  onUpdateStatus: (orderId: string, status: any) => void
  getStatusColor: (status: any) => string
  getStatusIcon: (status: any) => string
  isUpdatingStatus: boolean
  clickedId: string | null
}

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
  onReadyToServe,
  onUpdateStatus,
  getStatusColor,
  getStatusIcon,
  isUpdatingStatus,
  clickedId,
}) => (
  <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
      <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200 rounded-t-2xl">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">
            Order Details - Kitchen
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        <OrderInfoSection
          order={order}
          getStatusColor={getStatusColor}
          getStatusIcon={getStatusIcon}
        />
        <OrderItemsSection items={order.items} />
        <OrderTotalSection totalAmount={order.totalAmount} />
        <OrderActionSection
          order={order}
          onClose={onClose}
          onReadyToServe={onReadyToServe}
          onUpdateStatus={onUpdateStatus}
          isUpdatingStatus={isUpdatingStatus}
          clickedId={clickedId}
        />
      </div>
    </div>
  </div>
)

// ============================================================================
// ℹ️ SUB-COMPONENTS FOR MODAL
// ============================================================================

const OrderInfoSection: React.FC<{
  order: any
  getStatusColor: (status: any) => string
  getStatusIcon: (status: any) => string
}> = ({ order, getStatusColor, getStatusIcon }) => (
  <div className="space-y-3">
    <div className="flex justify-between">
      <span className="text-gray-600">Order ID:</span>
      <span className="font-mono font-semibold text-blue-600">
        {order.orderId}
      </span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-600">Mobile No.:</span>
      <span className="font-semibold">{order.mobileNo}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-600">Status:</span>
      <span
        className={`font-semibold ${getStatusColor(order.status)} px-2 py-1 rounded-full text-xs`}
      >
        {getStatusIcon(order.status)} {order.status}
      </span>
    </div>
    <div className="flex justify-between">
      <span className="text-gray-600">Order Placed:</span>
      <span className="font-semibold">
        {new Date(order.orderDateTime).toLocaleString()}
      </span>
    </div>
    {order.tableNumber && (
      <div className="flex justify-between">
        <span className="text-gray-600">Table No.:</span>
        <span className="font-semibold">{order.tableNumber}</span>
      </div>
    )}
    <div className="flex justify-between">
      <span className="text-gray-600">Order Type:</span>
      <span className="font-semibold">{order.orderType}</span>
    </div>
  </div>
)

const OrderItemsSection: React.FC<{ items: any[] }> = ({ items }) => (
  <div className="space-y-2">
    <h4 className="text-gray-700 font-semibold text-sm">Items</h4>
    <ul className="space-y-1">
      {items.map((item) => (
        <li key={item._id} className="flex justify-between text-sm">
          <span>
            {item.name} x {item.portion}
          </span>
          <span>₹{item.price}</span>
        </li>
      ))}
    </ul>
  </div>
)

const OrderTotalSection: React.FC<{ totalAmount: number }> = ({
  totalAmount,
}) => (
  <div className="flex justify-between font-semibold text-gray-700 text-sm border-t pt-2 mt-2">
    <span>Total Amount</span>
    <span>₹{totalAmount}</span>
  </div>
)

const OrderActionSection: React.FC<{
  order: any
  onClose: () => void
  onReadyToServe: (orderId: string) => void
  onUpdateStatus: (orderId: string, status: any) => void
  isUpdatingStatus: boolean
  clickedId: string | null
}> = ({
  order,
  onClose,
  onReadyToServe,
  onUpdateStatus,
  isUpdatingStatus,
  clickedId,
}) => (
  <div className="flex justify-end space-x-2 pt-4">
    {order.status !== 'Ready' && order.status !== 'Served' && (
      <button
        onClick={() => onReadyToServe(order.orderId)}
        disabled={isUpdatingStatus && clickedId === order.orderId}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUpdatingStatus && clickedId === order.orderId
          ? 'Processing...'
          : 'Mark Ready'}
      </button>
    )}

    {order.status === 'Ready' && (
      <button
        onClick={() => onUpdateStatus(order.orderId, 'Served')}
        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
      >
        Mark Served
      </button>
    )}

    <button
      onClick={onClose}
      className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
    >
      Close
    </button>
  </div>
)

// ============================================================================
// 🚫 REJECTION MODAL
// ============================================================================

interface RejectionModalProps {
  rejectionReason: string
  rejectionReasons: string[]
  onReasonChange: (reason: string) => void
  onConfirm: () => void
  onCancel: () => void
  isRejecting: boolean
}

const RejectionModal: React.FC<RejectionModalProps> = ({
  rejectionReason,
  rejectionReasons,
  onReasonChange,
  onConfirm,
  onCancel,
  isRejecting,
}) => (
  <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
      <div className="bg-gradient-to-r from-red-50 to-red-100 px-6 py-4 border-b border-red-200 rounded-t-2xl">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Reject Order</h3>
          <button
            onClick={onCancel}
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
                onChange={(e) => onReasonChange(e.target.value)}
                className="text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">{reason}</span>
            </label>
          ))}
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            onClick={onConfirm}
            disabled={!rejectionReason || isRejecting}
            className="relative flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-md overflow-hidden"
          >
            {isRejecting ? 'Rejecting...' : 'Confirm Rejection'}
          </button>
          <button
            onClick={onCancel}
            disabled={isRejecting}
            className="flex-1 bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)

// ============================================================================
// 📭 EMPTY ORDERS STATE COMPONENT
// ============================================================================

const EmptyOrdersState: React.FC = () => (
  <div className="text-center py-12">
    <div className="text-gray-400 text-6xl mb-4">👨‍🍳</div>
    <h3 className="text-lg font-semibold text-gray-500">No Approved Orders</h3>
    <p className="text-gray-400 mt-1">
      Approved orders will appear here for cooking
    </p>
  </div>
)

export default Staff_ApprovedOrdersTable
