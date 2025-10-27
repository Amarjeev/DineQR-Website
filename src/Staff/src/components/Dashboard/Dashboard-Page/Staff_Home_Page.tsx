import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Dash_Navbar_UI from '../Navbar/design/Staff_Dash_Navbar_UI';
import Dash_Sub_Navbar_UI from '../Sub-Navbar/Staff_Dash_Sub_Navbar_UI';
import { use_Get_Table_List } from '../../QuickOrder/GetTableList/use_Get_Table_List';
import { use_token_Validation } from '../../tokenValidation/use_token_Validation';
import { use_GetUserInfo } from '../../getUserInfo/use_GetUserInfo';

/**
 * Home_Page Component
 * -------------------
 * Main layout for staff dashboard pages.
 * Handles:
 * - Token validation to secure dashboard routes.
 * - Fetching and storing table list in sessionStorage.
 * - Fetching and storing staff user info (userId, hotelKey, staffName).
 * - Rendering main and sub-navigation bars.
 * - Rendering nested route content using <Outlet />.
 * 
 * Notes:
 * - Uses multiple useEffect hooks for separate responsibilities (token, table list, user info).
 * - Navigation is handled via react-router-dom's useNavigate.
 */
const Staff_Home_Page: React.FC = () => {
  const { handleFetchTableList } = use_Get_Table_List(); // Manage table list data
  const { fetch_UserId_hotelKey } = use_GetUserInfo();   // Fetch staff user info
  const { handle_Token_Validation } = use_token_Validation(); // Token verification
  const navigate = useNavigate();

  // =========================
  // Token Validation
  // =========================
  // Verify staff token on component mount
  useEffect(() => {
    handle_Token_Validation('dashboard');
  }, [navigate]);

  // =========================
  // Table List Fetch
  // =========================
  // Fetch table list if not already in sessionStorage
  useEffect(() => {
    const stored = sessionStorage.getItem('tableList');
    if (!stored) {
      handleFetchTableList('staff');
    }
  }, []);

  // =========================
  // Staff User Info Fetch
  // =========================
  // Fetch staff userId, hotelKey, and staffName if not in sessionStorage
  useEffect(() => {
    const userId = sessionStorage.getItem('staff-userId');
    const hotelKey = sessionStorage.getItem('DineQR_hotelKey');
    const staffName = sessionStorage.getItem('staff-userName');

    if (!userId || !hotelKey || !staffName) {
      fetch_UserId_hotelKey('staff');
    }
  }, []);

  // =========================
  // Render
  // =========================
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main navigation bar */}
      <Dash_Navbar_UI />

      {/* Sub-navigation bar for staff actions */}
      <Dash_Sub_Navbar_UI />

      {/* Main content area for nested routes */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Staff_Home_Page;
