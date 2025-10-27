// ---------------------- UI Component ----------------------
// This file handles only the presentation layer. All logic is imported from useHistoryLogic.ts.

import React from 'react'
import {
  Calendar,
  Clock,
  Utensils,
  LayoutList,
  User,
  Phone,
  Mail,
  AlertCircle,
  Package as PackageIcon,
  ChevronLeft,
  ChevronRight,
  Search,
  Download,
  CreditCard,
} from 'lucide-react'

import { useHistoryLogic } from './use_History_Logic'
import { handlePayment } from '../../../components/PaymentButton'

const Guest_History_UI: React.FC = () => {
  // ---------------------- Import Logic ----------------------
  const {
    currentView,
    selectedDate,
    loadingDates,
    loadingOrders,
    orders,
    safeItems,
    safeDates,
    handleBack,
    handleDateSelect,
    handleOrderSelect,
    getStatusConfig,
    calculateTotal,
    formatDate,
    formatTime,
  } = useHistoryLogic()

  // ---------------------- Loading Skeletons ----------------------
  const DateSkeleton = () => (
    <div className="animate-pulse">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="w-full h-16 bg-gray-200 rounded-lg mb-2"></div>
      ))}
    </div>
  )

  const OrderSkeleton = () => (
    <div className="animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-full h-20 bg-gray-200 rounded-xl mb-3"></div>
      ))}
    </div>
  )

  const OrderDetailsSkeleton = () => (
    <div className="animate-pulse space-y-4">
      <div className="w-3/4 h-8 bg-gray-200 rounded"></div>
      <div className="w-1/2 h-6 bg-gray-200 rounded"></div>
      <div className="grid md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-full h-20 bg-gray-200 rounded-lg"></div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* ---------------------- Header ---------------------- */}
      <div className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Order History
                </h1>
                <p className="text-sm text-gray-600">
                  {currentView === 'dates' && 'Select a date to view orders'}
                  {currentView === 'orders' && `Orders for selected date`}
                  {currentView === 'details' && 'Order Details'}
                </p>
              </div>
            </div>

            {(currentView === 'orders' || currentView === 'details') && (
              <button
                onClick={handleBack}
                className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 text-gray-600 shadow-sm hover:shadow-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ---------------------- Dates View ---------------------- */}
      {currentView === 'dates' && (
        <div className="p-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                <Calendar className="w-6 h-6 text-blue-600" />
                Select Date
              </h2>
              <p className="text-gray-600 mt-1">
                Choose a date to view order history
              </p>
            </div>

            <div className="p-6">
              {loadingDates ? (
                <DateSkeleton />
              ) : safeDates.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600">
                    No orders found
                  </h3>
                  <p className="text-gray-500">
                    There are no orders in your history yet.
                  </p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {safeDates.map((dateObj: any) => (
                    <button
                      key={dateObj.date}
                      onClick={() => handleDateSelect(dateObj.orders || [])}
                      className="w-full p-5 bg-white hover:bg-blue-50 rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md group"
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-800 text-lg group-hover:text-blue-700">
                            {formatDate(dateObj.date)}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {dateObj.orders?.length || 0} orders
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                            View
                          </span>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------- Orders View ---------------------- */}
      {currentView === 'orders' && selectedDate && (
        <div className="p-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-3">
                    <PackageIcon className="w-6 h-6 text-green-600" />
                    Order IDs
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {selectedDate.length} orders found
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {loadingOrders ? (
                <OrderSkeleton />
              ) : selectedDate.length === 0 ? (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600">
                    No orders found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {selectedDate.map((id: string) => (
                    <button
                      key={id}
                      onClick={() => handleOrderSelect(id)}
                      className="w-full p-6 bg-white hover:bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md group text-left"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-700">
                            Order #{id}
                          </h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {/* You might want to add order time here */}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ---------------------- Order Details View ---------------------- */}
      {currentView === 'details' && (
        <div className="p-4 sm:p-6 max-w-full sm:max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Order Header Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <h2 className="text-base sm:text-sm font-bold text-gray-800 break-all">
                      Order #{orders?.orderId || 'Loading...'}
                    </h2>
                    <p className="text-gray-600 mt-1 text-sm sm:text-base">
                      {orders?.createdAt ? (
                        <>
                          {formatDate(orders.createdAt)} at{' '}
                          {formatTime(orders.createdAt)}
                        </>
                      ) : (
                        'Loading order details...'
                      )}
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-3">
                    <button className="p-2 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors">
                      <Download className="w-5 h-5 text-gray-600" />
                    </button>
                    {orders &&
                      (() => {
                        const statusConfig = getStatusConfig(orders)
                        const StatusIcon = statusConfig.icon

                        return (
                          <div
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border font-medium text-sm sm:text-base ${
                              statusConfig.bg +
                              ' ' +
                              statusConfig.border +
                              ' ' +
                              statusConfig.textColor
                            }`}
                          >
                            <div className="flex items-center justify-center gap-2">
                              <StatusIcon className="w-4 h-4" />
                              <span>{statusConfig.text}</span>
                            </div>
                          </div>
                        )
                      })()}
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6 space-y-6">
                {loadingOrders ? (
                  <OrderDetailsSkeleton />
                ) : !orders ? (
                  <div className="text-center py-10 sm:py-12">
                    <AlertCircle className="w-12 sm:w-16 h-12 sm:h-16 text-gray-300 mx-auto mb-3 sm:mb-4" />
                    <h3 className="text-base sm:text-lg font-semibold text-gray-600">
                      Order not found
                    </h3>
                    <p className="text-gray-500 text-sm sm:text-base">
                      Unable to load order details.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Order & Customer Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Order Information */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-lg">
                          <LayoutList className="w-5 h-5 text-blue-600" />
                          Order Information
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm sm:text-base">
                            <span className="text-gray-600">Order Type</span>
                            <span className="font-semibold text-gray-800 capitalize">
                              {orders.orderType || 'N/A'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm sm:text-base">
                            <span className="text-gray-600">Table</span>
                            <span className="font-semibold text-gray-800">
                              {orders.tableNumber && orders.tableNumber !== '-'
                                ? `Table ${orders.tableNumber}`
                                : 'Takeaway'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm sm:text-base">
                            <span className="text-gray-600">
                              Payment Status
                            </span>
                            <span
                              className={`font-semibold ${
                                orders.paymentStatus
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {orders.paymentStatus ? 'Paid' : 'Pending'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm sm:text-base">
                            <span className="text-gray-600 flex items-center gap-2">
                              Order Status
                            </span>

                            <span
                              className={`flex items-center gap-2 font-semibold ${
                                orders.orderCancelled
                                  ? 'text-red-600'
                                  : orders.orderDelivered
                                    ? 'text-green-600'
                                    : orders.orderAccepted
                                      ? 'text-blue-600'
                                      : 'text-yellow-600'
                              }`}
                            >
                              {/* 🟢 Icon + Text depending on order state */}
                              {orders.orderCancelled && (
                                <>
                                  <i className="bi bi-x-circle"></i> Cancelled
                                </>
                              )}
                              {!orders.orderCancelled &&
                                orders.orderDelivered && (
                                  <>
                                    <i className="bi bi-check-circle"></i>{' '}
                                    Delivered
                                  </>
                                )}
                              {!orders.orderCancelled &&
                                !orders.orderDelivered &&
                                orders.orderAccepted && (
                                  <>
                                    <i className="bi bi-bag-check"></i> Accepted
                                  </>
                                )}
                              {!orders.orderCancelled &&
                                !orders.orderAccepted &&
                                !orders.orderDelivered && (
                                  <>
                                    <i className="bi bi-clock-history"></i>{' '}
                                    Pending
                                  </>
                                )}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Customer Information */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-lg">
                          <User className="w-5 h-5 text-green-600" />
                          Customer Information
                        </h3>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg text-sm sm:text-base">
                            <span className="text-gray-600">Placed By</span>
                            <span className="font-semibold text-gray-800 capitalize">
                              {orders.orderedBy || 'N/A'}
                            </span>
                          </div>
                          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-800 break-all">
                              {orders.mobileNumber || 'N/A'}
                            </span>
                          </div>
                          {orders.email && (
                            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-800 break-all">
                                {orders.email}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-lg">
                        <Utensils className="w-5 h-5 text-orange-600" />
                        Order Items
                      </h3>
                      <div className="space-y-3">
                        {safeItems.length === 0 ? (
                          <div className="text-center py-8 bg-gray-50 rounded-xl">
                            <Utensils className="w-10 sm:w-12 h-10 sm:h-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500 text-sm sm:text-base">
                              No items found in this order
                            </p>
                          </div>
                        ) : (
                          safeItems.map((item) => (
                            <div
                              key={item._id}
                              className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm"
                            >
                              <h4 className="font-bold text-gray-800 text-base sm:text-lg mb-3">
                                {item.name}
                              </h4>
                              <div className="space-y-2">
                                {item?.portions?.map((portion, index) => (
                                  <div
                                    key={index}
                                    className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-2 bg-white rounded-lg border border-gray-100"
                                  >
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-700 text-sm sm:text-base">
                                      <span className="font-medium capitalize">
                                        {portion.portion}
                                      </span>
                                      <span className="text-gray-400">×</span>
                                      <span className="font-semibold">
                                        {portion.quantity}
                                      </span>
                                      <span className="text-gray-400">@</span>
                                      <span className="text-blue-600 font-semibold">
                                        ₹{portion.price}
                                      </span>
                                    </div>
                                    <span className="font-bold text-gray-800 text-base sm:text-lg">
                                      ₹{portion.subtotal}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>

                    {/* Total Amount */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 sm:p-6 border border-blue-200">
                      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
                        <span className="text-lg sm:text-xl font-bold text-gray-800">
                          Total Amount
                        </span>
                        <span className="text-xl sm:text-2xl font-bold text-blue-700">
                          ₹{calculateTotal(orders)}
                        </span>
                      </div>
                    </div>
                    {/* Payment Button - Shows for accepted, unpaid orders */}
                    {!orders.orderCancelled &&
                      !orders.kitchOrderCancelation &&
                      !orders.paymentStatus &&
                      orders.orderAccepted && (
                        <button
                          onClick={() => handlePayment(orders?.orderId)}
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
                            Pay ₹{calculateTotal(orders)}
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
                    {orders?.paymentStatus && (
                      <h1 className="text-2xl font-bold text-green-600 text-center animate-pulse">
                        Payment Successful! 🎉
                      </h1>
                    )}

                    {/* Cancellation Info */}
                    {(orders.orderCancelled ||
                      orders.kitchOrderCancelation) && (
                      <div className="bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-xl p-4 sm:p-6">
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 mb-3">
                          <AlertCircle className="w-5 sm:w-6 h-5 sm:h-6 text-red-600" />
                          <h3 className="font-bold text-red-800 text-base sm:text-lg">
                            Order Cancelled
                          </h3>
                        </div>
                        <div className="space-y-2 text-red-700 text-sm sm:text-base">
                          {orders.orderCancelled && (
                            <p>
                              <strong>Customer Reason:</strong>{' '}
                              {orders.orderCancelationReason ||
                                'No reason provided'}
                            </p>
                          )}
                          {orders.kitchOrderCancelation && (
                            <p>
                              <strong>Kitchen Reason:</strong>{' '}
                              {orders.kitchOrdercancelationReason ||
                                'No reason provided'}
                            </p>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Guest_History_UI
