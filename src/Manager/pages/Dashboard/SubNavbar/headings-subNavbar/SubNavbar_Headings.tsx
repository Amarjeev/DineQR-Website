/**
 * Type definition for a single sub-navigation heading item
 * Represents an individual navigation link within a category
 */
export type HeadingItem = {
  name: string    // Display name of the navigation item
  path?: string   // Optional route path - falls back to default if not provided
}

/**
 * Type definition for the complete SubNavbarHeadings object structure
 * Maps category keys to arrays of HeadingItems for organized navigation
 */
export type SubNavbarHeadingsType = {
  menu: HeadingItem[]         // Menu management navigation items
  tables: HeadingItem[]       // Table management navigation items  
  billing: HeadingItem[]      // Billing and invoice navigation items
  // profit: HeadingItem[]       // Profit and analytics navigation items
  profile: HeadingItem[]      // User profile and settings navigation items
  staffaccount: HeadingItem[] // Staff account management navigation items
}

/**
 * Complete configuration object for sub-navigation headings
 * 
 * Structure:
 * - Organized by main sidebar categories (menu, tables, billing, etc.)
 * - Each category contains an array of related navigation items
 * - Provides paths for React Router navigation
 * - Used to dynamically generate sub-navigation bars based on active section
 * 
 * Usage:
 * - Accessed by custom hooks to populate sub-navigation
 * - Provides consistent navigation structure across the application
 * - Easy to extend with new categories or navigation items
 */
export const sub_navbar_headings: SubNavbarHeadingsType = {
  /**
   * Menu Management Section
   * Navigation items for menu creation and management
   */
  menu: [
    { name: 'Add Menu Items', path: '/manager-dashboard/Add-menuItems' },
    { name: 'Manage Menu Items', path: '/manager-dashboard/dishes-list' },
  ],

  /**
   * Table Management Section  
   * Navigation items for restaurant table management
   */
  tables: [
    { name: 'Create Table', path: '/manager-dashboard/create/table' },
    { name: 'Manage Tables', path: '/manager-dashboard/edit/tables' },
  ],

  /**
   * Billing Section
   * Navigation items for invoice and billing operations
   */
  billing: [
    { name: 'Create Bill', path: '/manager-dashboard/create/Bill' },
    { name: 'Manage Bills', path: '/manager-dashboard/edit/Bill' },
  ],

  /**
   * Profit & Analytics Section
   * Navigation items for sales reporting and analytics
   */
  // profit: [
  //   { name: 'Sales', path: 'Sales' },
  //   { name: 'Top Items', path: 'Top-items' },
  // ],

  /**
   * Profile & Settings Section
   * Navigation items for user profile and establishment settings
   */
  profile: [
    { name: 'My Profile', path: 'My-profile' },
    { name: 'Hotel Info', path: 'Hotel-info' },
    { name: 'Settings', path: 'Settings' },
    { name: 'Staff Account', path: 'Staff-account' },
  ],

  /**
   * Staff Account Management Section
   * Navigation items for staff account operations
   */
  staffaccount: [
    { name: 'Create account', path: 'Create-account' },
    { name: 'Help me sign in', path: 'Help-signin' },
  ],
}