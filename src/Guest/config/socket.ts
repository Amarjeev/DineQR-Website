import { io, Socket } from 'socket.io-client'

interface ServerToClientEvents {
  initialGuestOrders: (order: any) => void
  updateGuestOrders: (orders: any) => void
  initialGuestNotifications: (orders: any) => void
  guestNewNotifications: (orders: any) => void
}

interface ClientToServerEvents {
  joinHotelGuestOrdersChannel: (params: {
    hotelKey: string
    userId: string
  }) => void
  joinHotelGuestNotificationChannel: (params: {
    hotelKey: string
    guestUserId: string
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
