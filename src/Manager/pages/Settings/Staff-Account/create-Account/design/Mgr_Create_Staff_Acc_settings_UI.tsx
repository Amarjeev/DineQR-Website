import React from 'react'
import { User, KeyRound, Hash } from 'lucide-react'
import { Link } from 'react-router-dom'
import Loading from '../../../../../components/Loading/Mgr_Loading'
import { use_Create_Staff_Acc } from '../logic/use_Create_Staff_Acc'
import ServerError_UI from '../../../../../../ServerErrorUI/ServerError_UI'

const Mgr_Create_Staff_Acc_settings_UI: React.FC = () => {
  const {
    handleCreatAccount,
    handleChange,
    generateStaffId,
    formData,
    formErrors,
    status,
    isSubmitting,
  } = use_Create_Staff_Acc()

  if (status === 'loading') {
    return <Loading />
  } else if (status === 'error') {
    return <ServerError_UI />
  }

  return (
    <div className="w-full max-w-md mx-auto mt-6 px-4 sm:px-6 mb-5">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <User size={24} className="text-blue-600" /> Create Staff Account
      </h2>

      {/* Staff ID */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Staff ID
        </label>
        <div className="flex">
          <input
            type="text"
            name="staffId"
            value={formData.staffId}
            readOnly
            placeholder="Click 'Gen ID'"
            className={`flex-1 border px-3 py-2 rounded-l-md focus:ring-2 outline-none
              ${formErrors.staffId ? 'border-red-500 ring-red-200' : 'border-gray-300 ring-blue-400'}
            `}
          />
          <button
            type="button"
            disabled={!!formData.staffId}
            onClick={generateStaffId}
            className={`px-2 py-1 text-sm sm:text-base font-medium rounded-r-md transition
              ${
                formData.staffId
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }
            `}
          >
            Gen ID
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Your Staff ID is generated automatically. You don’t need to create
          one.
        </p>

        {formErrors.staffId && (
          <div className="mt-1 flex items-center gap-1 bg-red-50 border border-red-200 text-red-700 px-2 py-1 rounded text-sm">
            <span>⚠️</span>
            <span>{formErrors.staffId}</span>
          </div>
        )}
      </div>

      {/* name */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Name
        </label>
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={25}
            placeholder="Enter Name"
            className={`w-full border pl-10 pr-3 py-2 focus:ring-2 outline-none
              ${formErrors.name ? 'border-red-500 ring-red-200' : 'border-gray-300 ring-blue-400'}
            `}
          />
          <KeyRound
            className="absolute left-3 top-2.5 text-gray-400"
            size={20}
          />
        </div>
        {formErrors.name && (
          <div className="mt-1 flex items-center gap-1 bg-red-50 border border-red-200 text-red-700 px-2 py-1 rounded text-sm">
            <span>⚠️</span>
            <span>{formErrors.name}</span>
          </div>
        )}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            className={`w-full border pl-10 pr-3 py-2 focus:ring-2 outline-none
              ${formErrors.password ? 'border-red-500 ring-red-200' : 'border-gray-300 ring-blue-400'}
            `}
          />
          <KeyRound
            className="absolute left-3 top-2.5 text-gray-400"
            size={18}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Password must be 8 characters long.
        </p>

        {formErrors.password && (
          <div className="mt-1 flex items-center gap-1 bg-red-50 border border-red-200 text-red-700 px-2 py-1 rounded text-sm">
            <span>⚠️</span>
            <span>{formErrors.password}</span>
          </div>
        )}
      </div>

      {/* Confirm Password */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type="password"
            name="rePassword"
            value={formData.rePassword}
            onChange={handleChange}
            placeholder="Confirm password"
            className={`w-full border pl-10 pr-3 py-2 focus:ring-2 outline-none
              ${formErrors.rePassword ? 'border-red-500 ring-red-200' : 'border-gray-300 ring-blue-400'}
            `}
          />
          <Hash className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>

        {formErrors.rePassword && (
          <div className="mt-1 flex items-center gap-1 bg-red-50 border border-red-200 text-red-700 px-2 py-1 rounded text-sm">
            <span>⚠️</span>
            <span>{formErrors.rePassword}</span>
          </div>
        )}
      </div>

      {/* Note */}
      <div className="mb-4 flex items-start gap-2 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 px-4 py-2 rounded">
        <span className="text-lg">⚠️</span>
        <p className="text-sm">
          You can create only <strong>50 staff accounts</strong> for your hotel.
          To create a new account beyond this limit, please delete an existing
          staff account first.
        </p>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleCreatAccount}
        disabled={isSubmitting}
        className="w-full bg-green-600 text-white py-2.5 font-medium rounded-md hover:bg-green-700 transition flex items-center justify-center"
      >
        {isSubmitting ? (
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
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4l-3 3 3 3h-4z"
              ></path>
            </svg>
            Creating...
          </>
        ) : (
          'Create Account'
        )}
      </button>

      {/* Links Section */}
      <div className="flex justify-between mb-4 text-sm mt-5">
        <Link
          to="/settings/staff-account-list"
          className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Manage Staff Accounts
        </Link>
      </div>
    </div>
  )
}

export default Mgr_Create_Staff_Acc_settings_UI
