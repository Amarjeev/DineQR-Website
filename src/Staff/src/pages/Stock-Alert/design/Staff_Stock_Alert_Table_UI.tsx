import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useStockAlertLogic } from './use_Stock_Alert_Logic'
import { BlurhashCanvas } from 'react-blurhash'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================================================
// 🎯 Component: Stock_Alert_Table_UI
// ============================================================================
const Staff_Stock_Alert_Table_UI: React.FC = () => {
  const {
    foodCategories,
    foodItems,
    selectedCategory,
    statusFilter,
    isCategoryDropdownOpen,
    selectedItem,
    categoryDropdownRef,
    statusDropdownRef,
    handleCategorySelect,
    handleClearCategory,
    handleClearFilters,
    handleStatusChange,
    handleStatusDropdownToggle,
    getStatusColor,
    getStatusIcon,
    getStatusOptionColor,
    setIsCategoryDropdownOpen,
    setStatusFilter,
    fetchFoodList,
    hasMore,
    setPage,
    isStatusUpdating,
    updateStatusData,
  } = useStockAlertLogic()

  return (
    <div className="rounded-2xl shadow-xl border border-gray-100 overflow-visible backdrop-blur-sm bg-white/95 relative">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div className="text-white">
            <h2 className="text-xl font-bold flex items-center">
              <span className="bg-white text-purple-600 rounded-lg px-3 py-1.5 mr-3 text-xs font-bold shadow-md">
                🍽️ STOCK
              </span>
              Food Items Management
              <span className="ml-3 bg-white/20 text-white text-xs px-2 py-1 rounded-full border border-white/30">
                {foodItems?.length} items
              </span>
            </h2>
            <p className="text-purple-100 mt-1 text-xs">
              Manage food item availability and status
            </p>
          </div>
          <button
            onClick={handleClearFilters}
            className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 border border-white/30 hover:scale-105"
          >
            🔄 Clear All
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Category Filter */}
          <div className="relative" ref={categoryDropdownRef}>
            <label className="block text-purple-100 text-xs font-medium mb-1">
              🍴 Food Category
            </label>
            <div className="relative">
              <input
                type="text"
                value={selectedCategory}
                readOnly
                onClick={() =>
                  setIsCategoryDropdownOpen(!isCategoryDropdownOpen)
                }
                placeholder="Select food category"
                className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 focus:outline-none text-white placeholder-purple-200 text-sm cursor-pointer"
              />
              {selectedCategory && (
                <button
                  onClick={handleClearCategory}
                  className="absolute right-8 top-1/2 -translate-y-1/2 text-purple-200 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
              <div
                className={`absolute right-2 top-1/2 -translate-y-1/2 text-purple-200 text-xs transition-transform ${
                  isCategoryDropdownOpen ? 'rotate-180' : ''
                }`}
              >
                ▼
              </div>
            </div>

            {/* Category Dropdown */}
            {isCategoryDropdownOpen && (
              <div className="absolute z-50 w-full mt-1 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-[24rem] overflow-y-auto animate-fadeIn">
                <div className="p-1">
                  {foodCategories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setPage(() => 1)
                        handleCategorySelect(category)
                      }}
                      className={`w-full text-left px-3 py-3 rounded-lg transition-all duration-200 text-base ${
                        selectedCategory === category
                          ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md'
                          : 'text-gray-700 hover:bg-purple-50 hover:scale-105'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category}</span>
                        {selectedCategory === category && (
                          <span className="text-white">✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                  {selectedCategory && (
                    <button
                      onClick={handleClearCategory}
                      className="w-full text-left px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg border-t border-gray-200 mt-1 font-medium text-base"
                    >
                      🗑️ Clear Category
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-purple-100 text-xs font-medium mb-1">
              📊 Filter by Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => {
                const value = e.target.value
                setStatusFilter(() => value)
                setPage(() => 1)
              }}
              className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 focus:outline-none text-black text-sm cursor-pointer"
            >
              <option value="Available">✅ Available</option>
              <option value="SoldOut">❌ SoldOut</option>
              <option value="ComingSoon">⏳ ComingSoon</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table with InfiniteScroll */}
      <InfiniteScroll
        dataLength={foodItems.length}
        next={fetchFoodList}
        hasMore={hasMore}
        scrollThreshold={0.8}
        loader={
          !hasMore && (
            <div className="text-center py-4 text-gray-500">
              ⏳ Loading more items...
            </div>
          )
        }
        className="overflow-auto max-h-96 custom-scrollbar"
      >
        {foodItems && foodItems.length > 0 ? (
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  🖼️ Image
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  🍕 Food Item
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  📁 Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  📈 Current Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  ⚡ Change Status
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-100">
              <AnimatePresence>
                {foodItems.map((item) => (
                  <motion.tr
                    key={item._id}
                    layout
                    initial="hidden"
                    variants={{
                      hidden: {},
                      loading: {
                        opacity: 1,
                      },
                    }}
                    animate={
                      isStatusUpdating && updateStatusData?.id === item._id
                        ? 'loading'
                        : 'hidden'
                    }
                    className={`transition-all ${
                      isStatusUpdating && updateStatusData?.id !== item._id
                        ? 'opacity-50 pointer-events-none'
                        : 'opacity-100'
                    }`}
                  >
                    {isStatusUpdating && updateStatusData?.id === item._id && (
                      <motion.span
                        className="text-green-600 font-medium text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{ zIndex: 50 }}
                        animate={{
                          opacity: [0.3, 1, 0.3],
                          scale: [1, 1.05, 1],
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        Loading.....
                      </motion.span>
                    )}
                    {/* Image */}
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200">
                        {item.s3Url ? (
                          <img
                            src={item.s3Url}
                            alt={item.productName}
                            className="w-full h-full object-cover"
                          />
                        ) : item.blurHash ? (
                          <BlurhashCanvas
                            hash={item.blurHash}
                            width={48}
                            height={48}
                            punch={1}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                            No Image
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Name & Category */}
                    <td className="px-4 py-3">{item.productName}</td>
                    <td className="px-4 py-3 text-blue-600 font-semibold">
                      {item.foodCategory}
                    </td>

                    {/* Current Status */}
                    <td className="px-4 py-3">
                      <motion.span
                        className={`${getStatusColor(item.availability)} flex items-center`}
                        animate={
                          isStatusUpdating && updateStatusData?.id === item._id
                            ? {
                                scale: [1, 1.1, 1],
                                transition: {
                                  duration: 0.8,
                                  ease: 'easeInOut',
                                },
                              }
                            : { scale: 1 }
                        }
                      >
                        <span className="mr-2">
                          {getStatusIcon(item.availability)}
                        </span>
                        {item.availability}
                      </motion.span>
                    </td>

                    {/* Change Status */}
                    <td className="px-4 py-3">
                      <div className="relative" ref={statusDropdownRef}>
                        <button
                          onClick={() => handleStatusDropdownToggle(item)}
                          disabled={isStatusUpdating}
                          className={`bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                            isStatusUpdating
                              ? 'opacity-50 cursor-not-allowed'
                              : 'hover:scale-105'
                          }`}
                        >
                          ⚡ <span>Change</span>
                          <span
                            className={`text-xs transition-transform ${
                              selectedItem?._id === item._id ? 'rotate-180' : ''
                            }`}
                          >
                            ▼
                          </span>
                        </button>

                        {selectedItem?._id === item._id && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute z-30 w-full mt-1 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden"
                          >
                            {['Available', 'SoldOut', 'ComingSoon'].map(
                              (status) => (
                                <button
                                  key={status}
                                  onClick={() =>
                                    handleStatusChange(item._id, status)
                                  }
                                  disabled={isStatusUpdating}
                                  className={`w-full text-left px-3 py-2 flex items-center text-sm rounded-lg ${getStatusOptionColor(status)} ${
                                    isStatusUpdating
                                      ? 'opacity-50 cursor-not-allowed'
                                      : ''
                                  }`}
                                >
                                  {getStatusIcon(status)}
                                  <span className="ml-2">{status}</span>
                                </button>
                              )
                            )}
                          </motion.div>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        ) : (
          <div className="w-full text-center py-10 text-gray-500 text-sm font-medium">
            📭 No food items found.
          </div>
        )}
      </InfiniteScroll>
    </div>
  )
}

export default Staff_Stock_Alert_Table_UI
