import { useState, useRef, useEffect } from 'react'
import { use_Logout } from '../logic/use_Logout'

export interface StaffData {
  name: string
  staffId: string | null
}

/**
 * use_DashNavbar_Logic
 * --------------------
 * Custom hook to manage the logic of the dashboard navbar.
 * 
 * Responsibilities:
 * - Manage profile/settings dropdown state (open/close).
 * - Store and provide staff information (name and ID) from sessionStorage.
 * - Handle logout using the use_Logout hook.
 * - Detect clicks outside the dropdown to close it.
 * 
 * Returns:
 * - isProfileOpen: boolean - whether the profile dropdown is open
 * - staffData: StaffData - staff name and ID
 * - profileRef: React ref - ref to dropdown container for click outside detection
 * - handleProfileToggle: function - toggles dropdown open/close
 * - handle_Logout_ApiCall: function - triggers logout API call
 */
export const use_DashNavbar_Logic = () => {
  // =========================
  // State
  // =========================
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false) // Dropdown open/close
  const [staffData, setStaffData] = useState<StaffData>({ name: '', staffId: null }) // Staff info

  // =========================
  // Refs
  // =========================
  const profileRef = useRef<HTMLDivElement>(null) // Dropdown container ref

  // =========================
  // Hooks
  // =========================
  const { handle_Logout_ApiCall } = use_Logout() // Logout function

  // =========================
  // Load Staff Info
  // =========================
  // Fetch staff info from sessionStorage on mount
  useEffect(() => {
    const staffId = sessionStorage.getItem('staff-userId')
    const staffName = sessionStorage.getItem('staff-userName')
    setStaffData({ name: staffName || 'N/A', staffId })
  }, [])

  // =========================
  // Handlers
  // =========================
  /**
   * Toggle the profile/settings dropdown open/close state
   */
  const handleProfileToggle = () => {
    setIsProfileOpen(prev => !prev)
  }

  // =========================
  // Click Outside Detection
  // =========================
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // =========================
  // Return
  // =========================
  // Provide states, refs, and handlers to UI component
  return {
    isProfileOpen,
    staffData,
    profileRef,
    handleProfileToggle,
    handle_Logout_ApiCall,
  }
}
