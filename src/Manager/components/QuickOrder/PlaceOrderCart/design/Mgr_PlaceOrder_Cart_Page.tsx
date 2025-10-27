import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Edit3, ShoppingCart, Utensils, Package } from 'lucide-react'
import { Blurhash } from 'react-blurhash'
import ServerError_UI from '../../../../../ServerErrorUI/ServerError_UI'
import { use_PlaceOrder_Cart_Logic } from './use_PlaceOrder_Cart_Logic'

const Mgr_PlaceOrder_Cart_Page: React.FC = () => {
  const {
    imagesLoaded,
    setImagesLoaded,
    tables,
    addedFoodItems,
    handleCancelAll,
    handleCancelItem,
    totalAmount,
    handleConfirmOrder,
    handleFormChange,
    orderForm,
    errors,
    isSubmitting,
    status,
  } = use_PlaceOrder_Cart_Logic()

  if (status === 'error') return <ServerError_UI />

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500 p-2 rounded-xl">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Your Cart</h1>
              <p className="text-gray-600 text-sm">
                {addedFoodItems.length} items • <span className="font-semibold text-green-600">₹{totalAmount}</span>
              </p>
            </div>
          </div>

          {addedFoodItems.length > 0 && (
            <button
              onClick={handleCancelAll}
              className="flex items-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium text-sm sm:text-base"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {addedFoodItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 max-w-sm mx-auto">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">Add some delicious items to get started!</p>
              <Link
                to="/manager-dashboard/food/dishes"
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors text-sm sm:text-base"
              >
                Browse Menu
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Column */}
            <div className="flex-1 space-y-6">
              {/* Order Info Form */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Order Information</h2>
                <div className="space-y-4">
                  {/* Mobile Number */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                    <input
                      type="tel"
                      value={orderForm.mobileNumber}
                      onChange={e => handleFormChange('mobileNumber', e.target.value)}
                      placeholder="Enter 10-digit mobile number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm sm:text-base"
                      maxLength={10}
                    />
                    {errors?.mobileNumber && (
                      <div className="mt-2 text-red-600 text-sm flex items-center gap-2">
                        <span>{errors.mobileNumber}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address <span className="text-gray-500 text-xs">(optional)</span></label>
                    <input
                      type="email"
                      value={orderForm.email}
                      maxLength={254}
                      onChange={e => handleFormChange('email', e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm sm:text-base"
                    />
                    {errors?.email && <div className="mt-2 text-red-600 text-sm">{errors.email}</div>}
                  </div>

                  {/* Order Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Order Type *</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleFormChange('orderType', 'dining')}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-colors ${
                          orderForm.orderType === 'dining'
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        <Utensils className="w-4 h-4" /> Dining
                      </button>
                      <button
                        onClick={() => handleFormChange('orderType', 'parcel')}
                        className={`flex items-center justify-center gap-2 p-3 rounded-xl border transition-colors ${
                          orderForm.orderType === 'parcel'
                            ? 'border-green-500 bg-green-50 text-green-700'
                            : 'border-gray-300 bg-white text-gray-600 hover:border-gray-400'
                        }`}
                      >
                        <Package className="w-4 h-4" /> Parcel
                      </button>
                    </div>
                  </div>

                  {/* Table Selection */}
                  {orderForm.orderType === 'dining' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Table Number *</label>
                      <select
                        value={orderForm.tableNumber || ''}
                        onChange={e => handleFormChange('tableNumber', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm sm:text-base"
                      >
                        <option value="" disabled>-- Choose a Table --</option>
                        {tables.map(table => <option key={table.name} value={table.name}>{table.name}</option>)}
                      </select>
                      {errors?.tableNumber && <div className="mt-2 text-red-600 text-sm">{errors.tableNumber}</div>}
                    </div>
                  )}
                </div>
              </div>

              {/* Cart Items */}
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
                  Cart Items ({addedFoodItems.length})
                </h2>
                <div className="max-h-96 overflow-y-auto space-y-4">
                  {addedFoodItems.map(item => {
                    const itemTotal = item.portions.reduce((sum, p) => sum + p.subtotal, 0)
                    return (
                      <div key={item.id} className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl hover:border-gray-300">
                        {/* Image */}
                        <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden">
                          {!imagesLoaded[item.id] && item.blurHash && (
                            <Blurhash hash={item.blurHash} width={64} height={64} resolutionX={32} resolutionY={32} punch={1} />
                          )}
                          <img
                            src={item.image}
                            alt={item.name}
                            className={`w-full h-full object-cover ${imagesLoaded[item.id] ? 'block' : 'hidden'}`}
                            onLoad={() => setImagesLoaded(prev => ({ ...prev, [item.id]: true }))}
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{item.name}</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {item.portions.map(p => (
                              <span key={p.portion} className={`px-2 py-1 rounded text-xs font-medium ${
                                p.portion === 'quarter' ? 'bg-blue-100 text-blue-800' : p.portion === 'half' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                              }`}>
                                {p.portion}: {p.quantity} × ₹{p.price}
                              </span>
                            ))}
                          </div>
                          <p className="text-sm font-semibold text-gray-900 mt-1">Item Total: <span className="text-green-600">₹{itemTotal}</span></p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-1 flex-shrink-0">
                          <Link to={`/manager-dashboard/food/order/${item.id}`} className="flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded-lg text-xs sm:text-sm hover:bg-blue-600">
                            <Edit3 className="w-3 h-3" /> Edit
                          </Link>
                          <button onClick={() => handleCancelItem(item.id)} className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded-lg text-xs sm:text-sm hover:bg-red-600">
                            <Trash2 className="w-3 h-3" /> Remove
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:w-80">
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 sticky top-20">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
                <div className="mb-4">
                  <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                    <span className="text-base sm:text-lg font-bold text-gray-900">Total</span>
                    <span className="text-base sm:text-lg font-bold text-green-600">₹{totalAmount}</span>
                  </div>
                </div>

                <button
                  disabled={isSubmitting}
                  onClick={() => handleConfirmOrder('manager')}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white py-3 rounded-xl font-bold text-base sm:text-lg transition-colors shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Processing...' : 'Confirm Order'}
                </button>

                <div className="mt-4 text-center text-xs text-gray-500">You'll pay ₹{totalAmount} at the counter</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Mgr_PlaceOrder_Cart_Page
