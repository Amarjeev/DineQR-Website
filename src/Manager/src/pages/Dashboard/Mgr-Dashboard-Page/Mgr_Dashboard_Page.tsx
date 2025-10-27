import { useEffect } from 'react'
import Dash_Navbar_UI from '../../../components/Dashboard-Navbars/Dash-Navbar/Mgr_Dash_Navbar_UI'
import Sidebar_UI from '../Sidebar/design/Mgr_Sidebar_UI'
import { use_Get_Table_List } from '../../../components/QuickOrder/GetTableList/use_Get_Table_List'
import { useNavigate } from 'react-router-dom'
import { use_token_Validation } from '../../../components/tokenValidation/use_token_Validation'
import { use_GetUserInfo } from '../../../components/getUserInfo/use_GetUserInfo'

const Mgr_Dashboard_Page: React.FC = () => {

   // Custom hook for fetching and managing table list data
  const { handleFetchTableList } = use_Get_Table_List()
   const navigate = useNavigate()
  const { handle_Token_Validation } = use_token_Validation()
   const { fetch_UserId } = use_GetUserInfo();

  /**
   * useEffect Hook - Initialization and Data Fetching
   *
   * Purpose: Fetches table list on component mount if not already cached
   * Optimization: Checks sessionStorage to avoid redundant API calls
   * Trigger: Runs once on component mount and when handleFetchTableList changes
   */
  useEffect(() => {
    const stored = sessionStorage.getItem('tableList')
    if (!stored) {
      handleFetchTableList('manager') // Fetch table list for staff role
    }
  }, [])

   // Check if the manager is already logged in; redirect if valid
  useEffect(() => {
    handle_Token_Validation('dashboard')
  }, [navigate])

   useEffect(() => {
    const userId = sessionStorage.getItem('manager-userId');

    if (!userId) {
      fetch_UserId('manager');
    }
  }, []);


  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Navbar at the top */}
      <Dash_Navbar_UI />

      {/* Main content area: sidebar + main */}
      <div className="flex flex-1 overflow-hidden">
       

        {/* Sidebar - fixed height, no scroll */}
        <Sidebar_UI />
      </div>
    </div>
  )
}

export default Mgr_Dashboard_Page
