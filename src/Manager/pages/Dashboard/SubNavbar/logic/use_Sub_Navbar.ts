import { useState } from "react";
import { sub_navbar_headings } from "../headings-subNavbar/SubNavbar_Headings"
import { type SubNavbarHeadingsType, type HeadingItem } from "../headings-subNavbar/SubNavbar_Headings";

/**
 * Custom React Hook for managing sub-navigation bar state and data
 * 
 * Responsibilities:
 * - Maintains state for current sub-navigation items
 * - Provides function to update sub-navigation based on sidebar selection
 * - Handles data fetching from sub_navbar_headings configuration
 * 
 * @returns {Object} Hook return value containing state and handler
 * @returns {Function} handleShowHeadings - Function to update sub-navigation items
 * @returns {HeadingItem[]} navbarHeadingsArray - Current array of sub-navigation items
 */
export const use_Sub_Navbar = () => {
    /**
     * State to store the current array of sub-navigation heading items
     * Initially empty array - populated when handleShowHeadings is called
     * Used by Sub_Navbar_UI component to render navigation links
     */
    const [navbarHeadingsArray, setNavbarHeadingsArray] = useState<HeadingItem[]>([]);

    /**
     * Handler function to update sub-navigation items based on current sidebar selection
     * 
     * Process:
     * 1. Normalizes the label to lowercase for consistent key matching
     * 2. Looks up corresponding navigation items from sub_navbar_headings configuration
     * 3. Updates state with found items or empty array if no match
     * 
     * @param {string} currentLabel - The currently selected sidebar label (e.g., 'Menu', 'Tables')
     */
    const handleShowHeadings = (currentLabel: string) => {
        // Normalize label to lowercase for case-insensitive key matching
        const lowerLabel = currentLabel.toLowerCase();
        
        // Look up navigation items from configuration object
        // Uses type assertion to ensure TypeScript recognizes the key
        const navbarHeadings = sub_navbar_headings[lowerLabel as keyof SubNavbarHeadingsType];
        
        // Update state with found items or empty array if no match
        // Prevents errors when accessing undefined properties
        setNavbarHeadingsArray(navbarHeadings || []);
    }

    // Return both the state and handler for external consumption
    return { handleShowHeadings, navbarHeadingsArray }
}