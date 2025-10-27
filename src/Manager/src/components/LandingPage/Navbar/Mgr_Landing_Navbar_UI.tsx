import { useState } from 'react'
import { useGlobalContext } from '../../../useContext/useGlobalContext'
import React from 'react'

const Mgr_Landing_Navbar_UI: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const { setFormType } = useGlobalContext()

  const handleLoginClick = React.useCallback(
    () => setFormType('login'),
    [setFormType]
  )
  const handleSignUpClick = React.useCallback(
    () => setFormType('create'),
    [setFormType]
  )
  const handleToggleMobileMenu = React.useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev)
  }, [])

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/Logo/logo_navbar.png"
            alt="DineQR Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          />
          <span className="text-lg sm:text-xl font-bold text-red-500">
            DineQR
          </span>
        </div>

        {/* Right Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          <a
            href="#about"
            className="text-gray-700 hover:text-gray-900 transition font-medium"
          >
            About
          </a>
          <a
            onClick={handleLoginClick}
            href="#login"
            className="text-gray-700 hover:text-gray-900 transition font-medium"
          >
            Login
          </a>
          <a
            onClick={handleSignUpClick}
            href="#create"
            className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
          >
            Sign Up
          </a>
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
            <a
              href="#about"
              className="text-gray-700 hover:text-gray-900 transition text-center"
            >
              About
            </a>
            <a
              onClick={handleLoginClick}
              href="#login"
              className="text-gray-700 hover:text-gray-900 transition text-center"
            >
              Login
            </a>
            <a
              onClick={handleSignUpClick}
              href="#create"
              className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition text-center"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Mgr_Landing_Navbar_UI
