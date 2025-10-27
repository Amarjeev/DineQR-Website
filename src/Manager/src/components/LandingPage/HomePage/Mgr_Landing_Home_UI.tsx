import { useGlobalContext } from '../../../useContext/useGlobalContext'
import Mgr_Landing_Navbar_UI from '../Navbar/Mgr_Landing_Navbar_UI'
import Mgr_Landing_Footer_UI from '../Footer/Mgr_Landing_Footer_UI'
import Mgr_Login_Account_UI from '../../authentication/LoginAccount/design/Mgr_Login_Account_UI'
import Mgr_Create_Account_UI from '../../authentication/CreateAccount/design/Mgr_Create_Account_UI'
import { use_token_Validation } from '../../tokenValidation/use_token_Validation';
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'



const Mgr_Landing_Home_UI: React.FC = () => {
  const { formType } = useGlobalContext()
   const { handle_Token_Validation } = use_token_Validation(); // Token verification
  const navigate = useNavigate();

    // =========================
  // Token Validation
  // =========================
  // Verify manager token on component mount
  useEffect(() => {
    handle_Token_Validation('login');
  }, [navigate]);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* ====================== Navbar ====================== */}
      <Mgr_Landing_Navbar_UI />

      {/* ====================== Main Content Area ====================== */}
      <div className="flex-1 flex items-center justify-center px-6 py-8">
        {/* ====================== Grid Container ====================== */}
        <div className="max-w-7xl w-full grid md:grid-cols-2 gap-12 items-center">
          {/* ====================== Left Column: Animated Logo + Content ====================== */}
          <div className="flex flex-col justify-center items-center text-center space-y-4">
            <div className="relative flex justify-center items-center">
              {/* Logo Image with bounce animation */}
              <img
                src="/Logo/logo_Home.png"
                alt="DineQR Mobile"
                className="relative z-10 mx-auto w-64 sm:w-72 md:w-80 animate-bounce"
              />
            </div>

            {/* Content below the logo */}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Welcome to DineQR
            </h2>
            <p className="text-gray-600 max-w-sm">
              The easiest way to manage your restaurant orders and reservations.
              Log in or create an account to get started.
            </p>
          </div>

          {/* ====================== Right Column: Form ====================== */}

          {formType === 'create' ? <Mgr_Create_Account_UI /> : <Mgr_Login_Account_UI />}
        </div>
      </div>

      {/* ====================== Footer ====================== */}
      <Mgr_Landing_Footer_UI />
    </div>
  )
}

export default Mgr_Landing_Home_UI
