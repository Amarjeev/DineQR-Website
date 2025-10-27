import { useNavigate } from 'react-router-dom'
import { Blurhash } from 'react-blurhash'
import {
  ArrowLeft,
  Plus,
  Minus,
  RotateCcw,
  ShoppingCart,
  ChefHat,
  Clock,
} from 'lucide-react'
import Loading from '../../../Loading/Guest_Loading'
import ServerError_UI from '../../../../../ServerErrorUI/ServerError_UI'
import { use_Food_Detail_Logic, type Portion } from './use_Food_Detail_Logic'

const Guest_Food_Detail_Page: React.FC = () => {
  const navigate = useNavigate()
  const {
    foodItem,
    loadingStatus,
    status,
    quantities,
    imageLoaded,
    setImageLoaded,
    increment,
    decrement,
    resetQuantities,
    totalAmount,
    hasSelectedQuantities,
    handleAddToCart,
    userId,
    isUpdating,
  } = use_Food_Detail_Logic()

  if (loadingStatus === 'loading')
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
        <Loading />
      </div>
    )

  if (loadingStatus === 'error') return <ServerError_UI />

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mt-15 ml-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-700 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold text-base">Back to Menu</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 lg:py-8 lg:px-6 flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="w-full lg:w-2/5 xl:w-2/5 mb-6 lg:mb-0 lg:sticky lg:top-24">
          <div className="w-full max-w-[400px] mx-auto bg-white rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative">
              {!imageLoaded && foodItem?.blurHash && (
                <Blurhash
                  hash={foodItem.blurHash}
                  width={400}
                  height="100%"
                  resolutionX={32}
                  resolutionY={32}
                  punch={1}
                  className="w-full"
                />
              )}
              <img
                src={foodItem?.s3Url}
                alt={foodItem?.productName}
                width={400}
                height="auto"
                className={`w-full h-auto object-contain transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
              />

              {/* Availability */}
              <div className="absolute top-4 right-4 lg:top-6 lg:right-6">
                <span
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-2xl backdrop-blur-sm ${
                    status === 'Available'
                      ? 'bg-green-500/95 text-white'
                      : status === 'ComingSoon'
                        ? 'bg-yellow-500/95 text-white'
                        : 'bg-red-500/95 text-white'
                  }`}
                >
                  {status === 'Available'
                    ? '🟢 Available'
                    : status === 'ComingSoon'
                      ? '🟡 Coming Soon'
                      : '🔴 Sold Out'}
                </span>
              </div>

              {/* Prep Time */}
              <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/80 text-white text-sm font-medium backdrop-blur-sm">
                  <Clock className="w-4 h-4" />
                  15-20 mins
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="w-full lg:w-3/5 xl:w-3/5">
          <div className="bg-white rounded-2xl lg:rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="p-6 lg:p-8 flex flex-col gap-6 lg:gap-8">
              {/* Header */}
              <div className="text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-3">
                  <ChefHat className="w-6 h-6 text-orange-500 lg:w-7 lg:h-7" />
                  <span className="text-sm font-medium text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    {foodItem?.foodCategory}
                  </span>
                </div>
                <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2 lg:mb-3">
                  {foodItem?.productName}
                </h1>
                <p className="text-gray-600 text-base lg:text-lg max-w-2xl">
                  Freshly prepared with premium ingredients. Customize your
                  portion size below.
                </p>
              </div>

              {/* Reset Button */}
              {hasSelectedQuantities && (
                <button
                  onClick={resetQuantities}
                  className="flex items-center justify-center gap-2 w-full py-3 text-gray-600 hover:text-gray-800 transition-colors duration-200 bg-gray-50 rounded-xl hover:bg-gray-100 lg:py-4"
                >
                  <RotateCcw className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="text-sm font-medium lg:text-base">
                    Reset Quantities
                  </span>
                </button>
              )}

              {/* Portion Selection */}
              <div className="space-y-4 lg:space-y-6">
                <h3 className="text-lg font-bold text-gray-900 lg:text-xl">
                  Select Portions
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
                  {(['quarter', 'half', 'full'] as const).map((portion) => {
                    const price = foodItem?.prices?.[portion]
                    if (!price) return null
                    const label = (portion.charAt(0).toUpperCase() +
                      portion.slice(1)) as Portion
                    const quantity = quantities[label]
                    const isActive = quantity > 0

                    return (
                      <div
                        key={portion}
                        className={`flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 ${
                          isActive
                            ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300 shadow-lg transform -translate-y-1'
                            : 'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-md'
                        } lg:p-6`}
                      >
                        <span className="font-bold text-gray-800 text-sm lg:text-base mb-2">
                          {label}
                        </span>
                        <span className="text-green-600 font-bold text-lg lg:text-xl mb-4">
                          ₹{price}
                        </span>

                        <div className="flex items-center gap-4 lg:gap-5">
                          <button
                            onClick={() => decrement(label)}
                            disabled={quantity === 0}
                            className={`w-10 h-10 flex justify-center items-center rounded-full transition-all duration-200 lg:w-12 lg:h-12 ${
                              quantity === 0
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                            }`}
                          >
                            <Minus className="w-4 h-4 lg:w-5 lg:h-5" />
                          </button>

                          <span
                            className={`w-8 text-center font-bold text-xl lg:text-2xl ${isActive ? 'text-blue-600' : 'text-gray-500'}`}
                          >
                            {quantity}
                          </span>

                          <button
                            onClick={() => increment(label)}
                            className="w-10 h-10 flex justify-center items-center bg-green-500 text-white rounded-full hover:bg-green-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 lg:w-12 lg:h-12"
                          >
                            <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Total & Add to Cart */}
              <div className="space-y-4 lg:space-y-6">
                <div className="flex justify-between items-center p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200 lg:p-6">
                  <span className="font-semibold text-gray-700 text-lg lg:text-xl">
                    Total Amount
                  </span>
                  <span className="font-bold text-green-600 text-2xl lg:text-3xl">
                    ₹{totalAmount}
                  </span>
                </div>

                <button
                  disabled={
                    status !== 'Available' ||
                    !hasSelectedQuantities ||
                    isUpdating
                  }
                  onClick={() => handleAddToCart(userId)}
                  className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex justify-center items-center gap-3 shadow-2xl lg:py-5 lg:text-xl ${
                    status !== 'Available' ||
                    !hasSelectedQuantities ||
                    isUpdating
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-2xl transform hover:-translate-y-1 active:translate-y-0'
                  }`}
                >
                  {isUpdating ? (
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin lg:w-7 lg:h-7" />
                  ) : (
                    <>
                      <ShoppingCart className="w-6 h-6 lg:w-7 lg:h-7" />
                      <span>Add to Cart</span>
                    </>
                  )}
                </button>

                {!hasSelectedQuantities && status === 'Available' && (
                  <p className="text-center text-gray-500 text-sm lg:text-base">
                    👆 Select portion quantities above to add items to your cart
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Guest_Food_Detail_Page
