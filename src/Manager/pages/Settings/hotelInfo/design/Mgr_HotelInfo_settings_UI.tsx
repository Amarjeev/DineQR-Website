import { User, Mail, Phone, Globe, MapPin } from 'lucide-react'
import { use_HotelInfo } from '../logic/use_HotelInfo'
import Loading from '../../../../components/Loading/Mgr_Loading'
import { useEffect } from 'react'
import ServerError_UI from '../../../../../ServerErrorUI/ServerError_UI'

const Mgr_HotelInfo_settings_UI: React.FC = () => {
  const {
    handleChange,
    handleSubmit,
    formData,
    errors,
    isUpdating,
    status,
    isModified,
    handelFetchHotelInfo,
  } = use_HotelInfo()

  useEffect(() => {
    handelFetchHotelInfo()
  }, [])

  if (status === 'loading') {
    return <Loading />
  } else if (status === 'error') {
    return <ServerError_UI />
  }

  return (
    <div className="max-w-2xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
        <User size={24} className="text-blue-600" /> Restaurant / Hotel Info
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        This section provides essential details about the restaurant, including
        its name, address, and contact information.
      </p>

      {/* Restaurant Name */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Name of Restaurant / Hotel
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter restaurant or hotel name"
          className={`w-full border rounded-lg px-3 py-2 focus:ring-2 focus:border-blue-400 outline-none transition ${
            errors.name
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-400'
          }`}
        />
        {errors.name ? (
          <p className="text-xs text-red-500 mt-1">{errors.name}</p>
        ) : (
          <p className="text-xs text-gray-500 mt-1">
            Restaurant name must be between 3 and 80 characters.
          </p>
        )}
      </div>

      {/* Contact Number */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Contact Number
        </label>
        <div className="relative">
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter contact number"
            className={`w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 outline-none transition ${
              errors.contactNumber
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-400'
            }`}
          />
          <Phone className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        {errors.contactNumber ? (
          <p className="text-xs text-red-500 mt-1">{errors.contactNumber}</p>
        ) : (
          <p className="text-xs text-gray-500 mt-1">
            Enter a valid Indian mobile number (10 digits, starting with 6-9).
          </p>
        )}
      </div>

      {/* Email ID */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Email ID
        </label>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className={`w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 outline-none transition ${
              errors.email
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-400'
            }`}
          />
          <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        {errors.email ? (
          <p className="text-xs text-red-500 mt-1">{errors.email}</p>
        ) : (
          <p className="text-xs text-gray-500 mt-1">
            Enter a valid email address (max 100 characters).
          </p>
        )}
      </div>

      {/* Opening Hours */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Opening Hours
        </label>
        <div className="flex gap-3">
          <select
            name="openingTime"
            value={formData.openingTime}
            onChange={handleChange}
            className={`w-1/2 border rounded-lg px-3 py-2 focus:ring-2 outline-none transition ${
              errors.openingTime
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-400'
            }`}
          >
            <option value="" disabled>
              Select Opening Time
            </option>
            {Array.from({ length: 24 }, (_, i) => {
              const hour = i % 12 === 0 ? 12 : i % 12
              const suffix = i < 12 ? 'AM' : 'PM'
              return (
                <option key={i} value={`${hour}:00 ${suffix}`}>
                  {hour}:00 {suffix}
                </option>
              )
            })}
          </select>

          <select
            name="closingTime"
            value={formData.closingTime}
            onChange={handleChange}
            className={`w-1/2 border rounded-lg px-3 py-2 focus:ring-2 outline-none transition ${
              errors.closingTime
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-400'
            }`}
          >
            <option value="" disabled>
              Select Closing Time
            </option>
            {Array.from({ length: 24 }, (_, i) => {
              const hour = i % 12 === 0 ? 12 : i % 12
              const suffix = i < 12 ? 'AM' : 'PM'
              return (
                <option key={i} value={`${hour}:00 ${suffix}`}>
                  {hour}:00 {suffix}
                </option>
              )
            })}
          </select>
        </div>
        {(errors.openingTime || errors.closingTime) && (
          <p className="text-xs text-red-500 mt-1">
            {errors.openingTime || errors.closingTime}
          </p>
        )}
      </div>

      {/* Website / Social Links */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Website / Social Links{' '}
          <span className="text-gray-400">(optional)</span>
        </label>
        <div className="relative">
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Enter website or social link"
            className={`w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 outline-none transition ${
              errors.website
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-400'
            }`}
          />
          <Globe className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        {errors.website && (
          <p className="text-xs text-red-500 mt-1">{errors.website}</p>
        )}
      </div>

      {/* Address */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Address
        </label>
        <div className="relative">
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter full address"
            rows={3}
            className={`w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 outline-none transition resize-none ${
              errors.address
                ? 'border-red-500 focus:ring-red-400'
                : 'border-gray-300 focus:ring-blue-400'
            }`}
          ></textarea>
          <MapPin className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
        {errors.address ? (
          <p className="text-xs text-red-500 mt-1">{errors.address}</p>
        ) : (
          <p className="text-xs text-gray-500 mt-1">
            Address must be between 10 and 150 characters.
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isUpdating || !isModified}
        className="
    mt-4 mb-5 w-full text-white py-2.5 rounded-lg font-medium shadow-md
    flex items-center justify-center gap-2
    bg-gradient-to-r from-green-600 to-green-500
    hover:from-green-700 hover:to-green-600
    transition-all duration-200
    disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed
  "
      >
        {isUpdating ? (
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
            Processing...
          </>
        ) : (
          'Save Information'
        )}
      </button>
    </div>
  )
}

export default Mgr_HotelInfo_settings_UI
