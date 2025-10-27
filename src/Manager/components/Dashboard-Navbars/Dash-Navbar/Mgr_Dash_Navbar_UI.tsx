import { useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'

const Mgr_Dash_Navbar_UI: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  const handleToggleMobileMenu = React.useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  return (
    <header className="w-full bg-gray-50 shadow-sm sticky top-0 z-50 ">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/Logo/logo_Home.png"
            alt="DineQR Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          />
          <span className="text-lg sm:text-xl font-bold text-red-500">
            DineQR
          </span>
        </div>

        {/* Right Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to={'/manager-dashboard/cart'} className="text-gray-700 hover:text-gray-900 transition font-medium text-3xl">
            🛒
          </Link>
          <Link to="/settings">
            <button className="text-gray-700 hover:text-gray-900 transition font-medium text-3xl">
              👤
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={handleToggleMobileMenu}
            className="text-gray-700 focus:outline-none text-2xl"
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-6 pb-4 space-y-3 bg-white border-t border-gray-200 text-gray-700 font-medium">
          <div className="flex flex-col space-y-2 mt-3">
            <Link to={'/manager-dashboard/cart'} className="text-gray-700 hover:text-gray-900 transition text-center">
              🛒Orders
            </Link>
            <button className="text-gray-700 hover:text-gray-900 transition text-center">
              👤 Profile
            </button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Mgr_Dash_Navbar_UI
