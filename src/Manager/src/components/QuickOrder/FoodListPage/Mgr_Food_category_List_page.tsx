import React from 'react'
import Mgr_FoodList_Navbar from '../Navbar/Mgr_FoodList_Navbar'
import Mgr_Food_List_UI from '../FoodList/design/Mgr_Food_List_UI'

/**
 * Food Category List Page - Main page component that combines navigation and food listing
 * Serves as the container layout for the food category browsing experience
 */
const Mgr_Food_category_List_page: React.FC = () => {
  return (
    <div>
      {/* Navigation bar for food category selection and page navigation */}
      <Mgr_FoodList_Navbar />
      
      {/* Main content area displaying the food items in an infinite scroll grid */}
      <Mgr_Food_List_UI />
    </div>
  )
}

export default Mgr_Food_category_List_page