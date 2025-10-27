import { Outlet, Link, useLocation } from 'react-router-dom'

// Component imports
import Sub_Navbar_UI from '../../SubNavbar/design/Mgr_Sub_Navbar_UI'

// Custom hook imports
import { use_Sidebar } from '../logic/use_Sidebar'
import { use_Sub_Navbar } from '../../SubNavbar/logic/use_Sub_Navbar'

// React imports
import { useEffect } from 'react'

/**
 * Type definition for sidebar menu items
 */
type MenuItem = {
  label: string
  icon: string
  path?: string
}

/**
 * Array of sidebar menu items with their respective routes and icons
 * Each item represents a main navigation category in the dashboard
 */
const menuItems: MenuItem[] = [
  { label: 'Menu', icon: '📋', path: '/manager-dashboard/Add-menuItems' },
  { label: 'Tables', icon: '🪑', path: '/manager-dashboard/create/table' },
  { label: 'Active Orders', icon: '🔥', path: '/manager-dashboard/pending/orders' },
  { label: 'Billing', icon: '🧾', path: '/manager-dashboard/create/Bill' },
  { label: 'Reviews', icon: '💬', path: '/manager-dashboard/reviews' },
  { label: 'QuickOrder', icon: '🛒', path: '/manager-dashboard/food/dishes' },
  { label: 'Profit', icon: '📈', path: '/manager-dashboard/profit' },
  { label: 'Order History', icon: '📊', path: '/manager-dashboard/order/history' },
  { label: 'Notifications', icon: '🚨', path: '/manager-dashboard/notification' },
]

/**
 * Main Sidebar UI Component
 * 
 * Features:
 * - Responsive sidebar navigation
 * - Dynamic sub-navigation based on selected menu item
 * - Conditional rendering of sub-navbar for specific sections
 * - Persistent active state tracking
 * - Hides sub-navbar on specific routes like cart page
 */
const Mgr_Sidebar_UI: React.FC = () => {
  // Custom hooks for sidebar state management
  const { handleClickItem, currentLabel } = use_Sidebar()
  const { handleShowHeadings, navbarHeadingsArray } = use_Sub_Navbar()
  const location = useLocation()

  /**
   * Effect to update sub-navbar headings when currentLabel changes
   * This ensures the sub-navigation reflects the currently selected sidebar item
   */
  useEffect(() => {
    handleShowHeadings(currentLabel)
  }, [currentLabel])

  /**
   * Array of sidebar labels that should display the sub-navigation bar
   * Only these categories will show additional navigation options below the main sidebar
   */
  const showSubNavbarLabels = [
    'menu',        // Menu management section
    'tables',      // Table management section  
    'billing',     // Billing and invoices section
    'profit',      // Profit and analytics section
    'profile',     // User profile settings
    'staffaccount', // Staff account management
  ]

  /**
   * Determine if sub-navbar should be shown based on current selection
   * Converts currentLabel to lowercase for case-insensitive comparison
   */
  const shouldShowSubNavbar = showSubNavbarLabels.includes(
    currentLabel.toLowerCase()
  )

  /**
   * Array of paths where sub-navbar should be hidden
   * These are specific routes where the sub-navigation is not needed
   */
  const hideSubNavbarPaths = [
    '/manager-dashboard/food/place-order/cart',
    // Add other paths here where you want to hide the sub-navbar
  ]

  /**
   * Check if current path is in the hide list
   * This prevents sub-navbar from showing on specific routes
   */
  const shouldHideSubNavbar = hideSubNavbarPaths.includes(location.pathname)

  return (
    <div className="w-dvw h-screen bg-gray-200 grid grid-cols-7">
      {/* ===== SIDEBAR SECTION ===== */}
      {/* 
        Left sidebar - 1/7 of screen width on large screens
        Contains main navigation menu items
      */}
      <div className="col-span-1 bg-white h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <div className="p-2 h-full w-full flex flex-col bg-white dark:bg-gray-900 border-r border-r-gray-200">
          <div className="flex flex-col h-full flex-grow pt-2 justify-start overflow-x-hidden">
            <div className="flex flex-col space-y-1 mx-1 lg:mt-1">
              {/* Render each menu item as a navigation link */}
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path || '/Manager-Dashboard'}
                  onClick={() => handleClickItem(item.label)}
                  className={`flex flex-row items-center justify-start rounded-md h-12 mt-1 focus:outline-none pr-3.5 lg:pr-6 font-semibold cursor-pointer no-underline transition-colors ${
                    currentLabel === item?.label?.toLowerCase()
                      ? 'bg-blue-600 text-white' // Active item styling
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200' // Inactive item styling
                  }`}
                >
                  {/* Menu item icon */}
                  <span className="inline-flex justify-center items-center ml-3.5 text-lg">
                    {item.icon}
                  </span>
                  {/* Menu item label - hidden on mobile, visible on larger screens */}
                  <span className="ml-2 text-sm tracking-wide truncate capitalize hidden lg:block">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT SECTION ===== */}
      {/* 
        Right content area - 6/7 of screen width on large screens
        Contains sub-navigation and main content area
      */}
      <div className="col-span-6 bg-white h-screen flex flex-col">
        {/* ===== SUB NAVBAR ===== */}
        {/* 
          Conditionally render sub-navigation bar
          Only shown for specific menu categories AND when not on hidden paths
          Passes the appropriate heading array based on current selection
        */}
        {shouldShowSubNavbar && !shouldHideSubNavbar && (
          <Sub_Navbar_UI navbarHeadingsArray={navbarHeadingsArray} />
        )}

        {/* ===== MAIN CONTENT AREA ===== */}
        {/* 
          Dynamic content area where child routes are rendered
          Uses React Router's Outlet component to display nested route components
          Scrollable area with custom scrollbar styling
        */}
        <div className="flex-1 min-h-100 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 p-4 mb-12">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Mgr_Sidebar_UI