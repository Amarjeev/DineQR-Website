import { io, Socket } from 'socket.io-client'

interface ServerToClientEvents {
  newOrder: (order: any) => void
  initialOrders: (order: any) => void
  confirmOrders: (order: any) => void
  initialNotifications: (notification: any) => void
  newNotification: (notification: any) => void
  markReadNotifications: (notification: any) => void
  markReadNewNotification: (notification: any) => void
  orderDelivered: (orderId: any) => void
}

interface ClientToServerEvents {
  joinHotelOrdersChannel: (hotelKey: string) => void
  joinHotelConfirmedOrdersChannel: (hotelKey: string) => void
  joinHotelNotificationChannel: (params: {
    hotelKey: string
    staffUserId: string
  }) => void
}

// ✅ Use Render in production, localhost in dev
const SERVER_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:5000"
    : "https://dineqr-backend-3.onrender.com/api/v1/";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SERVER_URL,
  {
    withCredentials: true,
    extraHeaders: { 'my-custom-header': 'DineQR' },
  }
)
