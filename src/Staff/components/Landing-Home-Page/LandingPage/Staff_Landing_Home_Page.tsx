import { useEffect } from 'react'
import Login_Account_UI from '../LoginAccount/design/Staff_Login_Account_UI'
import { useNavigate } from 'react-router-dom'
import { use_token_Validation } from '../../tokenValidation/use_token_Validation'

/**
 * Landing_Home_Page Component
 * ---------------------------
 * Main landing page for the application before staff login.
 * 
 * Responsibilities:
 * - Validate user token on mount to redirect authenticated users.
 * - Display branding/logo for the application.
 * - Render the login form for staff via Login_Account_UI.
 * - Fully responsive layout for desktop and mobile.
 */
const Staff_Landing_Home_Page: React.FC = () => {
  const navigate = useNavigate()
  const { handle_Token_Validation } = use_token_Validation()

  // =========================
  // Token Validation
  // =========================
  // Check if the staff is already logged in; redirect if valid
  useEffect(() => {
    handle_Token_Validation('login')
  }, [navigate])

  // =========================
  // Render
  // =========================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* ====================== Main Content Area ====================== */}
      <main className="w-full max-w-6xl flex items-center justify-center px-4 sm:px-6">
        {/* ====================== Grid Container ====================== */}
        <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ====================== Left Column: Logo & Brand ====================== */}
          <section className="flex flex-col justify-center items-center text-center space-y-6">
            {/* Logo */}
            <div className="flex justify-center items-center">
              <img
                src="/Logo/logo_Home.png"
                alt="DineQR - Restaurant Management System"
                className="w-64 sm:w-72 lg:w-80"
              />
            </div>

            {/* Brand Name */}
            <div className="space-y-2">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900">
                DineQR
              </h1>
              <p className="text-lg text-gray-600">Staff Management System</p>
            </div>
          </section>

          {/* ====================== Right Column: Login Form ====================== */}
          <aside className="flex justify-center">
            <div className="w-full max-w-md">
              {/* Login Form Component */}
              <Login_Account_UI />
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default Staff_Landing_Home_Page
