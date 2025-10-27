import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Mgr_Settings_Navbar_UI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  // Function to check if the current path matches the link
  const isActiveLink = (path: string) => {
    return location.pathname === path
  }

  // Set default active link to profile if no specific setting is selected
  const isDefaultActive = (path: string) => {
    // If current path is exactly /settings, consider profile as active
    if (location.pathname === '/settings' && path === '/settings/profile') {
      return true
    }

    return location.pathname === path
  }

  return (
    <nav className="bg-gray-100 rounded-xl shadow-md p-4">
      {/* Top bar with hamburger on small screens */}
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold block sm:hidden">Settings</div>
        <button
          className="sm:hidden text-gray-700 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Hamburger icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Links */}
      <div
        className={`mt-4 sm:mt-0 sm:flex sm:justify-center sm:space-x-8 ${
          isOpen ? 'block' : 'hidden sm:block'
        }`}
      >
        <Link
          to="/manager-dashboard/food/dishes"
          className={`block sm:inline-block transition font-medium py-1 px-3 rounded-lg ${
            isActiveLink('/manager-dashboard/food/dishes')
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          Home
        </Link>

        <Link
          to="/settings/profile"
          className={`block sm:inline-block transition font-medium py-1 px-3 rounded-lg ${
            isDefaultActive('/settings/profile')
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          Profile
        </Link>

        <Link
          to="/settings/hotel-info"
          className={`block sm:inline-block transition font-medium py-1 px-3 rounded-lg ${
            isActiveLink('/settings/hotel-info')
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          Hotel Information
        </Link>

        <Link
          to="/settings/account"
          className={`block sm:inline-block transition font-medium py-1 px-3 rounded-lg ${
            isActiveLink('/settings/account')
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          Account
        </Link>

        <Link
          to="/settings/staff-account"
          className={`block sm:inline-block transition font-medium py-1 px-3 rounded-lg ${
            isActiveLink('/settings/staff-account')
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          Staff Account
        </Link>
        <Link
          to="/settings/Qr-code"
          className={`block sm:inline-block transition font-medium py-1 px-3 rounded-lg ${
            isActiveLink('/settings/Qr-code')
              ? 'bg-blue-600 text-white shadow-md'
              : 'text-gray-700 hover:text-gray-900 hover:bg-gray-200'
          }`}
        >
          QR Code
        </Link>
      </div>
    </nav>
  )
}

export default Mgr_Settings_Navbar_UI
