import { KeyRound, Mail, Hash, User } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { use_Del_Staff_Acc } from '../logic/use_Del_Staff_Acc'
import { useEffect } from 'react'
import ServerError_UI from '../../../../../../../../ServerErrorUI/ServerError_UI'

const Mgr_Delete_Staff_Acc_settings_UI: React.FC = () => {
  const { staffId: paramStaffId, name } = useParams<{
    staffId: string
    name: string
  }>()

  const {
    handlePasswordCheck,
    handleChange,
    formData,
    step,
    setFormData,
    error,
    status,
    isPasswordVerified,
    handleOTPCheck,
    handleCancel,
    isOTPVerified,
  } = use_Del_Staff_Acc()

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      staffId: paramStaffId ?? '',
    }))
  }, [])

  if (status === 'error') {
    return <ServerError_UI />
  }

  return (
    <div className="w-full max-w-md mx-auto mt-6 px-4 sm:px-6 mb-6">
      <h2 className="text-2xl font-bold text-red-700 mb-4 text-center">
        Delete Staff Account
      </h2>

      {/* Staff Info Box */}
      <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6 shadow-sm">
        <h3 className="text-lg font-semibold text-red-600 mb-2 flex items-center gap-2">
          <User size={20} /> Staff Information
        </h3>
        <p className="text-gray-700">
          <span className="font-medium">Name:</span> {name}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Staff ID:</span> {paramStaffId}
        </p>
      </div>

      {/* Password Step */}
      {step === 'password' && (
        <div className="bg-white border border-gray-200 rounded-md shadow-md p-4 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Enter Staff Password
          </label>
          <div className="relative mb-4">
            <input
              type="password"
              placeholder="Staff Password"
              value={formData.password}
              onChange={(e) => handleChange('password', e.target.value)}
              className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:ring-red-400 outline-none"
            />
            <KeyRound
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
            {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
          </div>
          <div className="flex gap-3">
            <button
              disabled={isPasswordVerified}
              onClick={handlePasswordCheck}
              className="flex-1 bg-red-600 text-white py-2.5 font-medium rounded-md hover:bg-red-700 transition flex justify-center items-center gap-2"
            >
              {isPasswordVerified ? (
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
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                <>
                  <Hash size={18} /> Verify Password
                </>
              )}
            </button>

            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-300 text-gray-800 py-2.5 font-medium rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* OTP Step */}
      {step === 'otp' && (
        <div className="bg-white border border-gray-200 rounded-md shadow-md p-4 mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Enter OTP
          </label>
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Enter 5-digit OTP"
              maxLength={5}
              value={formData.otp}
              onChange={(e) => handleChange('otp', e.target.value)}
              className="w-full border border-gray-300 pl-10 pr-3 py-2 rounded-md focus:ring-2 focus:ring-red-400 outline-none"
            />
            <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          {error && <p className="text-sm text-red-600 mb-3">{error}</p>}
          <p className="text-xs text-gray-600 mb-4">
            A 5-digit OTP has been sent to the registered email address.
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleOTPCheck}
              disabled={isOTPVerified} // Disable while verifying
              className="flex-1 bg-red-600 text-white py-2.5 font-medium rounded-md hover:bg-red-700 transition flex justify-center items-center gap-2"
            >
              {isOTPVerified ? (
                // Loading spinner
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
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                <Hash size={18} />
              )}
              {isOTPVerified ? 'Processing...' : 'Confirm Deletion'}
            </button>

            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-300 text-gray-800 py-2.5 font-medium rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Mgr_Delete_Staff_Acc_settings_UI
