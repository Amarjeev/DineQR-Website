import { use_Login_logic } from './use_Login_logic'

const Guest_Login_UI: React.FC = () => {
  // =========================
  // 🔹 Using login logic hook
  // =========================
  const {
    step,
    mobile,
    otp,
    timeLeft,
    loading,
    error,
    otpError,
    formatTime,
    setMobile,
    handleMobileSubmit,
    handleOtpChange,
    handleVerifyOtp,
    handleResendOtp,
  } = use_Login_logic()

  return (
    <>
      {/* =========================
          🔹 Main Container
      ========================= */}
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 pt-24 pb-16">
        <div className="bg-white shadow-2xl rounded-3xl w-full max-w-sm p-8 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-16 -left-16 w-40 h-40 bg-orange-200 rounded-full opacity-30"></div>
          <div className="absolute -bottom-16 -right-56 w-56 h-56 bg-orange-100 rounded-full opacity-40"></div>

          {/* App Title */}
          <h1 className="text-4xl font-extrabold text-center text-orange-600 mb-8 relative z-10">
            🍽️ DineQR
          </h1>

          {/* =========================
              🔹 Mobile Input Step
          ========================= */}
          {step === 'mobile' && (
            <form
              onSubmit={handleMobileSubmit}
              className="flex flex-col space-y-5 relative z-10"
            >
              <label className="text-gray-700 font-semibold text-center">
                Enter Mobile Number
              </label>
              <input
                type="tel"
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="10-digit mobile number"
                className="border border-gray-300 rounded-2xl p-4 text-center focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm placeholder-gray-400 text-lg"
              />
              {error && (
                <p className="text-center text-sm text-red-500 font-medium -mt-2">
                  {error}
                </p>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`bg-gradient-to-r from-orange-400 to-orange-500 text-white py-3 rounded-2xl font-semibold shadow-md hover:scale-105 transition-transform ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          )}

          {/* =========================
              🔹 OTP Input Step
          ========================= */}
          {step === 'otp' && (
            <div className="flex flex-col space-y-4 relative z-10">
              {/* Instruction */}
              <h2 className="text-center text-lg font-medium text-gray-700">
                Enter the OTP sent to {mobile}
              </h2>

              {/* Timer or Error Message */}
              {!error && (
                <p className="text-center text-sm text-red-500">
                  OTP valid for: {formatTime(timeLeft)}
                </p>
              )}
              {error && (
                <p className="text-center text-sm text-red-500">{error}</p>
              )}

              {/* OTP Input Fields */}
              <div className="flex justify-between">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    className="w-12 ml-1 h-14 text-center border border-gray-300 rounded-xl text-xl focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-md"
                  />
                ))}
              </div>

              {/* OTP Error */}
              {otpError && (
                <p className="text-center text-sm text-red-500 font-medium -mt-2">
                  {otpError}
                </p>
              )}

              {/* Verify OTP Button */}
              {timeLeft !== 0 && (
                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className={`bg-gradient-to-r from-green-400 to-green-500 text-white py-3 rounded-2xl font-semibold shadow-md flex items-center justify-center gap-2 hover:scale-105 transition-transform ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
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
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  )}
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              )}

              {/* Resend OTP Button */}
              {timeLeft === 0 && (
                <button
                  onClick={handleResendOtp}
                  disabled={timeLeft > 0 || loading}
                  className={`mt-2 py-2 rounded-lg font-semibold w-full flex items-center justify-center gap-2
                    ${
                      timeLeft > 0 || loading
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-orange-500 text-white hover:scale-105 transition-transform animate-pulse'
                    }
                  `}
                >
                  {/* Spinner while sending */}
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
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  )}
                  {loading ? 'Sending...' : 'Resend OTP'}
                </button>
              )}
            </div>
          )}

          {/* Footer Text */}
          <p className="text-xs text-center text-gray-400 mt-6 relative z-10">
            Secure login with DineQR
          </p>
        </div>
      </div>
    </>
  )
}

export default Guest_Login_UI
