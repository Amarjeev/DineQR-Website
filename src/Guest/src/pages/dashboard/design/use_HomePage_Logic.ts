import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { use_GetUserInfo } from '../../../components/getUserInfo/use_GetUserInfo'
import { use_Get_HotelInfo } from '../logic/use_get_HotelInfo'
import { use_token_Validation } from '../../../tokenValidation/use_token_Validation'
import { useNavigate } from 'react-router-dom'


export const use_HomePage_Logic = () => {
  const [showAbout, setShowAbout] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const location = useLocation()
  const { fetch_UserId } = use_GetUserInfo()
  const { handle_fetch_HotelInfo_ApiCall, hotelInfo } = use_Get_HotelInfo()
  const { handle_Token_Validation } = use_token_Validation() // Token verification
   const navigate = useNavigate()

  // =========================
  // Token Validation
  // =========================
  // Check if the staff is already logged in; redirect if valid
  useEffect(() => {
    handle_Token_Validation('dashboard','68c016f89540bdb6226598f2')
  }, [navigate])

  useEffect(() => {
    fetch_UserId('guest')
    handle_fetch_HotelInfo_ApiCall('68c016f89540bdb6226598f2')
  }, [])

  // Check screen size and set mobile state
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowAbout(false)
      setShowCart(false)
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const handleCartClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowCart(!showCart)
    setShowAbout(false)
  }

  const handleAboutClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowAbout(!showAbout)
    setShowCart(false)
  }

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu)
  }

  const isActive = (path: string) => {
    // For the main menu, only active when exactly on /guest-dashboard
    if (path === '/guest-dashboard') {
      return location.pathname === '/guest-dashboard'
    }

    // For cart, only active when exactly on /guest-dashboard/cart
    if (path === '/guest-dashboard/cart') {
      return location.pathname === '/guest-dashboard/cart'
    }

    // For other routes, check exact match
    return location.pathname === path
  }

  return {
    showAbout,
    showCart,
    showMobileMenu,
    isMobile,
    hotelInfo,
    handleCartClick,
    handleAboutClick,
    handleMobileMenuToggle,
    isActive,
    setShowMobileMenu,
  }
}
