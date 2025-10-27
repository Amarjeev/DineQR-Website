import React from 'react'
import { use_DashNavbar_Logic } from './use_DashNavbar_Logic'

const Staff_Dash_Navbar_UI: React.FC = () => {
  const {
    isProfileOpen,
    staffData,
    profileRef,
    handleProfileToggle,
    handle_Logout_ApiCall,
  } = use_DashNavbar_Logic()

  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img
              src="/Logo/logo_Home.png"
              alt="DineQR Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
            />
            <span className="text-xl sm:text-2xl font-bold text-black">DineQR</span>
          </div>

          {/* Profile / Settings Dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={handleProfileToggle}
              className="flex items-center justify-center w-10 h-10 hover:bg-gray-200 rounded-lg transition-all duration-200"
            >
              <span className="text-xl">⚙️</span>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                {/* Staff Info */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{staffData.name}</p>
                  <p className="text-xs text-gray-500 mt-1">Staff ID: {staffData.staffId || 'N/A'}</p>
                </div>

                {/* Logout Button */}
                <div className="px-2 pt-2">
                  <button
                    onClick={handle_Logout_ApiCall}
                    className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-all duration-200"
                  >
                    <span className="mr-2">🚪</span> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Staff_Dash_Navbar_UI
