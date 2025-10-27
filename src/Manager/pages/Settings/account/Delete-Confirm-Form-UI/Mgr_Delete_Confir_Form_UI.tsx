import ServerError_UI from '../../../../../ServerErrorUI/ServerError_UI'
import { use_Mgr_Delete_Account } from '../logic/use_Mgr_Delete_Account'

interface Props {
  onCancel: () => void
}

const Mgr_Delete_Confir_Form_UI: React.FC<Props> = ({ onCancel }) => {
  const {
    handleVerifyPassword,
    isPasswordCorrect,
    password,
    setPassword,
    error,
    status,
    isLoading,
    handleVerifyOtp,
    otp,
    setOtp,
    isOTPLoading,
  } =  use_Mgr_Delete_Account()

  const handleCancel = () => {
    sessionStorage.setItem('isPasswordCorrect', false.toString())
    onCancel()
  }

  if (status === 'error') {
    return <ServerError_UI />
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg border bg-gray-50 mb-3">
      {/* Warning Header */}
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
        <strong className="block font-semibold">
          ⚠️ This is extremely important
        </strong>
        <p className="text-sm mt-1">
          All your <b>saved orders, preferences, and account details</b> will be
          permanently removed.
        </p>
      </div>

      <p className="text-sm text-gray-700 mb-3">
        You will <b>no longer</b> be able to place or track orders with this
        account.
      </p>
      <p className="text-sm text-gray-700 mb-3">
        After deletion, your phone number/email <b>may become available</b> for
        new registrations.
      </p>
      <p className="text-sm text-gray-700 mb-4">
        This action is <b>irreversible</b>, please proceed with caution.
      </p>

      {/* Form */}
      <form className="space-y-4">
        {!isPasswordCorrect && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
          </div>
        )}

        {isPasswordCorrect && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Enter OTP
            </label>
            <input
              type="text"
              placeholder="8-digit OTP"
              maxLength={8}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
            {!error && (
              <p className="text-xs text-gray-500 mt-1">
                An OTP has been sent to your registered email address. It will
                expire in 3 minutes.
              </p>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          {!isPasswordCorrect && (
            <button
              type="submit"
              onClick={handleVerifyPassword}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md font-medium transition ${
                isLoading
                  ? 'bg-green-400 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
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
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Verifying...
                </>
              ) : (
                <>🔑 Verify Password</>
              )}
            </button>
          )}
          {isPasswordCorrect && (
            <button
              type="submit"
              onClick={handleVerifyOtp}
              disabled={isOTPLoading}
              className="flex items-center justify-center flex-1 bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isOTPLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
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
                  Verifying...
                </>
              ) : (
                '✅ Proceed'
              )}
            </button>
          )}
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 bg-gray-500 text-white py-2 rounded-md font-medium hover:bg-red-600 transition"
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default Mgr_Delete_Confir_Form_UI
