import { useState, useEffect } from 'react'
import { showError } from '../../../utils/toast'
import { socket } from '../../../config/Socket'

export const use_Get_notifications = () => {
  // ==============================================
  // 🧩 NOTIFICATION STATE MANAGEMENT
  // ==============================================
  
  // State for storing unread notifications
  const [notifications, setNotifications] = useState<any[]>([])
  
  // State for storing read notifications
  const [markreadNotifications, setMarkReadNotifications] = useState<any[]>([])

  // ==============================================
  // 🧩 JOIN NOTIFICATION CHANNEL
  // ==============================================
  
  // Join socket channel for hotel notifications
  // Retrieves hotelKey and staffUserId from sessionStorage
  // Emits join event to socket server
  const handle_Fetch_Notification = () => {
    const hotelKey = sessionStorage.getItem('DineQR_hotelKey') || ''
    const staffUserId = sessionStorage.getItem('staff-userId') || ''

    // Validate required session storage data exists
    if (!hotelKey || !staffUserId) {
      showError('Something went wrong, please try again')
      return
    }

    // Emit socket event to join notification channel
    socket.emit('joinHotelNotificationChannel', { hotelKey, staffUserId })
  }

  // ==============================================
  // 🧩 SOCKET EVENT LISTENERS SETUP
  // ==============================================
  
  // Setup socket listeners for notification events
  // Runs once on component mount
  useEffect(() => {
    // Remove existing listeners to prevent duplicates
    socket.off('initialNotifications')
    socket.off('newNotification')
    socket.off('markReadNotifications')
    socket.off('markReadNewNotification')

    // ==============================================
    // 🧩 INITIAL NOTIFICATIONS LISTENER
    // ==============================================
    
    // Handle initial batch of notifications from server
    socket.on('initialNotifications', (data: any[]) => {
      setNotifications(data || [])
    })

    // ==============================================
    // 🧩 NEW NOTIFICATION LISTENER
    // ==============================================
    
    // Handle incoming real-time notifications
    socket.on('newNotification', (item: any) => {
      setNotifications((prev) => {
        // ✅ Avoid duplicates by checking ID
        if (prev.find((n) => (n._id || n.id) === (item._id || item.id))) {
          return prev
        }
        return [item, ...prev]
      })
    })

    // ==============================================
    // 🧩 BATCH READ NOTIFICATIONS LISTENER
    // ==============================================
    
    // Handle batch mark-as-read operations
    socket.on('markReadNotifications', (item: any) => {
      setMarkReadNotifications(item)
    })

    // ==============================================
    // 🧩 SINGLE READ NOTIFICATION LISTENER
    // ==============================================
    
    // Handle individual mark-as-read operations
    socket.on('markReadNewNotification', (item: any) => {
      setMarkReadNotifications((prev) => {
        // Avoid duplicate entries in read notifications
        if (prev.find((n) => (n._id || n.id) === (item._id || item.id))) {
          return prev
        }
        return [item, ...prev]
      })
    })

    // ==============================================
    // 🧩 CLEANUP SOCKET LISTENERS
    // ==============================================
    
    // Cleanup function to remove socket listeners on unmount
    // Prevents memory leaks and duplicate listeners
    return () => {
      socket.off('initialNotifications')
      socket.off('newNotification')
      socket.off('markReadNotifications')
      socket.off('markReadNewNotification')
    }
  }, []) // Empty dependency array ensures this runs only once

  // ==============================================
  // 🧩 RETURN EXPOSED VALUES AND FUNCTIONS
  // ==============================================
  
  return {
    notifications,
    setNotifications,
    markreadNotifications,
    setMarkReadNotifications,
    handle_Fetch_Notification,
  }
}