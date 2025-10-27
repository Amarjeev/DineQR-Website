import { createSocketConnection } from '../../utils/socketConnection'

interface ServerToClientEvents {
  newOrder: (order: any) => void
  initialOrders: (order: any) => void
  confirmOrders: (order: any) => void
  initialNotifications: (notification: any) => void
  newNotification: (notification: any) => void
  markReadNotifications: (notification: any) => void
  markReadNewNotification: (notification: any) => void
  orderDelivered: (orderId: any) => void
    [event: string]: (...args: any[]) => void;
}

interface ClientToServerEvents {
  joinHotelOrdersChannel: (hotelKey: string) => void
  joinHotelConfirmedOrdersChannel: (hotelKey: string) => void
  joinHotelNotificationChannel: (params: {
    hotelKey: string
    staffUserId: string
  }) => void
    [event: string]: (...args: any[]) => void;
}

// ✅ Create socket instance
export const socket = createSocketConnection<
  ServerToClientEvents,
  ClientToServerEvents
>();
