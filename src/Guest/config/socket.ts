import { createSocketConnection } from '../../utils/socketConnection'

interface ServerToClientEvents {
  initialGuestOrders: (order: any) => void
  updateGuestOrders: (orders: any) => void
  initialGuestNotifications: (orders: any) => void
  guestNewNotifications: (orders: any) => void
  [event: string]: (...args: any[]) => void
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
  [event: string]: (...args: any[]) => void
}

export const socket = createSocketConnection<
  ServerToClientEvents,
  ClientToServerEvents
>()
