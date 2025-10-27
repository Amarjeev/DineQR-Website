import React, { useState } from 'react'
import { ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { use_Forgot_Password } from '../logic/use_Forgot_Password'

const Mgr_Forgot_Pwd_UI: React.FC = () => {
  // ================================
  // Local UI state for toggling password visibility
  // ================================
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleToggleConfirmPassword = React.useCallback(() => {
    setShowConfirmPassword((prev) => !prev)
  }, [setShowConfirmPassword])

  const handleTogglePassword = React.useCallback(() => {
    setShowPassword((prev) => !prev)
  }, [setShowPassword])

  // ================================
  // Hook: Handles forgot password logic (email, OTP, new password)
  // ================================
  const {
    isEmailVisible,
    isPasswordVisible,
    email,
    otp,
    newPassword,
    confirmPassword,
    handleChange,
    handleSubmitOtp,
    handleResetPassword,
    handleEmailConfirm,
    error,
    loading,
    newPasswordError,
    confirmPasswordError,
    handleBackClick,
  } = use_Forgot_Password()

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-6">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md mx-auto relative">
        {/* ================================
            Back Button
        ================================ */}
        <button
          type="button"
          onClick={handleBackClick}
          className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft className="w-5 h-5 mr-1" /> Back
        </button>

        {/* ================================
            Header Section
        ================================ */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Reset your password in 3 simple steps
        </p>

        {/* ================================
            Form Section
        ================================ */}
        <form className="space-y-6">
          {/* ------------------------
              Step 1: Email Input
          ------------------------ */}
          {isEmailVisible && !isPasswordVisible && (
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                maxLength={254}
                value={email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              {/* Error Message */}
              {error && (
                <h3 className="text-red-600 bg-red-100 border border-red-300 px-4 mt-3 py-2 rounded-lg text-center font-medium shadow-sm">
                  {error}
                </h3>
              )}

              {/* Confirm Email Button */}
              <button
                type="button"
                disabled={loading || !email}
                onClick={handleEmailConfirm}
                className="w-full mt-3 bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition flex justify-center items-center gap-2"
              >
                {/* Loading Spinner */}
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3-3 3h4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                )}
                {loading ? 'Processing...' : 'Confirm'}
              </button>
            </div>
          )}

          {/* ------------------------
              Step 2: OTP Input
          ------------------------ */}
          {!isEmailVisible && !isPasswordVisible && (
            <div>
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-1"
              >
                Enter 6-digit OTP
              </label>
              {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleChange}
                maxLength={6}
                placeholder="Enter OTP"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 tracking-widest text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <p className="text-black text-sm mt-2">
                ⏳ OTP valid for 3 minutes only.
              </p>

              {/* Submit OTP Button */}
              <button
                type="button"
                disabled={otp.length !== 6 || loading}
                onClick={handleSubmitOtp}
                className="w-full mt-3 bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition flex justify-center items-center gap-2"
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3-3 3h4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                )}
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          )}

          {/* ------------------------
              Step 3: New Password
          ------------------------ */}
          {isPasswordVisible && (
            <>
              {/* New Password Field */}
              <div>
                <label
                  htmlFor="newPassword"
                  className="block text-gray-700 font-medium mb-1"
                >
                  New Password
                </label>
                <div className="mt-4">
                  {newPasswordError && (
                    <h1 className="text-red-500 text-sm mb-3">
                      {newPasswordError}
                    </h1>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="newPassword"
                    value={newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={handleTogglePassword}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Confirm Password
                </label>
                <div className="mt-4">
                  {confirmPasswordError && (
                    <h1 className="text-red-500 text-sm mb-3">
                      {confirmPasswordError}
                    </h1>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    disabled={!newPassword}
                    placeholder="Re-enter new password"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={handleToggleConfirmPassword}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Reset Password Button */}
              <button
                type="button"
                disabled={
                  loading || !!confirmPasswordError || !!newPasswordError
                }
                onClick={handleResetPassword}
                className="w-full mt-3 bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600 transition flex justify-center items-center gap-2"
              >
                {loading && (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3-3 3h4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                    ></path>
                  </svg>
                )}
                {loading ? 'Submitting...' : 'Reset Password'}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  )
}

export default Mgr_Forgot_Pwd_UI
