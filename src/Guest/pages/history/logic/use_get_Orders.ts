import { useState } from 'react'
import axios from 'axios'
import { showError } from '../../../utils/toast'
import { BaseUrl } from '../../../../BaseUrl/BaseUrl'

interface Portion {
  portion: string
  price: number
  quantity: number
  subtotal: number
}

interface Item {
  _id: string
  name: string
  portions: Portion[]
}

export interface OrderType {
  _id: { $oid: string }
  hotelKey: string
  orderId: string
  orderedBy: string
  orderedById: string
  mobileNumber: string
  email: string
  orderType: string
  tableNumber: string
  items: Item[]
  orderCancelled: boolean
  orderCancelationReason: string
  kitchOrderCancelation: boolean
  kitchOrdercancelationReason: string
  orderAccepted: boolean
  orderDelivered: boolean
  paymentStatus: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export const use_get_Orders = () => {
  const [orders, setOrders] = useState<OrderType | null>(null)

  // 🔹 Fetch orders by date
  const handle_Get_Orders_ApiCall = async (orderId: string) => {
    try {
      const response = await axios.get(`${BaseUrl}guest/get/order/${orderId}`, {
        withCredentials: true,
      })

      if (response.data?.success) {
        setOrders(response.data.data || [])
      }
    } catch (err: any) {
      console.error('❌ Error fetching order dates:', err)
      showError('Error fetching order dates')
    }
  }

  return { handle_Get_Orders_ApiCall, orders }
}
