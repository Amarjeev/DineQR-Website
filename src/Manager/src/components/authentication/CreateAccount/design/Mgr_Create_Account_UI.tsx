import React from 'react';
import { use_Create_Account } from '../logic/use_Create_Account';
import { useGlobalContext } from '../../../../useContext/useGlobalContext';


const Mgr_Create_Account_UI: React.FC = () => {
  const { setFormType } = useGlobalContext()
  const {
    formData,
    handleChange,
    handleSubmit,
    error,
    showLoader,
    emailError,
  } =  use_Create_Account()

    const handleGoToLogin = React.useCallback(() => {
    setFormType('login');
  }, [setFormType]);

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-6 py-12">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Sign Up
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Fill in your details to create a new account.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {error && <p className="text-red-500 text-sm">{error.name}</p>}

          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {error && <p className="text-red-500 text-sm">{error.email}</p>}
          {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

          <input
            type="tel"
            id="mobileNumber"
            placeholder="Enter your mobile number"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {error && (
            <p className="text-red-500 text-sm">{error.mobileNumber}</p>
          )}

          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {error && <p className="text-red-500 text-sm">{error.password}</p>}

          <input
            type="password"
            id="rePassword"
            placeholder="Re-enter your password"
            value={formData.rePassword}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {error.rePassword && (
            <p className="text-red-500 text-sm">{error.rePassword}</p>
          )}

          <div className="flex justify-between text-sm text-blue-500 font-medium">
            <button
              onClick={handleGoToLogin}
              className="hover:text-blue-600 transition"
            >
              Already have an account?
            </button>
          </div>

          <button
            type="submit"
            disabled={showLoader}
            className={`w-full mt-4 font-semibold py-3 rounded-lg shadow transition transform
    ${
      showLoader
        ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
        : 'bg-green-500 hover:bg-green-600 hover:-translate-y-1 text-white'
    }`}
          >
            {showLoader ? (
              <div className="flex justify-center items-center gap-2">
                {/* Spinner */}
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Processing...
              </div>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Mgr_Create_Account_UI
