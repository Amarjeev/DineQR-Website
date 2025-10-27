import {
  CheckCheck,
  Trash2,
  Bell,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'

import { use_Notification_Logic } from './use_Notification_Logic'

const Staff_Notification_MessageUI: React.FC = () => {
  // ==============================================
  // 🧩 NOTIFICATION LOGIC HOOK
  // ==============================================

  // Destructure functions and states from custom notification hook
  const {
    handleNotificationAction,
    setActiveTab,
    activeTab,
    // markAllAsRead,
    itemCount,
    displayedNotifications,
  } = use_Notification_Logic()

  return (
    <div className="min-h-screen bg-gradient-to-br  flex items-center justify-center p-2">
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-100 p-6 lg:p-10">
        {/* ============================================== */}
        {/* 🧩 HEADER SECTION */}
        {/* ============================================== */}

        <div className="flex flex-wrap justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-2xl shadow-inner">
              <Bell className="text-blue-600" size={26} />
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                Notifications
              </h2>
              <p className="text-gray-600 text-sm">
                {activeTab === 'new'
                  ? `${itemCount} ${itemCount === 1 ? 'new message' : 'new messages'}`
                  : `${itemCount} ${itemCount === 1 ? 'read message' : 'read messages'}`}
              </p>
            </div>
          </div>

          {/* ============================================== */}
          {/* 🧩 MARK ALL AS READ BUTTON */}
          {/* ============================================== */}

          {/* Show mark all as read button only when there are unread notifications and on new tab */}
          {/* {itemCount > 0 && activeTab === 'new' && (
            <button
              onClick={markAllAsRead}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md transition-all duration-300 hover:scale-105"
            >
              Mark all read
            </button>
          )} */}
        </div>

        {/* ============================================== */}
        {/* 🧩 TAB NAVIGATION */}
        {/* ============================================== */}

        <div className="flex justify-center mb-6">
          <div className="inline-flex bg-gray-100 p-1 rounded-xl shadow-inner">
            {/* New Messages Tab Button */}
            <button
              onClick={() => setActiveTab('new')}
              className={`px-5 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                activeTab === 'new'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              New Messages
            </button>

            {/* Read Messages Tab Button */}
            <button
              onClick={() => setActiveTab('read')}
              className={`px-5 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                activeTab === 'read'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              Read Messages
            </button>
          </div>
        </div>

        {/* ============================================== */}
        {/* 🧩 NOTIFICATION LIST SECTION */}
        {/* ============================================== */}

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
          <div className="max-h-[450px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
            {/* ============================================== */}
            {/* 🧩 EMPTY STATE HANDLING */}
            {/* ============================================== */}

            {displayedNotifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                {/* Empty state for new messages tab */}
                {activeTab === 'new' ? (
                  <>
                    <AlertTriangle size={40} className="text-gray-400 mb-3" />
                    <h3 className="text-gray-600 text-sm">No new messages</h3>
                  </>
                ) : (
                  /* Empty state for read messages tab */
                  <>
                    <CheckCircle size={40} className="text-gray-400 mb-3" />
                    <h3 className="text-gray-600 text-sm">No read messages</h3>
                  </>
                )}
              </div>
            ) : (
              /* ============================================== */
              /* 🧩 NOTIFICATION ITEMS LIST */
              /* ============================================== */

              displayedNotifications.map((n) => (
                <div
                  key={n._id}
                  className={`p-4 rounded-xl flex justify-between items-start group transition-all ${
                    activeTab === 'new'
                      ? 'bg-white border-l-4 border-blue-500 hover:bg-blue-100'
                      : ' hover:bg-gray-100'
                  }`}
                >
                  {/* Notification Message Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-sm md:text-base leading-5 ${
                        activeTab === 'new'
                          ? 'text-gray-900 font-medium'
                          : 'text-gray-700'
                      }`}
                    >
                      {n.messageContent}
                    </p>
                  </div>

                  {/* ============================================== */}
                  {/* 🧩 NOTIFICATION ACTION BUTTONS */}
                  {/* ============================================== */}

                  <div className="flex items-center gap-1 ml-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* Mark as Read Button - Only shown for new notifications */}
                    {activeTab === 'new' && (
                      <button
                        onClick={() =>
                          handleNotificationAction(n._id, 'markRead')
                        }
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                        title="Mark as read"
                      >
                        <CheckCheck size={18} />
                      </button>
                    )}

                    {/* Delete Button - Shown for both new and read notifications */}
                    <button
                      onClick={() => handleNotificationAction(n._id, 'delete')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Staff_Notification_MessageUI
