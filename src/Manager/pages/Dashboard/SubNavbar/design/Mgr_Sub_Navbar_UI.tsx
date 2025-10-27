import React, { useState, useEffect } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'

/**
 * Interface defining the structure of a sub-navigation heading item
 * Each item represents a clickable link in the sub-navigation bar
 */
interface HeadingItem {
  name: string // Display text for the navigation item
  path?: string // Optional route path for navigation
}

/**
 * Props interface for the Sub_Navbar_UI component
 * Defines the data required to render the sub-navigation bar
 */
interface Props {
  navbarHeadingsArray: HeadingItem[] // Array of navigation items to display
}

/**
 * Sub Navigation Bar UI Component
 *
 * Features:
 * - Responsive design with desktop horizontal links and mobile dropdown
 * - Active state tracking for visual feedback
 * - Smooth transitions and hover effects
 * - Accessible dropdown for mobile devices
 * - Persists active state in sessionStorage
 * - Automatically sets first item as active when navigation array changes
 *
 * @param props - Component props containing navigation items array
 * @returns React Functional Component
 */
const Mgr_Sub_Navbar_UI: React.FC<Props> = ({ navbarHeadingsArray }) => {
  /**
   * State to control mobile dropdown visibility
   * Toggles between open and closed states on mobile devices
   */
  const [dropdownOpen, setDropdownOpen] = useState(false)

  /**
   * State to track the currently active navigation item
   * Initializes from sessionStorage if available, otherwise defaults to first item
   * Updates when users click on different navigation items
   */
  const [active, setActive] = useState(() => {
    // Initialize from sessionStorage to maintain state across page refreshes
    const savedActive = sessionStorage.getItem('activeSubNavItem')
    return savedActive || ''
  })

  /**
   * Effect to automatically set the first item as active when navbarHeadingsArray changes
   * This ensures that when switching between main categories, the first sub-item is always active
   */
  useEffect(() => {
    if (navbarHeadingsArray && navbarHeadingsArray.length > 0) {
      // Check if current active exists in the new array
      const activeExists = navbarHeadingsArray.some(item => item.name === active)
      
      // If active doesn't exist in new array OR no active is set, set first item as active
      if (!activeExists || !active) {
        const firstItemName = navbarHeadingsArray[0].name
        setActive(firstItemName)
      }
    }
  }, [navbarHeadingsArray, active])

  /**
   * Effect to persist active state to sessionStorage whenever it changes
   * Ensures the active sub-navigation state survives page refreshes
   */
  useEffect(() => {
    if (active) {
      sessionStorage.setItem('activeSubNavItem', active)
    }
  }, [active])

  /**
   * Handler function to update active item and persist to sessionStorage
   * 
   * @param {string} itemName - The name of the navigation item to set as active
   */
  const handleSetActive = (itemName: string) => {
    setActive(itemName)
  }

  return (
    <div className="bg-gray-50 p-3 sm:p-4 rounded-lg shadow-sm">
      {/* ===== DESKTOP NAVIGATION ===== */}
      <div className="hidden sm:flex flex-wrap gap-3">
        {navbarHeadingsArray?.map((item) => (
          <Link
            key={item.name}
            to={item?.path || '/manager-dashboard/dishes-list'}
            onClick={() => handleSetActive(item.name)}
            className={`px-4 py-2 rounded-md font-semibold text-sm transition-colors ${
              active === item.name
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* ===== MOBILE DROPDOWN NAVIGATION ===== */}
      <div className="sm:hidden relative">
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-full px-4 py-2 bg-gray-200 rounded-md text-gray-800 font-semibold text-sm flex justify-between items-center"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          {active}
          <FaChevronDown
            className={`ml-2 transition-transform duration-200 ${
              dropdownOpen ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </button>

        {dropdownOpen && (
          <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10">
            {navbarHeadingsArray?.map((item) => (
              <Link
                key={item.name}
                to={item?.path || '/manager-dashboard/dishes-list'}
                onClick={() => {
                  handleSetActive(item.name)
                  setDropdownOpen(false)
                }}
                className={`block w-full text-left px-4 py-2 text-sm font-semibold transition-colors ${
                  active === item.name
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-800 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Mgr_Sub_Navbar_UI