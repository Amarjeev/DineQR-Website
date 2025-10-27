import ServerError_UI from '../../../../../ServerErrorUI/ServerError_UI'
import { use_Create_Bill } from '../logic/use_Create_Bill'

const Mgr_Create_Bill_UI: React.FC = () => {
  const { handleSubmit, handleChange, errors, formData, isSubmitting, status } =
    use_Create_Bill()

  const getInputClass = (fieldName: keyof typeof errors) =>
    `mt-1 w-full border rounded-md px-3 py-2 text-sm ${
      errors[fieldName] ? 'border-red-500 bg-red-50' : 'border-gray-300'
    }`

  const getErrorTextClass = (fieldName: keyof typeof errors) =>
    `text-xs mt-1 ${errors[fieldName] ? 'text-red-600' : 'text-gray-500'}`

  if (status === 'error') {
    return <ServerError_UI />
  }
  return (
    <div className="max-w-lg mx-auto my-6 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Create Bill</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Restaurant Name */}
        <div>
          <label className="block text-sm font-medium">
            Name of Restaurant/Hotel
          </label>
          <input
            type="text"
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            placeholder="Enter restaurant name"
            className={getInputClass('restaurantName')}
          />
          <p className={getErrorTextClass('restaurantName')}>
            {errors.restaurantName ||
              'Restaurant name must be between 3 and 80 characters.'}
          </p>
        </div>

        {/* Full Address */}
        <div>
          <label className="block text-sm font-medium">
            Full Address (with PIN code)
          </label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
            className={getInputClass('address') + ' h-24 resize-none'}
            maxLength={150}
            minLength={10}
          />
          <p className={getErrorTextClass('address')}>
            {errors.address || 'Address must be between 10 and 150 characters.'}
          </p>
        </div>

        {/* GST Number */}
        <div>
          <label className="block text-sm font-medium">
            GSTIN (if registered)
          </label>
          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleChange}
            placeholder="Enter GST number"
            className={getInputClass('gstNumber')}
          />
          <p className={getErrorTextClass('gstNumber')}>
            {errors.gstNumber || 'GSTIN must be 15 characters.'}
          </p>
        </div>

        {/* Contact Number */}
        <div>
          <label className="block text-sm font-medium">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter contact number"
            className={getInputClass('contactNumber')}
          />
          <p className={getErrorTextClass('contactNumber')}>
            {errors.contactNumber || ''}
          </p>
        </div>
        {errors.duplicatError && (
          <p className="text-red-600 text-sm mb-2">{errors.duplicatError}</p>
        )}

        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-green-600 text-white px-4 py-2 rounded-md shadow-md 
    hover:bg-green-700 active:scale-95 transform transition-all duration-200 
    hover:shadow-lg flex items-center justify-center
    ${isSubmitting ? 'opacity-70 cursor-not-allowed animate-pulse' : ''}`}
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
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Mgr_Create_Bill_UI
