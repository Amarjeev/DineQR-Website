import { useState, useEffect } from 'react'
import { socket } from '../../../config/socket'

export const use_Notification = () => {
  // ✅ State to store notifications
  const [notifications, setNotifications] = useState<any[]>([])

    const handleUpdate = (newNotification: any) => {
    // Append new notifications to existing state
    setNotifications(prev => [newNotification, ...prev])
  }

  const handle_Get_Notification_ApiCall = async () => {
    const guestUserId = sessionStorage.getItem('guest-userId') || ''
    const hotelKey = sessionStorage.getItem('hotelKey') || ''

    if (!guestUserId || !hotelKey) return

    // Join hotel-specific notification channel
    socket.emit("joinHotelGuestNotificationChannel", { hotelKey, guestUserId })

    // Listen for initial notifications
    socket.once("initialGuestNotifications", (data: any[]) => {
      setNotifications(data) // Store in state
    })

    // Listen for real-time updates
    socket.on('guestNewNotifications', handleUpdate)
  }

  // Cleanup listeners on unmount
  useEffect(() => {
    return () => {
      socket.off('guestNewNotifications', handleUpdate)
      socket.off('initialGuestNotifications')
    }
  }, [])

  return { notifications, handle_Get_Notification_ApiCall }
}
