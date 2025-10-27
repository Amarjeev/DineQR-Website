import { useState, useEffect } from 'react'
import { use_Get_notifications } from '../logic/use_Get_notifications'
import { use_Notification_Update } from '../logic/use_Notification_Update'

export const use_Notification_Logic = () => {
  // ==============================================
  // 🧩 ACTIVE TAB STATE MANAGEMENT
  // ==============================================

  // Initialize activeTab state from sessionStorage or default to 'new'
  // This maintains tab selection across page refreshes
  const [activeTab, setActiveTab] = useState<'new' | 'read'>(
    () => (sessionStorage.getItem('activeTab') as 'new' | 'read') || 'new'
  )

  // ==============================================
  // 🧩 PERSIST TAB SELECTION
  // ==============================================

  // Save activeTab to sessionStorage whenever it changes
  // Ensures user's tab preference is remembered
  useEffect(() => {
    sessionStorage.setItem('activeTab', activeTab)
  }, [activeTab])

  // ==============================================
  // 🧩 NOTIFICATION DATA HOOKS
  // ==============================================

  // Destructure notification management functions and states
  // handle_Fetch_Notification: Fetches notifications from API
  // notifications: Array of unread notifications
  // setNotifications: Setter for unread notifications
  // markreadNotifications: Array of read notifications
  // setMarkReadNotifications: Setter for read notifications
  const {
    handle_Fetch_Notification,
    notifications,
    setNotifications,
    markreadNotifications,
    setMarkReadNotifications,
  } = use_Get_notifications()

  // Destructure notification update API function
  // handle_Notification_Action_ApiCall: Makes API call to update notification status
  const { handle_Notification_Action_ApiCall } = use_Notification_Update()

  // ==============================================
  // 🧩 INITIAL DATA FETCH
  // ==============================================

  // Fetch notifications on component mount
  // Empty dependency array ensures this runs only once
  useEffect(() => {
    handle_Fetch_Notification()
  }, [])

  // ==============================================
  // 🧩 NOTIFICATION ACTION HANDLER
  // ==============================================

  // Handle individual notification actions (mark as read, etc.)
  // id: Notification ID to update
  // status: Action status to apply
  const handleNotificationAction = async (id: string, status: string) => {
    // Call API to update notification status
    await handle_Notification_Action_ApiCall(id, status)

    // Helper function to update notification lists
    // Marks target notification as read and filters out read notifications
    const updateList = (list: any[]) =>
      list
        .map((n) => ((n._id || n.id) === id ? { ...n, read: true } : n))
        .filter((n) => !n.read)

    // Update appropriate notification list based on active tab
    // If on 'new' tab, update unread notifications
    // If on 'read' tab, update read notifications
    activeTab === 'new'
      ? setNotifications(updateList)
      : setMarkReadNotifications(updateList)
  }

  // ==============================================
  // 🧩 BULK NOTIFICATION ACTIONS
  // ==============================================

  // Mark all notifications as read
  // Updates all notifications in unread list to have read: true
  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  // ==============================================
  // 🧩 COMPUTED VALUES
  // ==============================================

  // Notifications to display based on active tab selection
  // Shows unread notifications on 'new' tab, read notifications on 'read' tab
  const displayedNotifications =
    activeTab === 'new' ? notifications : markreadNotifications
  // Count of unread notifications for badge display
  const itemCount = displayedNotifications.length

  // ==============================================
  // 🧩 RETURN EXPOSED VALUES AND FUNCTIONS
  // ==============================================

  return {
    activeTab,
    setActiveTab,
    notifications,
    markreadNotifications,
    displayedNotifications,
    itemCount,
    handleNotificationAction,
    markAllAsRead,
  }
}
