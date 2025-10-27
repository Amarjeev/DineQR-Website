import { useState, useEffect, useRef } from 'react'
import { foodCategories } from '../../../Data/FoodCategory'
import { use_Get_MenuItems } from '../logic/use_Get_Menue_Items'
import { use_Update_Status } from '../logic/use_Update_Status'

// ============================================================================
// 🎯 Hook: useStockAlertLogic
// ============================================================================
export const useStockAlertLogic = () => {
  // --------------------------------------------------------------------------
  // ⚙️ State: Dropdown toggles
  // --------------------------------------------------------------------------
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false)
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] = useState(false)

  // --------------------------------------------------------------------------
  // ⚙️ Refs: Detect clicks outside dropdowns
  // --------------------------------------------------------------------------
  const categoryDropdownRef = useRef<HTMLDivElement>(null)
  const statusDropdownRef = useRef<HTMLDivElement>(null)

  // --------------------------------------------------------------------------
  // ⚙️ Use menu items hook for fetching and managing items
  // --------------------------------------------------------------------------
  const {
    selectedCategory,
    setSelectedCategory,
    statusFilter,
    setStatusFilter,
    foodItems,
    isLoading,
    selectedItem,
    setSelectedItem,
    setFoodItems,
    fetchFoodList,
    hasMore,
    setPage,
  } = use_Get_MenuItems()

  const { setUpdateStatusData, isStatusUpdating, updateStatusData } =
    use_Update_Status()

  // --------------------------------------------------------------------------
  // 🔄 Effect: Click outside detection for dropdowns
  // --------------------------------------------------------------------------
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target as Node)
      )
        setIsCategoryDropdownOpen(false)

      if (
        statusDropdownRef.current &&
        !statusDropdownRef.current.contains(event.target as Node)
      )
        setIsStatusDropdownOpen(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // --------------------------------------------------------------------------
  // 🔄 Event Handlers: Category selection and clearing filters
  // --------------------------------------------------------------------------
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
    setIsCategoryDropdownOpen(false)
  }

  const handleClearCategory = () => {
    setFoodItems([]) // Clear items
    setSelectedCategory('') // Reset category
  }

  const handleClearFilters = () => {
    setFoodItems([]) // Clear items
    setSelectedCategory('') // Reset category
    setStatusFilter('') // Reset status filter
  }

  // --------------------------------------------------------------------------
  // 🔄 Event Handlers: Status changes
  // --------------------------------------------------------------------------
  const handleStatusChange = (id: string, status: string) => {
    setUpdateStatusData({ id, status })
    setFoodItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, availability: status } : item
      )
    )
    setIsStatusDropdownOpen(true) // Keep dropdown open after status change
    setSelectedItem(null) // Clear selected item
  }

  const handleStatusDropdownToggle = (item: any) => {
    setSelectedItem(item) // Set clicked item as selected
    setIsStatusDropdownOpen(!isStatusDropdownOpen) // Toggle dropdown
  }

  // --------------------------------------------------------------------------
  // 🎨 UI Helpers: Status colors and icons
  // --------------------------------------------------------------------------
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'text-green-600 font-bold'
      case 'Sold Out':
        return 'text-red-600 font-bold'
      case 'Coming Soon':
        return 'text-yellow-600 font-bold'
      default:
        return 'text-gray-600 font-bold'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Available':
        return '✅'
      case 'Sold Out':
        return '❌'
      case 'Coming Soon':
        return '⏳'
      default:
        return '❓'
    }
  }

  const getStatusOptionColor = (status: string) => {
    switch (status) {
      case 'Available':
        return ' text-green-700 border-green-200 hover:bg-green-100'
      case 'Sold Out':
        return ' text-red-700 border-red-200 hover:bg-red-100'
      case 'Coming Soon':
        return ' text-yellow-700 border-yellow-200 hover:bg-yellow-100'
      default:
        return ' text-gray-700 border-gray-200 hover:bg-gray-100'
    }
  }

  // --------------------------------------------------------------------------
  // 🔗 Return: States, refs, handlers, and helpers for UI
  // --------------------------------------------------------------------------
  return {
    foodCategories,
    foodItems,
    selectedCategory,
    statusFilter,
    isCategoryDropdownOpen,
    isStatusDropdownOpen,
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
    isLoading,
    setPage,
    fetchFoodList,
    hasMore,
    isStatusUpdating,
    updateStatusData,
  }
}
