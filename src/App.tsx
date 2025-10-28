import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

// ================= Manager Imports =================
import Mgr_Account_settings_UI from "./Manager/pages/Settings/account/design/Mgr_Account_settings_UI";
import Mgr_Add_Menu_Item_UI from "./Manager/pages/Menu/add-Menu-Item/design/Mgr_Add_Menu_Item_UI";
import Mgr_Create_Bill_UI from "./Manager/pages/Bill/Create-Bill/design/Mgr_Create_Bill_UI";
import Mgr_Create_Staff_Acc_settings from "./Manager/pages/Settings/Staff-Account/create-Account/design/Mgr_Create_Staff_Acc_settings_UI";
import Mgr_Create_Table_Page from "./Manager/pages/Tables/CreateTable/CreateTable-Page/Mgr_Create_Table_Page";
import Mgr_Dashboard_Page from "./Manager/pages/Dashboard/Mgr-Dashboard-Page/Mgr_Dashboard_Page";
import Mgr_reviews_UI from "./Manager/pages/Reviews/Mgr_reviews_UI";
import Mgr_Delete_Staff_Acc_settings_UI from "./Manager/pages/Settings/Staff-Account/helpMeSignIn/deleteAccount/design/Mgr_Delete_Staff_Acc_settings_UI";
import Mgr_Edit_Bill_UI from "./Manager/pages/Bill/Edit-Bill/design/Mgr_Edit_Bill_UI";
import Mgr_Edit_Dish_Categories_UI from "./Manager/pages/Menu/manage-Menu-items/Edit-Dishes/Mgr_Edit_Dish_Categories_UI";
import Mgr_Dish_Categories_UI from "./Manager/components/QuickOrder/DishCategories/Mgr_Dish_Categories_UI";
import Mgr_Food_Detail_Page from "./Manager/components/QuickOrder/OrderFood/design/Mgr_Food_Detail_Page";
import Mgr_Food_category_List_page from "./Manager/components/QuickOrder/FoodListPage/Mgr_Food_category_List_page";
import Mgr_Edit_Food_List_Page from "./Manager/pages/Menu/manage-Menu-items/Edit-FoodList-Page/Mgr_Edit_Food_List_Page";
import Mgr_Edit_Menu_item_UI from "./Manager/pages/Menu/manage-Menu-items/EditMenu-items/design/Mgr_Edit_Menu_item_UI";
import Mgr_Edit_Tables_Page from "./Manager/pages/Tables/Edit-Table-Page/Mgr_Edit_Tables_Page";
import Mgr_Forgot_Pwd_UI from "./Manager/components/authentication/ForgotPassword/design/Mgr_Forgot_Pwd_UI";
import Mgr_Forgot_Staff_Pwd_settings_UI from "./Manager/pages/Settings/Staff-Account/helpMeSignIn/forgotPassword/design/Mgr_Forgot_Staff_Pwd_settings_UI";
import Mgr_HotelInfo_settings_UI from "./Manager/pages/Settings/hotelInfo/design/Mgr_HotelInfo_settings_UI";
import Mgr_Landing_Home_UI from "./Manager/components/LandingPage/HomePage/Mgr_Landing_Home_UI";
import Mgr_Manage_Staff_Acc_settings_UI from "./Manager/pages/Settings/Staff-Account/manage-Staff-Account/design/Mgr_Manage_Staff_Acc_settings_UI";
import Mgr_Notification_MessageUI from "./Manager/pages/Notifications/design/Mgr_Notification_MessageUI";
import Mgr_Order_History_Table_UI from "./Manager/pages/OrderHistory/design/Mgr_Order_History_Table_UI";
import Mgr_Otp_Verification_UI from "./Manager/components/authentication/Otp-Verification/design/Mgr_Otp_Verification_UI";
import Mgr_Pending_Orders_Table_UI from "./Manager/pages/PendingOrders/design/Mgr_Pending_Orders_Table_UI";
import Mgr_PlaceOrder_Cart_Page from "./Manager/components/QuickOrder/PlaceOrderCart/design/Mgr_PlaceOrder_Cart_Page";
import Mgr_Profile_settings_UI from "./Manager/pages/Settings/profile/design/Mgr_Profile_settings_UI";
import Mgr_ProfitAlertUI from "./Manager/pages/Profit/profit_alertMessage/Mgr_Profit_Alert_UI";
import Mgr_QRcode_settings_UI from "./Manager/pages/Settings/QR-code/design/Mgr_QRcode_settings_UI";
import Mgr_Settings_Page from "./Manager/pages/Settings/Settings-Page/Mgr_Settings_Page";

// ================= Guest Imports =================
import Guest_Dish_Categories_UI from "./Guest/components/QuickOrder/DishCategories/Guest_Dish_Categories_UI";
import Guest_Food_category_List_page from "./Guest/components/QuickOrder/FoodListPage/Guest_Food_category_List_page";
import Guest_Food_Detail_Page from "./Guest/components/QuickOrder/OrderFood/design/Guest_Food_Detail_Page";
import Guest_Help_UI from "./Guest/pages/help/design/Guest_Help_UI";
import Guest_History_UI from "./Guest/pages/history/design/Guest_History_UI";
import Guest_HomePage_UI from "./Guest/pages/dashboard/design/Guest_HomePage_UI";
import Guest_Login_UI from "./Guest/pages/authentication/login/design/Guest_Login_UI";
import Guest_Notification_UI from "./Guest/pages/notification/design/Guest_Notification_UI";
import Guest_Orders_UI from "./Guest/components/QuickOrder/Orders/design/Guest_Orders_UI";
import Guest_PlaceOrder_Cart_Page from "./Guest/components/QuickOrder/PlaceOrderCart/design/Guest_PlaceOrder_Cart_Page";

// ================= Staff Imports =================
import Staff_Dish_Categories_UI from "./Staff/components/QuickOrder/DishCategories/Staff_Dish_Categories_UI";
import Staff_Food_category_List_page from "./Staff/components/QuickOrder/FoodListPage/Staff_Food_category_List_page";
import Staff_Food_Detail_Page from "./Staff/components/QuickOrder/OrderFood/design/Staff_Food_Detail_Page";
import Staff_Home_Page from "./Staff/components/Dashboard/Dashboard-Page/Staff_Home_Page";
import Staff_Landing_Home_Page from "./Staff/components/Landing-Home-Page/LandingPage/Staff_Landing_Home_Page";
import Staff_Notification_MessageUI from "./Staff/pages/Notifications/design/Staff_Notification_MessageUI";
import Staff_Order_History_Table_UI from "./Staff/pages/Order-History/design/Staff_Order_History_Table_UI";
import Staff_Orders_Table_UI from "./Staff/pages/Orders/design/Staff_Orders_Table_UI";
import Staff_Pending_Orders_Table_UI from "./Staff/pages/Pending/design/Staff_Pending_Orders_Table_UI";
import Staff_PlaceOrder_Cart_Page from "./Staff/components/QuickOrder/PlaceOrderCart/design/Staff_PlaceOrder_Cart_Page";
import Staff_Stock_Alert_Table_UI from "./Staff/pages/Stock-Alert/design/Staff_Stock_Alert_Table_UI";
import Guest_TrialMode from "./Guest/pages/authentication/login/design/Guest_TrialMode";


// ==================================================
// Animation Wrapper for Page Transitions
// ==================================================
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

// ==================================================
// Main App Component (All Routes Combined)
// ==================================================
function App() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      {/* ================= MANAGER ROUTES ================= */}
      <Route
        path="/"
        element={
          <PageWrapper>
            <Mgr_Landing_Home_UI />
          </PageWrapper>
        }
      />
      <Route
        path="/Mgr/otp-verification"
        element={
          <PageWrapper>
            <Mgr_Otp_Verification_UI />
          </PageWrapper>
        }
      />
      <Route
        path="/Mgr/forgot-password"
        element={
          <PageWrapper>
            <Mgr_Forgot_Pwd_UI />
          </PageWrapper>
        }
      />

      {/* Manager Dashboard */}
      <Route path="/manager-dashboard" element={<Mgr_Dashboard_Page />}>
        <Route index element={<PageWrapper><Mgr_Add_Menu_Item_UI /></PageWrapper>} />
        <Route path="Add-menuItems" element={<PageWrapper><Mgr_Add_Menu_Item_UI /></PageWrapper>} />
        <Route path="profit" element={<PageWrapper><Mgr_ProfitAlertUI /></PageWrapper>} />
         <Route path="reviews" element={<PageWrapper><Mgr_reviews_UI /></PageWrapper>} />
        <Route path="food/dishes" element={<PageWrapper><Mgr_Dish_Categories_UI /></PageWrapper>} />
        <Route path="food/category/:dishName" element={<PageWrapper><Mgr_Food_category_List_page /></PageWrapper>} />
         <Route path="food/order/:itemId" element={<PageWrapper><Mgr_Food_Detail_Page /></PageWrapper>} />
        <Route path="dishes-list" element={<PageWrapper><Mgr_Edit_Dish_Categories_UI /></PageWrapper>} />
        <Route path="food-list/:dishCategory" element={<PageWrapper><Mgr_Edit_Food_List_Page /></PageWrapper>} />
        <Route path="EditMenu/:itemid/:pageNumber" element={<PageWrapper><Mgr_Edit_Menu_item_UI /></PageWrapper>} />
        <Route path="create/table" element={<PageWrapper><Mgr_Create_Table_Page /></PageWrapper>} />
        <Route path="edit/tables" element={<PageWrapper><Mgr_Edit_Tables_Page /></PageWrapper>} />
        <Route path="create/Bill" element={<PageWrapper><Mgr_Create_Bill_UI /></PageWrapper>} />
        <Route path="edit/Bill" element={<PageWrapper><Mgr_Edit_Bill_UI /></PageWrapper>} />
        <Route path="notification" element={<PageWrapper><Mgr_Notification_MessageUI /></PageWrapper>} />
        <Route path="order/history" element={<PageWrapper><Mgr_Order_History_Table_UI /></PageWrapper>} />
        <Route path="pending/orders" element={<PageWrapper><Mgr_Pending_Orders_Table_UI /></PageWrapper>} />
        <Route path="cart" element={<PageWrapper><Mgr_PlaceOrder_Cart_Page /></PageWrapper>} />
      </Route>

      {/* Manager Settings */}
      <Route path="/settings" element={<Mgr_Settings_Page />}>
        <Route index element={<PageWrapper><Mgr_Profile_settings_UI /></PageWrapper>} />
        <Route path="profile" element={<PageWrapper><Mgr_Profile_settings_UI /></PageWrapper>} />
        <Route path="hotel-info" element={<PageWrapper><Mgr_HotelInfo_settings_UI /></PageWrapper>} />
        <Route path="account" element={<PageWrapper><Mgr_Account_settings_UI /></PageWrapper>} />
        <Route path="staff-account" element={<PageWrapper><Mgr_Create_Staff_Acc_settings /></PageWrapper>} />
        <Route path="staff-passwordReset/:staffId/:name" element={<PageWrapper><Mgr_Forgot_Staff_Pwd_settings_UI /></PageWrapper>} />
        <Route path="staff-deleteAccount/:staffId/:name" element={<PageWrapper><Mgr_Delete_Staff_Acc_settings_UI /></PageWrapper>} />
        <Route path="Qr-code" element={<PageWrapper><Mgr_QRcode_settings_UI /></PageWrapper>} />
        <Route path="staff-account-list" element={<PageWrapper><Mgr_Manage_Staff_Acc_settings_UI /></PageWrapper>} />
      </Route>

      {/* ================= GUEST ROUTES ================= */}
      <Route path="/guest/login/:hotelKey" element={<Guest_Login_UI />} />
       <Route path="/guest/trailmode" element={<Guest_TrialMode />} />
      <Route path="/guest-dashboard" element={<Guest_HomePage_UI />}>
        <Route index element={<PageWrapper><Guest_Dish_Categories_UI /></PageWrapper>} />
        <Route path="food/category/:dishName" element={<PageWrapper><Guest_Food_category_List_page /></PageWrapper>} />
        <Route path="food/order/:itemId" element={<PageWrapper><Guest_Food_Detail_Page /></PageWrapper>} />
        <Route path="cart" element={<PageWrapper><Guest_PlaceOrder_Cart_Page /></PageWrapper>} />
        <Route path="orders" element={<PageWrapper><Guest_Orders_UI /></PageWrapper>} />
        <Route path="history" element={<PageWrapper><Guest_History_UI /></PageWrapper>} />
        <Route path="help" element={<PageWrapper><Guest_Help_UI /></PageWrapper>} />
        <Route path="notification" element={<PageWrapper><Guest_Notification_UI /></PageWrapper>} />
      </Route>

      {/* ================= STAFF ROUTES ================= */}
      <Route path="/staff/login" element={<Staff_Landing_Home_Page />} />
      <Route path="/staff-dashboard" element={<Staff_Home_Page />}>
        <Route index element={<PageWrapper><Staff_Dish_Categories_UI /></PageWrapper>} />
        <Route path="food/category/:dishName" element={<PageWrapper><Staff_Food_category_List_page /></PageWrapper>} />
        <Route path="quick-order" element={<PageWrapper><Staff_Dish_Categories_UI /></PageWrapper>} />
        <Route path="food/order/:itemId" element={<PageWrapper><Staff_Food_Detail_Page /></PageWrapper>} />
        <Route path="cart" element={<PageWrapper><Staff_PlaceOrder_Cart_Page /></PageWrapper>} />
        <Route path="orders" element={<PageWrapper><Staff_Orders_Table_UI /></PageWrapper>} />
        <Route path="pending" element={<PageWrapper><Staff_Pending_Orders_Table_UI /></PageWrapper>} />
        <Route path="history" element={<PageWrapper><Staff_Order_History_Table_UI /></PageWrapper>} />
        <Route path="stock" element={<PageWrapper><Staff_Stock_Alert_Table_UI /></PageWrapper>} />
        <Route path="notification" element={<PageWrapper><Staff_Notification_MessageUI /></PageWrapper>} />
      </Route>
    </Routes>
  );
}

export default App;
