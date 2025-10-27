import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Bell, Info, HelpCircle, History } from 'lucide-react';
import { use_HomePage_Logic } from './use_HomePage_Logic';

const Guest_HomePage_UI: React.FC = () => {
  const {
    showAbout,
    showMobileMenu,
    isMobile,
    hotelInfo,
    handleCartClick,
    handleAboutClick,
    handleMobileMenuToggle,
    isActive,
    setShowMobileMenu,
  } = use_HomePage_Logic();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/guest-dashboard">
              <h1 className="text-xl font-bold text-red-600 flex items-center space-x-1">
                <span>DineQR</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 lg:space-x-6 text-gray-700 text-sm font-medium items-center relative">
            <Link
              to="/guest-dashboard"
              className={`hover:text-red-600 transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-gray-50 relative ${
                isActive('/guest-dashboard') ? 'text-red-600' : ''
              }`}
            >
              Menu
              {isActive('/guest-dashboard') && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full"></div>
              )}
            </Link>

            {/* Cart Button with badge and dropdown */}
            <div className="relative">
              <Link
                to="/guest-dashboard/cart"
                onClick={handleCartClick}
                className={`hover:text-red-600 transition-colors duration-200 flex items-center space-x-1 px-2 py-1 rounded-lg hover:bg-gray-50 relative ${
                  isActive('/guest-dashboard/cart') ? 'text-red-600' : ''
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Cart</span>
                {/* Small red circle badge */}
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full" />
                {isActive('/guest-dashboard/cart') && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full"></div>
                )}
              </Link>
            </div>

            <Link
              to="/guest-dashboard/history"
              className={`hover:text-red-600 transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-gray-50 flex items-center gap-1 relative ${
                isActive('/guest-dashboard/history') ? 'text-red-600' : ''
              }`}
            >
              <History className="w-4 h-4" />
              <span>History</span>
              {isActive('/guest-dashboard/history') && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full"></div>
              )}
            </Link>

            <Link
              to="/guest-dashboard/help"
              className={`hover:text-red-600 transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-gray-50 flex items-center gap-1 relative ${
                isActive('/guest-dashboard/help') ? 'text-red-600' : ''
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
              {isActive('/guest-dashboard/help') && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full"></div>
              )}
            </Link>

            <button
              onClick={handleAboutClick}
              className="hover:text-red-600 transition-colors duration-200 px-2 py-1 rounded-lg hover:bg-gray-50 flex items-center gap-1"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </button>

            <Link
              to="/guest-dashboard/notification"
              className={`hover:text-red-600 transition-colors duration-200 p-2 rounded-lg hover:bg-gray-50 relative ${
                isActive('/guest-dashboard/notification') ? 'text-red-600' : ''
              }`}
            >
              <Bell className="w-4 h-4" />
              <span className="sr-only">Notifications</span>
              {isActive('/guest-dashboard/notification') && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 rounded-full"></div>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Cart Icon for mobile */}
            <Link
              to="/guest-dashboard/cart"
              onClick={handleCartClick}
              className="relative p-2 hover:text-red-600 transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full" />
            </Link>

            <button
              onClick={handleMobileMenuToggle}
              className="p-2 hover:text-red-600 transition-colors duration-200"
            >
              {showMobileMenu ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* About Dropdown - Desktop */}
        {showAbout && !isMobile && (
          <div
            className="hidden md:block bg-white border-t border-gray-200 shadow-inner p-4 lg:p-6 text-gray-700 text-sm space-y-2 lg:space-y-3 max-w-7xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
              <div>
                <p className="font-semibold text-gray-900">Hotel Information</p>
                <p>
                  <strong>Name:</strong> {hotelInfo?.name}
                </p>
                <p>
                  <strong>Address:</strong> {hotelInfo?.address}
                </p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Contact Details</p>
                <p>
                  <strong>Contact:</strong> {hotelInfo?.contactNumber}
                </p>
                <p>
                  <strong>Email:</strong> {hotelInfo?.email}
                </p>
                <p>
                  <strong>Website:</strong>{' '}
                  <a
                    href={hotelInfo?.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-500 hover:underline break-all"
                  >
                    {hotelInfo?.website}
                  </a>
                </p>
              </div>
              <div className="lg:col-span-2 xl:col-span-1">
                <p className="font-semibold text-gray-900">Business Hours</p>
                <p>
                  <strong>Opening Hours:</strong> {hotelInfo?.openingTime} -{' '}
                  {hotelInfo?.closingTime}
                </p>
                <p className="mt-2">{hotelInfo?.description}</p>
              </div>
            </div>
          </div>
        )}

        {/* About Dropdown - Mobile */}
        {showAbout && isMobile && (
          <div
            className="md:hidden bg-white border-t border-gray-200 shadow-inner p-4 text-gray-700 text-sm space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <p>
              <strong>Name:</strong> {hotelInfo?.name}
            </p>
            <p>
              <strong>Address:</strong> {hotelInfo?.address}
            </p>
            <p>
              <strong>Contact:</strong> {hotelInfo?.contactNumber}
            </p>
            <p>
              <strong>Email:</strong> {hotelInfo?.email}
            </p>
            <p>
              <strong>Website:</strong>{' '}
              <a
                href={hotelInfo?.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-500 hover:underline break-all"
              >
                {hotelInfo?.website}
              </a>
            </p>
            <p>
              <strong>Opening Hours:</strong> {hotelInfo?.openingTime} -{' '}
              {hotelInfo?.closingTime}
            </p>
            <p>{hotelInfo?.description}</p>
          </div>
        )}

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="md:hidden bg-white border-t border-gray-200 shadow-inner p-4 space-y-4">
            <Link
              to="/guest-dashboard"
              className={`block w-full text-left hover:text-red-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50 font-medium relative ${
                isActive('/guest-dashboard') ? 'text-red-600 bg-red-50' : ''
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Menu
              {isActive('/guest-dashboard') && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-full"></div>
              )}
            </Link>

            <Link
              to="/guest-dashboard/cart"
              className={`w-full text-left hover:text-red-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50 font-medium flex items-center justify-between relative ${
                isActive('/guest-dashboard/cart') ? 'text-red-600 bg-red-50' : ''
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              <span>Cart</span>
              <div className="flex items-center">
                <span className="w-3 h-3 bg-red-600 rounded-full mr-2"></span>
                {isActive('/guest-dashboard/cart') && (
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-full"></div>
                )}
              </div>
            </Link>

            <Link
              to="/guest-dashboard/history"
              className={`w-full text-left hover:text-red-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2 relative ${
                isActive('/guest-dashboard/history') ? 'text-red-600 bg-red-50' : ''
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              <History className="w-4 h-4" />
              <span>History</span>
              {isActive('/guest-dashboard/history') && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-full"></div>
              )}
            </Link>

            <Link
              to="/guest-dashboard/help"
              className={`w-full text-left hover:text-red-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2 relative ${
                isActive('/guest-dashboard/help') ? 'text-red-600 bg-red-50' : ''
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
              {isActive('/guest-dashboard/help') && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-full"></div>
              )}
            </Link>

            <button
              onClick={handleAboutClick}
              className="w-full text-left hover:text-red-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2"
            >
              <Info className="w-4 h-4" />
              <span>About</span>
            </button>

            <Link
              to="/guest-dashboard/notification"
              className={`w-full text-left hover:text-red-600 transition-colors duration-200 py-2 px-3 rounded-lg hover:bg-gray-50 font-medium flex items-center gap-2 relative ${
                isActive('/guest-dashboard/notification') ? 'text-red-600 bg-red-50' : ''
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
              {isActive('/guest-dashboard/notification') && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-full"></div>
              )}
            </Link>
          </div>
        )}
      </nav>

      {/* Main Content with padding for fixed navbar */}
      <div className="pt-16">
        {' '}
        {/* Adjusted for navbar height */}
        {/* Nested routes render here */}
        <Outlet />
      </div>

      {/* Overlay for mobile menu */}
      {showMobileMenu && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
          onClick={() => setShowMobileMenu(false)}
        />
      )}
    </div>
  )
}

export default Guest_HomePage_UI