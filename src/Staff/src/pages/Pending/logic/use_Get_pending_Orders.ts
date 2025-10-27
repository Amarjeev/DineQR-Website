import { useEffect, useState } from 'react'
import { socket } from '../../../config/Socket'
import { showError } from '../../../utils/toast'
import { type Order } from '../design/use_Approved_Orders'
import { type DisplayOrder } from '../design/use_Approved_Orders'

export const use_Get_pending_Orders = () => {
  const [orders, setOrders] = useState<DisplayOrder[]>([])

  useEffect(() => {
    const hotelKey = sessionStorage.getItem('DineQR_hotelKey') || ''
    if (!hotelKey) {
      showError('Something went wrong, please try again')
      return
    }

    // 🚪 Join hotel-specific confirmed orders channel
    socket.emit('joinHotelConfirmedOrdersChannel', hotelKey)

    /**
     * 📥 HANDLE INITIAL CONFIRMED ORDERS
     * Processes and maps order data for display
     */
    const handleConfirmOrders = (orderData: Order | Order[]) => {
      // Always work with an array
      const ordersArray = Array.isArray(orderData) ? orderData : [orderData]

      // Map incoming orders into display-ready format
      const mappedOrders: DisplayOrder[] = ordersArray.map((order) => {
        const flattenedItems = order.items.flatMap((item) =>
          item.portions.map((portion) => ({
            name: `${item.name} (${portion.portion})`,
            price: portion.price,
            quantity: portion.quantity,
          }))
        )

        const total = order.items.reduce(
          (acc, item) =>
            acc +
            item.portions.reduce(
              (portionSum, portion) =>
                portionSum +
                (portion.subtotal || portion.price * portion.quantity),
              0
            ),
          0
        )

        return {
          id: order._id?.$oid ?? String(order._id),
          orderId: order.orderId,
          tableNumber: order.tableNumber || '',
          orderDateTime: order.createdAt,
          orderType: order.orderType === 'dining' ? 'Dine-in' : 'Parcel',
          status: order.orderAccepted
            ? order.orderCancelled
              ? 'Preparing'
              : 'Cooking'
            : 'Preparing',
          mobileNo: order.mobileNumber,
          items: flattenedItems,
          totalAmount: total,
          cookingStartTime: order.updatedAt,
          estimatedReadyTime: new Date(
            new Date(order.updatedAt).getTime() + 30 * 60 * 1000
          ).toISOString(),
          viewClickTime: new Date().toISOString(),
        }
      })

      // ✅ Merge updates into existing state instead of replacing
      setOrders((prevOrders) => {
        const updatedOrders = [...prevOrders]

        mappedOrders.forEach((newOrder) => {
          const index = updatedOrders.findIndex(
            (o) => o.orderId === newOrder.orderId
          )

          if (index !== -1) {
            // Replace existing order (live update)
            updatedOrders[index] = { ...updatedOrders[index], ...newOrder }
          } else {
            // Add new order
            updatedOrders.push(newOrder)
          }
        })

        return [...updatedOrders] // new array reference to trigger re-render
      })
    }

      const handleOrderDelivered = (orderId: string) => {
      setOrders((prevOrders) => {
        // Filter out the delivered order
        const updatedOrders = prevOrders.filter(
          (order) => order.orderId !== orderId
        )

        return [...updatedOrders] // Return new array reference to trigger re-render
      })
    }

    /**
     * 🔌 HANDLE CONNECTION ERRORS
     */
    const handleConnectionError = (err: Error) => {
      console.error('Connection error:', err.message)
    }

    // 📡 Register socket event listeners
    socket.on('confirmOrders', handleConfirmOrders)
    socket.on('orderDelivered', handleOrderDelivered)
    socket.on('connect_error', handleConnectionError)

    // 🧹 Cleanup on unmount
    return () => {
      socket.off('confirmOrders', handleConfirmOrders)
      socket.off('orderDelivered', handleOrderDelivered)
      socket.off('connect_error', handleConnectionError)
    }
  }, [])

  return { orders, setOrders }
}
