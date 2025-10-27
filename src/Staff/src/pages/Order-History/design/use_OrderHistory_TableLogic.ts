import { useState, useEffect, useRef } from 'react'
import { use_Get_OrderHistory } from '../logic/use_Get_OrderHistory'
import { use_Mark_Paid } from '../logic/use_Mark_Paid'

// ============================================================
// 🧾 FILTER INTERFACE
// ============================================================
export interface Filters {
  searchTerm: string
  date: string
  table: string
  status: string
  orderType: string
}

// ============================================================
// 🧩 CUSTOM HOOK FOR ORDER HISTORY TABLE LOGIC
// ============================================================
export const use_OrderHistory_TableLogic = () => {
  // ================== STATES ==================
  const [selectedOrder, setSelectedOrder] = useState<any>(null) // Currently selected order for modal
  const [isModalOpen, setIsModalOpen] = useState(false) // Modal open state
  const [isTableDropdownOpen, setIsTableDropdownOpen] = useState(false) // Table dropdown toggle
  const [tableNumbers, setTableNumbers] = useState<{ name: string }[]>([]) // Table list
  const [message, setMessage] = useState<string>('') // Feedback messages for user

  const { handle_Mark_Paid_ApiCall, markPaidLoading } = use_Mark_Paid();

  // Destructure state and methods from custom hook that fetches order data
  const {
    orders,
    loading,
    handle_Fetch_OrderHistory_ApiCall,
    handle_Fetch_MoreOrders,
    hasMore,
  } = use_Get_OrderHistory()

  // Filters state
  const [filters, setFilters] = useState<Filters>({
    searchTerm: '',
    date: '',
    table: '',
    status: '',
    orderType: '',
  })

  // Reset message whenever filters change
  useEffect(() => {
    setMessage('')
  }, [filters])

  // Ref for handling outside click of table dropdown
  const tableDropdownRef = useRef<HTMLDivElement>(null)

  // ================== EFFECTS ==================
  // Load table numbers from session storage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('tableList')
    if (stored) setTableNumbers(JSON.parse(stored))
  }, [])

  // Close table dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        tableDropdownRef.current &&
        !tableDropdownRef.current.contains(event.target as Node)
      ) {
        setIsTableDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // ================== HANDLERS ==================
  // Open modal with selected order
  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  // Close modal
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedOrder(null)
  }

  // Select table from dropdown
  const handleTableSelect = (tableName: string) => {
    setFilters({ ...filters, table: tableName })
    setIsTableDropdownOpen(false)
  }

  // Clear table filter only
  const handleClearTableFilter = () => {
    setFilters({ ...filters, table: '' })
    setIsTableDropdownOpen(false)
  }

  // Clear all filters
  const handleClearFilters = () => {
    setFilters({
      searchTerm: '',
      date: '',
      table: '',
      status: '',
      orderType: '',
    })
  }

  // Submit filters and fetch data
  const handleSubmitFilters = () => {
    const isAnyFilterApplied =
      filters.searchTerm ||
      filters.date ||
      filters.table ||
      filters.status ||
      filters.orderType

    // Show message if no filters applied
    if (!isAnyFilterApplied) {
      return setMessage('No filters applied. You will see all orders. 😊')
    }

    // Check if table number is selected for Dine-in
    if (filters.orderType === 'dining') {
      if (!filters.table) {
        setMessage('⚠️ Please select a table number for Dine-in orders.')
        return
      }
    }

    setMessage('') // Clear message if filters valid
    handle_Fetch_OrderHistory_ApiCall(filters) // Fetch orders
  }

  // ================== HELPERS ==================
  // Return status color classes for order
  const getStatusColor = (order: any) => {
    if (order.orderCancelled) return 'bg-red-100 text-red-800'
    if (order.orderDelivered) return 'bg-green-100 text-green-800'
    return 'bg-yellow-100 text-yellow-800'
  }

  // Return status text for order
  const getStatusText = (order: any) => {
    if (order.orderCancelled) return 'Cancelled'
    if (order.orderDelivered) return 'Completed'
    return 'Pending'
  }

  // Return payment status color
  const getPaymentStatusColor = (paymentStatus: boolean) =>
    paymentStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'

  // Return payment status text
  const getPaymentStatusText = (paymentStatus: boolean) =>
    paymentStatus ? 'Paid' : 'Unpaid'

  // Convert order type code to text
  const getOrderTypeText = (orderType: string) =>
    orderType === 'dining' ? 'Dine-in' : 'Parcel'

  // Calculate total amount of an order
  const calculateTotalAmount = (items: any[]) =>
    items.reduce(
      (total, item) =>
        total +
        item.portions.reduce(
          (itemTotal: number, portion: any) => itemTotal + portion.subtotal,
          0
        ),
      0
    )

  // Format date string
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString()

   // ================== Mark-Paid API Calling ==================

  // ================== RETURN VALUES ==================
  return {
    selectedOrder,
    isModalOpen,
    isTableDropdownOpen,
    tableNumbers,
    filters,
    tableDropdownRef,
    handleViewOrder,
    handleCloseModal,
    handleTableSelect,
    handleClearTableFilter,
    handleClearFilters,
    handleSubmitFilters,
    getStatusColor,
    getStatusText,
    getPaymentStatusColor,
    getPaymentStatusText,
    getOrderTypeText,
    calculateTotalAmount,
    formatDate,
    setFilters,
    setIsTableDropdownOpen,
    message,
    orders,
    loading,
    handle_Fetch_MoreOrders,
    hasMore,
    handle_Mark_Paid_ApiCall,
    markPaidLoading
  }
}
