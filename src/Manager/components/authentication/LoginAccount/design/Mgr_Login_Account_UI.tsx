import { useGlobalContext } from '../../../../useContext/useGlobalContext'
import { Link } from 'react-router-dom'
import React from 'react'
import { use_Login_Account } from '../../../authentication/LoginAccount/logic/use_Login_Account'

const Mgr_Login_Account_UI: React.FC = () => {
  const { setFormType } = useGlobalContext()

  const { handleChange, handleSubmit, error, formData, loading } =
    use_Login_Account()

  const handleCreateAccount = React.useCallback(() => {
    setFormType('create')
  }, [setFormType])

  return (
    <div
      id="login"
      className="bg-gray-50 min-h-screen flex items-center justify-center px-6 "
    >
      {/* ====================== Form Card ====================== */}
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md mx-auto">
        {/* Form Header */}
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Please login to your account to continue managing orders and staff.
        </p>

        {/* ====================== Login Form ====================== */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Links */}
          <div className="flex justify-between text-sm text-blue-500 font-medium">
            <Link
              to="/Mgr/forgot-password"
              className="hover:text-blue-600 transition"
            >
              Forgot Password?
            </Link>
            <button
              onClick={handleCreateAccount}
              className="hover:text-blue-600 transition"
            >
              Create Account
            </button>
          </div>
          {/* Error Message */}
          <h1 className="text-red-700  text-center  break-words">{error}</h1>
          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 font-semibold py-3 rounded-lg shadow transition transform
          ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600 hover:-translate-y-1 text-white'}`}
          >
            {loading ? (
              <div className="flex justify-center items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Loading...
              </div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Mgr_Login_Account_UI
