import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

/**
 * Dash_Sub_Navbar_UI Component
 * ----------------------------
 * Provides secondary navigation for staff dashboard with quick access to key sections.
 * Supports both desktop and mobile views with active state highlighting.
 *
 * Responsibilities:
 * - Render desktop and mobile navigation menus.
 * - Highlight the active route.
 * - Handle mobile hamburger menu toggle.
 * - Provide quick access buttons for frequent actions like Quick Order and Cart.
 *
 * Key Features:
 * - Responsive design (desktop + mobile)
 * - Active route highlighting
 * - Sticky positioning at the top
 * - Quick action buttons
 * - Menu items for Orders, Pending, History, Stock, Alerts
 */
const Staff_Dash_Sub_Navbar_UI: React.FC = () => {
  // =========================
  // State
  // =========================
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // Toggle mobile menu
  const location = useLocation() // Current route location

  // =========================
  // Menu Items
  // =========================
  // Navigation menu items with icons, labels, and paths
  const menuItems = [
    { icon: '📋', label: 'Orders', path: '/staff-dashboard/orders' },
    { icon: '⏳', label: 'Pending', path: '/staff-dashboard/pending' },
    { icon: '📊', label: 'History', path: '/staff-dashboard/history' },
    { icon: '⚠️', label: 'Stock', path: '/staff-dashboard/stock' },
    { icon: '🔔', label: 'Alerts', path: '/staff-dashboard/notification' },
  ]

  /**
   * Checks if the current route matches the given path
   * Used for applying active state styling
   */
  const isActive = (path: string) => location.pathname === path

  // =========================
  // Render
  // =========================
  return (
    <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4">
        {/* ====================== DESKTOP VIEW ====================== */}
        <div className="hidden sm:flex items-center justify-between h-14">
          {/* Quick Action Buttons - Left Side */}
          <div className="flex items-center gap-2">
            {/* Quick Order Button */}
            <Link
              to="/staff-dashboard/quick-order"
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                isActive('/staff/dashboard/quick-order')
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <span>⚡</span>
              Quick Order
            </Link>

            {/* Cart Button */}
            <Link
              to="/staff-dashboard/cart"
              className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                isActive('/staff/dashboard/cart')
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <span>🛒</span>
              Cart
            </Link>
          </div>

          {/* Main Navigation Menu - Center */}
          <nav className="flex items-center gap-6">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                  isActive(item.path)
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span>{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* ====================== MOBILE VIEW ====================== */}
        <div className="sm:hidden">
          {/* Mobile Header Bar */}
          <div className="flex items-center justify-between h-14">
            {/* Quick Order Button */}
            <Link
              to="/staff-dashboard/quick-order"
              className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-medium ${
                isActive('/staff/dashboard/quick-order')
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-600 text-white'
              }`}
            >
              <span>⚡</span>
              Quick Order
            </Link>

            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-gray-600"></div>
                <div className="w-6 h-0.5 bg-gray-600"></div>
                <div className="w-6 h-0.5 bg-gray-600"></div>
              </div>
            </button>
          </div>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <div className="border-t border-gray-200 py-4 bg-white">
              <div className="space-y-3">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on navigation
                    className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span>{item.icon}</span>
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </Link>
                ))}

                {/* Mobile-only Cart Link */}
                <Link
                  to="/staff-dashboard/cart"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    isActive('/staff/dashboard/cart')
                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span>🛒</span>
                    <span className="font-medium">Cart</span>
                  </div>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Staff_Dash_Sub_Navbar_UI
