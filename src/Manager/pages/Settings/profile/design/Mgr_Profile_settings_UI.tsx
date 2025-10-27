import React, { useEffect, useState } from 'react'
import { User, Mail, Phone, Lock } from 'lucide-react'
import { use_Profile } from '../logic/use_Profile'
import Loading from '../../../../components/Loading/Mgr_Loading'
import ServerError_UI from '../../../../../ServerErrorUI/ServerError_UI'

const Mgr_Profile_settings_UI: React.FC = () => {
  const [showPasswordFields, setShowPasswordFields] = useState(false)

  const {
    handleChange,
    handleSubmit,
    formData,
    handleFetchProfile,
    errors,
    isModified,
    isUpdating,
    status
  } = use_Profile()

  useEffect(() => {
    if (!isUpdating) {
      handleFetchProfile()
    }
  }, [isUpdating])

  if (status === 'loading') {
    return <Loading />
  } else if (status === 'error') {
    return <ServerError_UI />
  }

  return (
    <div className="max-w-2xl mx-auto mt-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <User size={24} className="text-blue-600" /> Profile Settings
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Name
          </label>
          <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            />
            <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            />
            <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Mobile */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Mobile No.
          </label>
          <div className="relative">
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            />
            <Phone
              className="absolute left-3 top-2.5 text-gray-400"
              size={18}
            />
          </div>
          {errors.mobileNumber && (
            <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
          )}
        </div>

        {/* Password Section */}
        {!showPasswordFields ? (
          <div className="mb-5 flex items-center justify-between">
            <label className=" text-sm font-semibold text-gray-700 flex items-center gap-1">
              <Lock size={16} /> Password
            </label>
            <button
              type="button"
              onClick={() => setShowPasswordFields(true)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium transition"
            >
              Change password
            </button>
          </div>
        ) : (
          <div className="animate-fadeIn">
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              />
              {errors.Password && (
                <p className="text-red-500 text-xs mt-1">{errors.Password}</p>
              )}
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="rePassword"
                value={formData.rePassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
              />
              {errors.rePassword && (
                <p className="text-red-500 text-xs mb-2">{errors.rePassword}</p>
              )}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={!isModified || isUpdating}
          className={`mb-3 w-full py-2.5 rounded-lg font-medium shadow-md transition-all duration-300 flex items-center justify-center
    ${
      isUpdating
        ? 'bg-blue-500 text-white cursor-wait animate-pulse' // processing animation
        : isModified
          ? 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600'
          : 'bg-gray-400 text-gray-200 cursor-not-allowed'
    }`}
        >
          {isUpdating ? (
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
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Processing...
            </>
          ) : (
            'Update Profile'
          )}
        </button>
      </form>
    </div>
  )
}

export default Mgr_Profile_settings_UI
