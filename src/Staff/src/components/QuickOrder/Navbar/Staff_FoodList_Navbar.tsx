import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

/**
 * FoodList_Navbar Component
 *
 * Purpose:
 * - Provides navigation for food category pages
 * - Includes back button to return to previous page
 * - Displays current food type filter (Veg / Non-Veg)
 *
 * Features:
 * - Responsive layout (mobile + desktop)
 * - Smooth hover and focus effects
 * - Accessible and visually clear dropdown
 */
const Staff_FoodList_Navbar: React.FC = () => {

  // Navigate hook to handle back button
  const navigate = useNavigate()

  return (
    <nav className="bg-white px-4 sm:px-6 py-3 flex flex-col sm:flex-row justify-between items-center border-b border-gray-300 shadow-sm">
      {/* Left section: Back button */}
      <div className="flex items-center gap-2 sm:gap-4 w-full sm:w-auto mb-2 sm:mb-0">
        <div
          className="flex items-center gap-1 sm:gap-2 cursor-pointer text-blue-600 hover:text-blue-800 transition-all duration-200"
          onClick={() => navigate(-1)} // Go back to previous page
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 transform transition-transform duration-200 hover:-translate-x-1" />
          <span className="text-sm sm:text-lg font-semibold">Back</span>
        </div>
      </div>
    </nav>
  )
}

export default Staff_FoodList_Navbar
