import React from 'react'
import FoodList_Navbar from '../Navbar/Staff_FoodList_Navbar'
import Food_List_UI from '../FoodList/design/Staff_Food_List_UI'

/**
 * Food_category_List_page Component
 * ---------------------------------
 * Main page container for browsing a specific food category.
 * Combines the navigation bar and the food list UI into a cohesive layout.
 *
 * Key Responsibilities:
 * - Render the category navigation bar (FoodList_Navbar)
 * - Display the paginated and scrollable food list (Food_List_UI)
 * - Acts as the container for the food category browsing experience
 */
const Staff_Food_category_List_page: React.FC = () => {
  return (
    <div>
      {/* ====================== NAVIGATION BAR ====================== */}
      <FoodList_Navbar />

      {/* ====================== FOOD LIST SECTION ====================== */}
      <Food_List_UI />
    </div>
  )
}

export default Staff_Food_category_List_page
