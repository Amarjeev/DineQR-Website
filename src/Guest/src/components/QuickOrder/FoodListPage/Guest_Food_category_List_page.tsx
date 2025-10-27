import FoodList_Navbar from '../Navbar/Guest_FoodList_Navbar'
import Food_List_UI from '../FoodList/design/Guest_Food_List_UI'

/**
 * Food Category List Page - Main page component that combines navigation and food listing
 * Serves as the container layout for the food category browsing experience
 */
const Guest_Food_category_List_page: React.FC = () => {
  return (
   <div>
      {/* Navigation bar for food category selection and page navigation */}
      <FoodList_Navbar />
      
      {/* Main content area displaying the food items in an infinite scroll grid */}
      <Food_List_UI />
    </div>
  )
}

export default Guest_Food_category_List_page