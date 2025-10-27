import { useState, useEffect } from 'react'

/**
 * Custom hook for managing sidebar state and interactions
 * 
 * Features:
 * - Tracks currently active sidebar label
 * - Handles sidebar item click events
 * - Provides consistent label formatting (lowercase)
 * - Persists current label in sessionStorage for page refresh recovery
 * 
 * @returns {Object} Sidebar state and handlers
 * @returns {string} currentLabel - Currently active sidebar label in lowercase
 * @returns {Function} handleClickItem - Function to handle sidebar item clicks
 */
export const use_Sidebar = () => {
  /**
   * State to track the currently active sidebar label
   * Initializes from sessionStorage if available, otherwise defaults to 'menu'
   * Stored in lowercase for consistent comparison
   */
  const [currentLabel, setCurrentLabel] = useState(() => {
    // Initialize from sessionStorage to maintain state across page refreshes
    const savedLabel = sessionStorage.getItem('currentSidebarLabel');
    return savedLabel ? savedLabel.toLowerCase() : 'menu';
  });

  /**
   * Effect to persist currentLabel to sessionStorage whenever it changes
   * Ensures the active sidebar state survives page refreshes
   */
  useEffect(() => {
    sessionStorage.setItem('currentSidebarLabel', currentLabel);
  }, [currentLabel]);

  /**
   * Handles sidebar item click events
   * Updates the current active label and persists to sessionStorage
   * 
   * @param {string} labelName - The label of the clicked sidebar item
   */
  const handleClickItem = (labelName: string) => {
    // Convert to lowercase for consistent state management
    // This ensures case-insensitive comparisons throughout the app
    const normalizedLabel = labelName.toLowerCase();
    setCurrentLabel(normalizedLabel);
    
    // Note: The useEffect above will automatically persist to sessionStorage
    // when the state updates due to the dependency array
  }

  // Return state and handler for consumption by components
  return { handleClickItem, currentLabel }
}