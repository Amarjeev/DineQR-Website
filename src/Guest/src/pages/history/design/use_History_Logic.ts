// ---------------------- Logic Hook ----------------------
// This file contains all the logic, state, and helper functions for the History_UI component.

import { useState, useEffect, useMemo } from 'react'
import { type OrderType } from '../logic/use_get_Orders'
import { use_get_date } from '../logic/use_get_date'
import { use_get_Orders } from '../logic/use_get_Orders'
import { Clock, CheckCircle, XCircle, Utensils, Package } from 'lucide-react'

export const useHistoryLogic = () => {
  // ---------------------- State ----------------------
  const [selectedDate, setSelectedDate] = useState<string[]>(() => {
    const saved = sessionStorage.getItem('selectedDate')
    return saved ? JSON.parse(saved) : []
  })

  const [selectedOrder, setSelectedOrder] = useState<string>(() => {
    return sessionStorage.getItem('selectedOrder') || ''
  })

  const [currentView, setCurrentView] = useState<
    'dates' | 'orders' | 'details'
  >(() => {
    // Load from sessionStorage on first render
    const savedView = sessionStorage.getItem('currentView')
    return (savedView as 'dates' | 'orders' | 'details') || 'dates'
  })
  const [loadingDates, setLoadingDates] = useState(false)
  const [loadingOrders, setLoadingOrders] = useState(false)

  const { handle_Get_dates_ApiCall, dates } = use_get_date()
  const { handle_Get_Orders_ApiCall, orders } = use_get_Orders()

  // Save to sessionStorage whenever currentView changes
  useEffect(() => {
    sessionStorage.setItem('currentView', currentView)
  }, [currentView])

  // Persist selectedDate to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('selectedDate', JSON.stringify(selectedDate))
  }, [selectedDate])

  // Persist selectedOrder to sessionStorage
  useEffect(() => {
    sessionStorage.setItem('selectedOrder', selectedOrder)
  }, [selectedOrder])

  // ---------------------- Effects ----------------------
  useEffect(() => {
    const fetchDates = async () => {
      setLoadingDates(true)
      await handle_Get_dates_ApiCall()
      setLoadingDates(false)
    }
    fetchDates()
  }, [])

  useEffect(() => {
    if (!selectedOrder) return
    const fetchOrders = async () => {
      setLoadingOrders(true)
      await handle_Get_Orders_ApiCall(selectedOrder)
      setLoadingOrders(false)
    }
    fetchOrders()
  }, [selectedOrder])

  // ---------------------- Utility Functions ----------------------
  const getStatusConfig = (order: OrderType) => {
    if (!order) {
      return {
        color: 'gray',
        text: 'Unknown',
        icon: Clock,
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        textColor: 'text-gray-700',
      }
    }

    if (order.orderCancelled)
      return {
        color: 'red',
        text: 'Cancelled',
        icon: XCircle,
        bg: 'bg-red-50',
        border: 'border-red-200',
        textColor: 'text-red-700',
      }
    if (!order.orderAccepted)
      return {
        color: 'yellow',
        text: 'Pending',
        icon: Clock,
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        textColor: 'text-yellow-700',
      }
    if (order.orderAccepted && !order.orderDelivered)
      return {
        color: 'orange',
        text: 'Preparing',
        icon: Utensils,
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        textColor: 'text-orange-700',
      }
    if (order.orderDelivered && !order.paymentStatus)
      return {
        color: 'blue',
        text: 'Delivered',
        icon: Package,
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        textColor: 'text-blue-700',
      }
    if (order.paymentStatus)
      return {
        color: 'green',
        text: 'Completed',
        icon: CheckCircle,
        bg: 'bg-green-50',
        border: 'border-green-200',
        textColor: 'text-green-700',
      }

    return {
      color: 'gray',
      text: 'Unknown',
      icon: Clock,
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      textColor: 'text-gray-700',
    }
  }

  const calculateTotal = (order: OrderType) => {
    if (!order?.items) return 0
    return order.items.reduce(
      (sum, item) =>
        sum +
        (item.portions?.reduce(
          (itemSum, portion) => itemSum + (portion.subtotal || 0),
          0
        ) || 0),
      0
    )
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    } catch {
      return 'Invalid Date'
    }
  }

  const formatTime = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })
    } catch {
      return 'Invalid Time'
    }
  }

  // ---------------------- Navigation ----------------------
  const handleDateSelect = (orderIdsArray: string[]) => {
    setSelectedDate(orderIdsArray)
    setCurrentView('orders')
  }

  const handleOrderSelect = (orderId: string) => {
    setSelectedOrder(orderId)
    setCurrentView('details')
  }

  const handleBack = () => {
    if (currentView === 'details') {
      setCurrentView('orders')
      setSelectedOrder('')
    } else if (currentView === 'orders') {
      setCurrentView('dates')
    }
  }

  // ---------------------- Safe Access ----------------------
  const safeItems = useMemo(() => orders?.items || [], [orders])
  const safeDates = useMemo(() => dates || [], [dates])

  // ---------------------- Return to UI ----------------------
  return {
    currentView,
    selectedDate,
    selectedOrder,
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
  }
}
