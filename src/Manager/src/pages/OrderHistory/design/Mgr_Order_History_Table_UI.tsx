import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { use_OrderHistory_TableLogic } from './use_OrderHistory_TableLogic'
import {
  Printer,
  Calendar,
  Clock,
  User,
  Settings,
  AlertCircle,
  AlertTriangle,
  ShoppingBag,
  X,
  CheckCircle,
  Download,
} from 'lucide-react'

const Mgr_Order_History_Table_UI: React.FC = () => {
  // Destructure all state and functions from the custom hook
  const {
    selectedOrder,
    isModalOpen,
    handle_Fetch_MoreOrders,
    hasMore,
    handleSubmitFilters,
    isTableDropdownOpen,
    tableNumbers,
    filters,
    tableDropdownRef,
    handleViewOrder,
    handleTableSelect,
    handleClearTableFilter,
    handleClearFilters,
    getStatusColor,
    getStatusText,
    getPaymentStatusColor,
    getPaymentStatusText,
    getOrderTypeText,
    setFilters,
    setIsTableDropdownOpen,
    message,
    orders,
    loading,
    handle_Mark_Paid_ApiCall,
    markPaidLoading,
  } = use_OrderHistory_TableLogic()

  // Function to handle print with proper invoice styling
  const handlePrintInvoice = () => {
    const printContent = document.getElementById('invoice-print-section')

    if (printContent) {
      // Create a print-friendly version
      const printWindow = window.open('', '_blank')
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Invoice - Order #${selectedOrder?.orderId}</title>
              <style>
                @media print {
                  body { 
                    margin: 0; 
                    padding: 20px; 
                    font-family: Arial, sans-serif; 
                    background: white; 
                    color: black;
                  }
                  .no-print { display: none !important; }
                  .print-section { 
                    display: block !important; 
                    width: 100% !important;
                    max-width: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    box-shadow: none !important;
                    border: none !important;
                  }
                  .print-header {
                    background: #1f2937 !important;
                    color: white !important;
                    padding: 20px !important;
                    margin-bottom: 20px !important;
                  }
                  .print-grid { 
                    display: grid !important;
                    grid-template-columns: 1fr 1fr !important;
                    gap: 20px !important;
                    margin-bottom: 20px !important;
                  }
                  .print-table {
                    width: 100% !important;
                    border-collapse: collapse !important;
                  }
                  .print-table th,
                  .print-table td {
                    border: 1px solid #ddd !important;
                    padding: 8px !important;
                    text-align: left !important;
                  }
                  .print-table th {
                    background: #f3f4f6 !important;
                    font-weight: bold !important;
                  }
                  .print-total {
                    background: #1f2937 !important;
                    color: white !important;
                    padding: 20px !important;
                    margin: 20px 0 !important;
                  }
                  .text-center { text-align: center !important; }
                  .font-bold { font-weight: bold !important; }
                  .text-lg { font-size: 18px !important; }
                  .text-xl { font-size: 20px !important; }
                  .text-2xl { font-size: 24px !important; }
                  .text-4xl { font-size: 32px !important; }
                  .mb-4 { margin-bottom: 16px !important; }
                  .mb-8 { margin-bottom: 32px !important; }
                  .p-6 { padding: 24px !important; }
                  .rounded { border-radius: 4px !important; }
                  .bg-white { background: white !important; }
                  .bg-gray-50 { background: #f9fafb !important; }
                  .text-gray-900 { color: #111827 !important; }
                  .text-gray-700 { color: #374151 !important; }
                  .text-gray-500 { color: #6b7280 !important; }
                  .border { border: 1px solid #e5e7eb !important; }
                  .shadow-sm { box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05) !important; }
                }
                @page {
                  margin: 0.5cm;
                  size: A4 portrait;
                }
              </style>
            </head>
            <body>
              <div class="print-section">
                ${printContent.innerHTML}
              </div>
              <div class="no-print text-center mt-8 text-gray-500">
                <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
              </div>
            </body>
          </html>
        `)

        printWindow.document.close()
        printWindow.focus()

        // Wait for content to load then print
        setTimeout(() => {
          printWindow.print()
          printWindow.close()
        }, 500)
      }
    }
  }

  // Function to save as PDF (using browser's print to PDF functionality)
  const handleSaveAsPDF = () => {
    handlePrintInvoice() // Uses the same print function since browsers can save as PDF
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-blue-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="bg-blue-600 text-white rounded-lg px-3 py-1 mr-3 text-sm">
                History
              </span>
              Order History
              <span className="ml-3 bg-blue-500 text-white text-sm px-2 py-1 rounded-full">
                {orders.length} orders
              </span>
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Search and filter past orders
            </p>
          </div>
          <button
            onClick={handleClearFilters}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200"
          >
            Clear Filters
          </button>
        </div>

        {/* ================= FILTERS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
          {/* Search input for mobile number or order ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search (Mobile / Order ID)
            </label>
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  searchTerm: e.target.value.trimStart(),
                })
              }
              onBlur={(e) =>
                setFilters({
                  ...filters,
                  searchTerm: e.target.value.trim().toUpperCase(),
                })
              }
              placeholder="Mobile No / Order ID"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Date filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Order type filter (dining/parcel) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Order Type
            </label>
            <select
              value={filters.orderType}
              onChange={(e) =>
                setFilters({ ...filters, orderType: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Type</option>
              <option value="dining">Dine-in</option>
              <option value="parcel">Parcel</option>
            </select>
          </div>

          {/* Table number dropdown - only shown for dining orders */}
          {filters.orderType === 'dining' && (
            <div className="relative" ref={tableDropdownRef}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Table Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={filters.table}
                  readOnly
                  onClick={() => setIsTableDropdownOpen(!isTableDropdownOpen)}
                  placeholder="Select table number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer bg-white focus:ring-2 focus:ring-blue-500"
                />
                {filters.table && (
                  <button
                    onClick={handleClearTableFilter}
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                )}
                <div
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 transition-transform ${
                    isTableDropdownOpen ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </div>
              </div>
              {isTableDropdownOpen && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {tableNumbers.map((table) => (
                    <button
                      key={table.name}
                      onClick={() => handleTableSelect(table.name)}
                      className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${
                        filters.table === table.name
                          ? 'bg-blue-100 text-blue-800 font-semibold'
                          : 'text-gray-700'
                      }`}
                    >
                      {table.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Order status filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="delivered">📦 Delivered Orders</option>
              <option value="cancelled">❌ Cancelled Orders</option>
              <option value="pending">⏳ Pending Orders</option>
              <option value="unpaid">💰 Unpaid Orders</option>
              <option value="paid">💵 Paid Orders</option>
            </select>
          </div>
        </div>

        {/* Submit filters button */}
        <div className="flex flex-col items-end mt-4">
          <button
            onClick={handleSubmitFilters}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold shadow transition-colors duration-200 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Submit'}
          </button>
          {message && (
            <div className="mt-2 text-yellow-800 bg-yellow-100 px-4 py-2 rounded-lg shadow-sm text-sm w-full md:w-auto text-right">
              {message}
            </div>
          )}
        </div>
      </div>

      {/* ================= TABLE WITH INFINITE SCROLL ================= */}
      <div id="scrollableDiv" className="overflow-auto max-h-120">
        <InfiniteScroll
          dataLength={orders.length}
          next={() => handle_Fetch_MoreOrders(filters)}
          hasMore={hasMore}
          scrollableTarget="scrollableDiv"
          scrollThreshold={0.8}
          loader={
            <div className="flex justify-center py-4">
              <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          }
        >
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Order ID
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Mobile No.
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Table No.
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Order Type
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Payment
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-blue-600">
                    {order.orderId}
                  </td>
                  <td className="px-6 py-4">{order.mobileNumber}</td>
                  <td className="px-6 py-4">{order.tableNumber || '-'}</td>
                  <td className="px-6 py-4">
                    {getOrderTypeText(order.orderType)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${getPaymentStatusColor(
                        order.paymentStatus
                      )}`}
                    >
                      {getPaymentStatusText(order.paymentStatus)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(order)}`}
                    >
                      {getStatusText(order)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleViewOrder(order)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-lg text-xs"
                    >
                      👁️ View Bill
                    </button>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </InfiniteScroll>
      </div>

      {/* ================= VIEW BILL MODAL ================= */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col transform transition-all duration-300 scale-100">
            {/* Header - Elegant with gradient */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <h2 className="text-2xl font-bold">Order Invoice</h2>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-gray-300">
                    <div className="flex items-center space-x-2">
                      <span className="bg-white/10 px-2 py-1 rounded text-sm font-mono">
                        #{selectedOrder.orderId}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {new Date(selectedOrder.createdAt).toLocaleDateString(
                          'en-IN',
                          {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>
                        {new Date(selectedOrder.createdAt).toLocaleTimeString(
                          'en-IN',
                          {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleViewOrder(null)}
                  className="text-white/80 hover:text-white text-xl p-2 hover:bg-white/10 rounded-xl transition-all duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Scrollable Content - This is the main invoice section for printing */}
            <div
              className="flex-1 overflow-y-auto p-6 bg-gray-50/50"
              id="invoice-print-section"
            >
              {/* Customer & Order Info Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 print-grid">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <User className="w-5 h-5 text-blue-600" />
                    <span>Customer Information</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-1">
                        Mobile Number
                      </label>
                      <p className="text-gray-900 font-semibold text-lg">
                        {selectedOrder.mobileNumber}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-1">
                        Email
                      </label>
                      <p
                        className={`text-lg font-semibold ${
                          selectedOrder?.email
                            ? 'text-gray-900'
                            : 'text-gray-400 italic'
                        }`}
                      >
                        {selectedOrder?.email || 'Not Provided'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-1">
                        Order Type
                      </label>
                      <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                        {getOrderTypeText(selectedOrder.orderType)}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-green-600" />
                    <span>Order Details</span>
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-1">
                        Table / Location
                      </label>
                      <p className="text-gray-900 font-medium">
                        {selectedOrder.tableNumber || 'Takeaway Counter'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-1">
                        Orderd By
                      </label>
                      <p className="text-gray-900 font-medium">
                        {selectedOrder.orderedBy}
                        {selectedOrder.orderedBy !== 'manager' && (
                          <span className="text-gray-500 text-sm ml-2">
                            ({selectedOrder.orderedById})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Indicators */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div
                  className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center space-x-2 transition-all duration-300 ${
                    selectedOrder.paymentStatus
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border border-green-200 shadow-sm'
                      : 'bg-gradient-to-r from-red-50 to-orange-50 text-red-700 border border-red-200 shadow-sm'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${selectedOrder.paymentStatus ? 'bg-green-500' : 'bg-red-500'}`}
                  ></div>
                  <span>
                    {selectedOrder.paymentStatus
                      ? 'Payment Completed'
                      : 'Payment Pending'}
                  </span>
                </div>
                <div
                  className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center space-x-2 transition-all duration-300 ${
                    selectedOrder.orderDelivered
                      ? 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border border-blue-200 shadow-sm'
                      : selectedOrder.orderCancelled
                        ? 'bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border border-gray-200 shadow-sm'
                        : 'bg-gradient-to-r from-yellow-50 to-amber-50 text-yellow-700 border border-yellow-200 shadow-sm'
                  }`}
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      selectedOrder.orderDelivered
                        ? 'bg-blue-500'
                        : selectedOrder.orderCancelled
                          ? 'bg-gray-500'
                          : 'bg-yellow-500'
                    }`}
                  ></div>
                  <span>{getStatusText(selectedOrder)}</span>
                </div>
              </div>

              {/* Cancellation Reasons */}
              {(selectedOrder.orderCancelled ||
                selectedOrder.kitchOrderCancelation) && (
                <div className="mb-8 space-y-4">
                  {selectedOrder.orderCancelled && (
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-5 transform hover:scale-[1.02] transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                          <AlertCircle className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-red-900 text-lg">
                            Order Cancelled
                          </p>
                          <p className="text-red-700 mt-2">
                            {selectedOrder.orderCancelationReason ||
                              'No reason provided for cancellation'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {selectedOrder.kitchOrderCancelation && (
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-5 transform hover:scale-[1.02] transition-all duration-300">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                          <AlertTriangle className="w-4 h-4 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-orange-900 text-lg">
                            Kitchen Cancellation
                          </p>
                          <p className="text-orange-700 mt-2">
                            {selectedOrder.kitchOrdercancelationReason ||
                              'No reason provided for kitchen cancellation'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Items Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-3">
                    <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                    <span>Order Items</span>
                  </h3>
                  <span className="text-sm font-semibold text-gray-700 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                    {selectedOrder.items?.reduce(
                      (total: number, item: any) =>
                        total +
                        item.portions.reduce(
                          (sum: number, portion: any) => sum + portion.quantity,
                          0
                        ),
                      0
                    )}{' '}
                    items total
                  </span>
                </div>

                {/* Enhanced Items Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full print-table">
                      <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Item
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Portion
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Quantity
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Unit Price
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">
                            Amount
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {selectedOrder.items?.map(
                          (item: any, itemIndex: number) =>
                            item.portions.map(
                              (portion: any, portionIndex: number) => (
                                <tr
                                  key={`${itemIndex}-${portionIndex}`}
                                  className="hover:bg-gray-50/80 transition-colors duration-200 group"
                                >
                                  <td className="px-6 py-4">
                                    <div className="flex items-center space-x-4">
                                      <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full group-hover:scale-110 transition-transform duration-200"></div>
                                      <span className="font-medium text-gray-900">
                                        {item.name}
                                      </span>
                                    </div>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className="text-gray-700 capitalize font-medium bg-gray-100 px-3 py-1 rounded-full text-sm">
                                      {portion.portion}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className="text-gray-900 font-semibold text-lg">
                                      {portion.quantity}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className="text-gray-700 font-medium">
                                      ₹{portion.price}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4">
                                    <span className="text-gray-900 font-bold text-lg">
                                      ₹{portion.subtotal}
                                    </span>
                                  </td>
                                </tr>
                              )
                            )
                        ) || (
                          <tr>
                            <td colSpan={5} className="px-6 py-12 text-center">
                              <div className="text-gray-400 space-y-2">
                                <ShoppingBag className="w-12 h-12 mx-auto" />
                                <p className="text-lg font-medium">
                                  No items found in this order
                                </p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Total Amount Card */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-xl p-8 mb-8 transform hover:scale-[1.01] transition-all duration-300 print-total">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold mb-2">Total Amount</p>
                    <p className="text-gray-300 text-sm">
                      Inclusive of all taxes and charges
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold mb-2">
                      ₹
                      {selectedOrder.items
                        ?.reduce(
                          (sum: number, item: any) =>
                            sum +
                            item.portions.reduce(
                              (pSum: number, p: any) => pSum + p.subtotal,
                              0
                            ),
                          0
                        )
                        .toFixed(2)}
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        selectedOrder.paymentStatus
                          ? 'text-green-300'
                          : 'text-red-300'
                      }`}
                    >
                      {selectedOrder.paymentStatus
                        ? '✓ Payment Completed'
                        : '✗ Payment Pending'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Timeline */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span>Order Timeline</span>
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">
                        Order placed
                      </span>
                    </div>
                    <span className="text-gray-900 font-semibold">
                      {new Date(selectedOrder.createdAt).toLocaleString(
                        'en-IN',
                        {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: true,
                        }
                      )}
                    </span>
                  </div>
                  {selectedOrder.updatedAt && (
                    <div className="flex justify-between items-center py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">
                          Last updated
                        </span>
                      </div>
                      <span className="text-gray-900 font-semibold">
                        {new Date(selectedOrder.updatedAt).toLocaleString(
                          'en-IN',
                          {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          }
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-white border-t border-gray-200 px-8 py-6 rounded-b-2xl no-print">
              <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
                <div className="text-sm text-gray-600 font-medium">
                  Order ID:{' '}
                  <span className="font-mono text-gray-900 bg-gray-100 px-3 py-1 rounded-lg">
                    #{selectedOrder.orderId}
                  </span>
                </div>

                {/* Reduced size buttons */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {!selectedOrder.paymentStatus &&
                    !selectedOrder?.kitchOrderCancelation &&
                    !selectedOrder?.orderCancelled && (
                      <button
                        disabled={markPaidLoading}
                        onClick={() =>
                          handle_Mark_Paid_ApiCall(selectedOrder.orderId)
                        }
                        className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-2"
                      >
                        {markPaidLoading ? (
                          <>
                            {/* Spinner */}
                            <svg
                              className="animate-spin h-4 w-4 text-white"
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
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            <span>Mark Paid</span>
                          </>
                        )}
                      </button>
                    )}

                  <button
                    onClick={handlePrintInvoice}
                    className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-1"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Print</span>
                  </button>

                  <button
                    onClick={handleSaveAsPDF}
                    className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-200 flex items-center space-x-1"
                  >
                    <Download className="w-4 h-4" />
                    <span>PDF</span>
                  </button>

                  <button
                    onClick={() => handleViewOrder(null)}
                    className="px-3 py-1.5 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold shadow-sm transition-all duration-200 flex items-center space-x-1"
                  >
                    <X className="w-4 h-4" />
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Mgr_Order_History_Table_UI
