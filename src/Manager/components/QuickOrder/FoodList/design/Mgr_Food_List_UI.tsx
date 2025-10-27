import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Blurhash } from 'react-blurhash'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ChefHat, Star, Clock, ShoppingBag } from 'lucide-react'
import { use_Get_Food_List } from './../logic/use_Get_Food_List'
import Mgr_Loading from '../../../Loading/Mgr_Loading'
import ServerError_UI from '../../../../../ServerErrorUI/ServerError_UI'

/**
 * Food_List_UI Component
 * ----------------------
 * Displays a paginated, responsive grid of food items with infinite scrolling.
 * Features include:
 * - Image loading with Blurhash placeholders
 * - Availability badges (Available, Coming Soon, Unavailable)
 * - Price variations display
 * - Hover effects with "View Details" call-to-action
 * - Fully responsive layout with mobile-friendly FAB
 */
const Mgr_Food_List_UI: React.FC = () => {
  // --------------------- Hooks ---------------------
  // Custom hook to manage fetching food list, pagination, and status
  const { foodList, fetchFoodList, hasMore, status, totalCount } =
    use_Get_Food_List()

  // Track loaded state of images for blurhash transition
  const [imageLoadedMap, setImageLoadedMap] = useState<Record<string, boolean>>(
    {}
  )

  // --------------------- Effects ---------------------
  // Initial fetch of food items on component mount
  useEffect(() => {
    fetchFoodList()
  }, [fetchFoodList])

  /**
   * Marks a food item's image as loaded
   * @param id - Unique identifier of the food item
   */
  const handleImageLoad = (id: string) => {
    setImageLoadedMap((prev) => ({ ...prev, [id]: true }))
  }

  // --------------------- Loading & Error States ---------------------
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <Mgr_Loading />
      </div>
    )
  }

  if (status === 'error') {
    return <ServerError_UI />
  }

  if (totalCount === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            No Food Available
          </h3>
          <p className="text-gray-600 mb-6">
            Check back later for new menu items
          </p>
          <button
            onClick={fetchFoodList}
            className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Refresh Menu
          </button>
        </div>
      </div>
    )
  }

  // --------------------- Render ---------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 ">
      {/* --------------------- Header --------------------- */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 lg:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Chef Hat Icon */}
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <div>
                {/* Menu Title */}
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                  Our Menu
                </h1>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <span>{totalCount}+ delicious options</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    4.8
                  </span>
                </p>
              </div>
            </div>
            {/* Freshness Badge */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-2xl">
              <Clock className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                Fresh Daily
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --------------------- Food Grid with Infinite Scroll --------------------- */}
      <div className="max-w-7xl mx-auto px-4 py-6 lg:px-6 lg:py-8">
        <InfiniteScroll
          dataLength={foodList.length}
          next={fetchFoodList}
          hasMore={hasMore}
          scrollThreshold={0.8}
          loader={
            <div className="col-span-full flex justify-center py-8">
              <div className="flex items-center gap-3 bg-white rounded-2xl px-6 py-4 shadow-lg border border-gray-200">
                <div className="w-6 h-6 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                <span className="text-gray-700 font-medium">
                  Loading more delicious items...
                </span>
              </div>
            </div>
          }
          endMessage={
            <div className="text-center py-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 max-w-md mx-auto">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎉</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  That's All!
                </h3>
                <p className="text-gray-600">
                  You've seen all {totalCount} menu items
                </p>
              </div>
            </div>
          }
        >
          {/* Grid layout for food items */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {foodList.map((food) => {
              const status = food.availability || 'Available'
              const imageLoaded = imageLoadedMap[food._id] || false
              const hasMultiplePrices =
                Object.values(food.prices).filter(Boolean).length > 1

              return (
                <Link
                  key={food._id}
                  to={`/manager-dashboard/food/order/${food._id}`}
                  className="group block"
                >
                  {/* --------------------- Food Card --------------------- */}
                  <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:scale-105 flex flex-col h-full">
                    {/* --------------------- Image Section --------------------- */}
                    <div className="relative w-full h-48 lg:h-52 flex-shrink-0 overflow-hidden">
                      {/* Blurhash Placeholder */}
                      {!imageLoaded && food.blurHash && (
                        <Blurhash
                          hash={food.blurHash}
                          width="100%"
                          height="100%"
                          resolutionX={32}
                          resolutionY={32}
                          punch={1}
                          className="absolute inset-0"
                        />
                      )}

                      {/* Food Image */}
                      <img
                        src={food.s3Url}
                        alt={food.productName}
                        className={`w-full h-full object-cover transition-all duration-500 ${
                          imageLoaded
                            ? 'opacity-100 scale-100'
                            : 'opacity-0 scale-105'
                        } group-hover:scale-110`}
                        onLoad={() => handleImageLoad(food._id)}
                      />

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300"></div>

                      {/* Availability badge */}
                      <div className="absolute top-3 right-3">
                        <span
                          className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ${
                            status === 'Available'
                              ? 'bg-green-500/95 text-white'
                              : status === 'ComingSoon'
                              ? 'bg-yellow-500/95 text-white'
                              : 'bg-red-500/95 text-white'
                          }`}
                        >
                          {status === 'Available'
                            ? '🟢'
                            : status === 'ComingSoon'
                            ? '🟡'
                            : '🔴'}{' '}
                          {status}
                        </span>
                      </div>

                      {/* Food category badge */}
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-black/80 text-white text-xs font-medium backdrop-blur-sm">
                          {food.foodCategory}
                        </span>
                      </div>

                      {/* Hover overlay with CTA */}
                      <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-2xl">
                            <ShoppingBag className="w-6 h-6 text-gray-900" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* --------------------- Info Section --------------------- */}
                    <div className="p-4 lg:p-5 flex flex-col flex-grow">
                      {/* Food name */}
                      <h2 className="text-lg lg:text-xl font-bold text-gray-900 text-center line-clamp-2 leading-tight mb-3 group-hover:text-blue-600 transition-colors duration-200">
                        {food.productName}
                      </h2>

                      {/* Price tags */}
                      <div className="flex flex-wrap justify-center gap-2 mt-auto">
                        {Object.entries(food.prices)
                          .filter(([_, value]) => value)
                          .map(([key, value]) => (
                            <div
                              key={key}
                              className={`flex flex-col items-center px-3 py-2 rounded-2xl transition-all duration-200 ${
                                hasMultiplePrices
                                  ? 'bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-blue-50 group-hover:to-blue-100 border border-gray-200 group-hover:border-blue-200'
                                  : 'bg-gradient-to-br from-green-50 to-green-100 border border-green-200'
                              }`}
                            >
                              <span className="text-xs font-medium text-gray-600 capitalize">
                                {key}
                              </span>
                              <span
                                className={`font-bold ${
                                  hasMultiplePrices
                                    ? 'text-gray-900'
                                    : 'text-green-600'
                                } text-sm`}
                              >
                                ₹{value}
                              </span>
                            </div>
                          ))}
                      </div>

                      {/* View Details CTA */}
                      <div className="mt-4 text-center">
                        <span className="inline-flex items-center gap-1 text-sm text-gray-500 group-hover:text-blue-600 transition-colors duration-200">
                          View Details
                          <svg
                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </InfiniteScroll>
      </div>

      {/* --------------------- Mobile FAB: Scroll to Top --------------------- */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-blue-600 text-white p-4 rounded-2xl shadow-2xl hover:bg-blue-700 transition-all duration-200 transform hover:scale-110"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Mgr_Food_List_UI
