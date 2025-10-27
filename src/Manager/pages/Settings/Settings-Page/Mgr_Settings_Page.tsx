import React from "react";
import Settings_Navbar_UI from "../../../components/Dashboard-Navbars/Settings-Navbar/Mgr_Settings_Navbar_UI";
import { Outlet } from "react-router-dom";
import Dash_Navbar_UI from "../../../components/Dashboard-Navbars/Dash-Navbar/Mgr_Dash_Navbar_UI";


const Mgr_Settings_Page: React.FC = () => {
  return (
        <div className="h-screen flex flex-col">
      {/* Navbars stay at top */}
      <div className="flex-shrink-0">
        <Dash_Navbar_UI />
        <Settings_Navbar_UI />
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Mgr_Settings_Page;
