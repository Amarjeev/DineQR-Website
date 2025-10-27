import React, { useEffect, useState } from 'react'
import { use_Notification } from '../logic/use_Notification'
import {
  Bell,
  CheckCircle,
  XCircle,
  CreditCard,
  AlertTriangle,
  Star,
  Clock,
} from 'lucide-react'

type NotificationType =
  | 'accepted'
  | 'cancelled'
  | 'payment'
  | 'rejected'
  | 'completed'

const Guest_Notification_UI: React.FC = () => {
  const { handle_Get_Notification_ApiCall, notifications } = use_Notification()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true)
      await handle_Get_Notification_ApiCall()
      setLoading(false)
    }

    fetchNotifications()
  }, [])

  // Define gray-themed styles for different notification types
  const getNotificationTheme = (type: string | undefined) => {
    const defaultTheme = {
      icon: <Bell className="w-5 h-5 text-gray-600" />,
      bg: 'bg-gray-50',
      border: 'border-gray-200',
      dot: 'bg-gray-400',
    }

    if (!type) return defaultTheme

    const themes = {
      accepted: {
        icon: <CheckCircle className="w-5 h-5 text-gray-700" />,
        bg: 'bg-gray-100',
        border: 'border-gray-300',
        dot: 'bg-gray-700',
      },
      cancelled: {
        icon: <XCircle className="w-5 h-5 text-gray-700" />,
        bg: 'bg-gray-100',
        border: 'border-gray-300',
        dot: 'bg-gray-700',
      },
      payment: {
        icon: <CreditCard className="w-5 h-5 text-gray-700" />,
        bg: 'bg-gray-100',
        border: 'border-gray-300',
        dot: 'bg-gray-700',
      },
      rejected: {
        icon: <AlertTriangle className="w-5 h-5 text-gray-700" />,
        bg: 'bg-gray-100',
        border: 'border-gray-300',
        dot: 'bg-gray-700',
      },
      completed: {
        icon: <Star className="w-5 h-5 text-gray-700" />,
        bg: 'bg-gray-100',
        border: 'border-gray-300',
        dot: 'bg-gray-700',
      },
    }

    return themes[type as NotificationType] || defaultTheme
  }

  const getSafeNotificationData = (notif: any) => ({
    id: notif._id || notif.id || Math.random().toString(36).substr(2, 9),
    type: notif.type || 'completed',
    title: notif.title || 'Notification',
    message: notif.message || 'You have a new notification',
    time: notif.time || 'Just now',
  })

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 md:px-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-gray-300 rounded-2xl flex items-center justify-center shadow-md">
          <Bell className="w-6 h-6 text-gray-700" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
          <p className="text-sm text-gray-500">
            {loading ? 'Loading...' : `${notifications?.length || 0} unread`}
          </p>
        </div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 text-sm">Fetching notifications...</p>
        </div>
      ) : !notifications || notifications.length === 0 ? (
        /* Empty state */
        <div className="text-center py-16 px-4">
          <div className="w-24 h-24 bg-gray-200 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Bell className="w-12 h-12 text-gray-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No notifications</h3>
          <p className="text-gray-500 text-sm">You're all caught up!</p>
        </div>
      ) : (
        /* Notifications List */
        <div className="space-y-5">
          {notifications.map((notif: any) => {
            const safeNotif = getSafeNotificationData(notif)
            const theme = getNotificationTheme(safeNotif.type)

            return (
              <div
                key={safeNotif.id}
                className={`flex items-start gap-4 p-5 rounded-2xl ${theme.bg} border ${theme.border} shadow hover:shadow-lg transition-all duration-300 cursor-pointer`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${theme.dot} text-white shadow-md`}
                >
                  {theme.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-900 text-base truncate">{safeNotif.title}</h3>
                    <div className={`w-3 h-3 rounded-full ${theme.dot} flex-shrink-0`}></div>
                  </div>
                  <p className="text-gray-800 text-sm mb-2">{safeNotif.message}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>{safeNotif.time}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Guest_Notification_UI
