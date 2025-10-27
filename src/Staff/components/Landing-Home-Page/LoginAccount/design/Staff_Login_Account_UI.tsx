import ServerError_UI from '../../../../../../ServerErrorUI/ServerError_UI'
import { use_Login_Account } from '../logic/use_Login_Account'

const Staff_Login_Account_UI: React.FC = () => {
  const { formData, handleChange, handleSubmit, errors, status, isLoading } =
    use_Login_Account()

  if (status === 'error') {
    return <ServerError_UI />
  }

  return (
    <div id="login" className="flex items-center justify-center px-6">
      {/* ====================== Form Card ====================== */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto border border-gray-100">
        {/* Form Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Staff Login</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Enter your staff ID and password to access the management system
          </p>
        </div>

        {/* ====================== Staff Login Form ====================== */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Staff ID Input */}
          <div className="space-y-2">
            <label
              htmlFor="staffId"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Staff ID Number
            </label>
            <div className="relative">
              <input
                type="text"
                id="staffId"
                value={formData.staffId}
                onChange={handleChange}
                placeholder="Enter your staff ID"
                className={`w-full border rounded-xl px-4 py-3.5 
                  focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 
                  ${errors.staffId ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white'}`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-gray-400">🔢</span>
              </div>
            </div>
            {errors.staffId && (
              <p className="text-sm text-red-600">{errors.staffId}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full border rounded-xl px-4 py-3.5 
                  focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 
                  ${errors.password ? 'border-red-500 focus:ring-red-500 bg-red-50' : 'border-gray-200 bg-gray-50 hover:bg-white'}`}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <span className="text-gray-400">🔒</span>
              </div>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Global Error (like invalid credentials) */}
          {errors?.commonError && (
            <div className="text-red-600 text-center text-sm font-medium bg-red-50 py-2 px-3 rounded-lg">
              {errors?.commonError}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-semibold py-4 rounded-xl shadow-lg 
    bg-gradient-to-r from-green-500 to-green-600 
    hover:from-green-600 hover:to-green-700 
    hover:shadow-xl hover:-translate-y-0.5 text-white
    transition-all duration-300 transform
    disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
          >
            <span className="flex items-center justify-center gap-2">
              {isLoading ? (
                <>
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  Sign In
                  <span className="text-lg">→</span>
                </>
              )}
            </span>
          </button>

          {/* Additional Info */}
          <div className="text-center pt-4">
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
              <p className="text-xs text-blue-700 font-medium">
                💡 Contact administrator for staff ID issues
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Staff_Login_Account_UI
