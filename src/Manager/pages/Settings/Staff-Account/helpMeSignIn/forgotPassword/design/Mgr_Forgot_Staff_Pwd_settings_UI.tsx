import { useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { KeyRound, Hash } from 'lucide-react'
import { use_Reset_Pwd } from '../logic/use_Reset_Pwd'
import ServerError_UI from '../../../../../../../ServerErrorUI/ServerError_UI'

const Mgr_Forgot_Staff_Pwd_settings_UI: React.FC = () => {
  const { staffId: paramStaffId, name } = useParams<{
    staffId: string
    name: string
  }>()
  const navigate = useNavigate()
  const {
    handleResetPassword,
    formData,
    handleChange,
    setFormData,
    showResetModal,
    setShowResetModal,
    formErrors,
    status,
    isUpdated,
    hasChanges,
  } = use_Reset_Pwd()

  const toggleResetModal = () => setShowResetModal((prev) => !prev)

  // Initialize formData and redirect if staffId missing
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      staffId: paramStaffId || '',
      name: name || '',
    }))

    if (!paramStaffId) {
      navigate('/settings/staff-account-list')
    }
  }, [paramStaffId, name, navigate, setFormData])

  if (status === 'error') {
    return <ServerError_UI />
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        {/* Back Button */}
        <Link
          to="/settings/staff-account"
          className="text-blue-600 font-medium mb-4 inline-block hover:underline"
        >
          &larr; Back
        </Link>

        <h2 className="text-lg font-semibold text-gray-900 mb-2 flex flex-wrap items-center gap-1">
          <span className="text-yellow-500">🔑</span>
          Reset Password for
          <span className="text-blue-600 font-medium">{name}</span>
        </h2>

        {/* Staff ID Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Staff ID
          </label>
          <input
            type="text"
            value={formData.staffId}
            readOnly
            placeholder="Staff ID"
            className={`w-full border rounded-md px-3 py-2 focus:ring-2 outline-none ${
              formErrors.staffId
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-400'
            }`}
          />
          {formErrors.staffId && (
            <p className="text-red-500 text-xs mt-1">{formErrors.staffId}</p>
          )}
        </div>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              maxLength={25}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full border rounded-md px-3 py-2 pl-10 focus:ring-2 outline-none ${
                formErrors.name
                  ? 'border-red-500 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-400'
              }`}
            />
            <KeyRound
              className="absolute left-3 top-2.5 text-gray-400"
              size={25}
            />
          </div>
          {formErrors.name && (
            <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
          )}
        </div>

        {/* Reset Password Button */}
        <button
          onClick={toggleResetModal}
          className="text-blue-600 font-medium hover:underline mb-3"
        >
          Reset Password
        </button>

        {/* Password Fields */}
        {!showResetModal && (
          <>
            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  className={`w-full border rounded-md px-3 py-2 pl-10 focus:ring-2 outline-none ${
                    formErrors.password
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-blue-400'
                  }`}
                />
                <KeyRound
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>
              {formErrors.password ? (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.password}
                </p>
              ) : (
                <p className="text-xs text-gray-500 mt-1">
                  Password must be at least 8 characters long.
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Confirm password"
                  value={formData.rePassword}
                  onChange={(e) => handleChange('rePassword', e.target.value)}
                  className={`w-full border rounded-md px-3 py-2 pl-10 focus:ring-2 outline-none ${
                    formErrors.rePassword
                      ? 'border-red-500 focus:ring-red-400'
                      : 'border-gray-300 focus:ring-blue-400'
                  }`}
                />
                <Hash
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>
              {formErrors.rePassword && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.rePassword}
                </p>
              )}
            </div>
          </>
        )}

        <button
          type="button"
          onClick={handleResetPassword}
          disabled={isUpdated || !hasChanges}
          className={`w-full py-2.5 font-medium rounded-md text-white transition-transform duration-300
    ${isUpdated ? 'bg-green-500 scale-105' : 'bg-green-600 hover:bg-green-700 hover:scale-105'}
    ${isUpdated || !hasChanges ? 'opacity-50 cursor-not-allowed' : ''}
  `}
        >
          {isUpdated ? 'Updated ✅' : 'Update'}
        </button>
      </div>
    </div>
  )
}

export default Mgr_Forgot_Staff_Pwd_settings_UI
