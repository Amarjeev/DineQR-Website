import { useEffect, useRef } from 'react'
import { foodCategories } from '../../../../../Data/FoodCategory'
import { use_Edit_Menu_item } from '../logic/use_Edit_Menu_item'
import { Blurhash } from 'react-blurhash'
import Loading from '../../../../../components/Loading/Mgr_Loading'
import ServerError_UI from '../../../../../../ServerErrorUI/ServerError_UI'

const Mgr_Edit_Menu_item_UI: React.FC = () => {
  const {
    handleSubmit,
    foodItem, // 👈 Object model of Food Item (stores all form input values)
    handleChange, // updates productName, sizes, foodType, dishTime, foodCategory, availability
    handlePriceChange, // updates prices for each size
    errors, // stores validation error messages
    handleImageChange, // handles file upload
    imageError, //Image
    image,
    uploadStatus,
    fetchMenuItem,
    blurHash,
    status,
    isButtonDisabled,
    setIsButtonDisabled,
    isEditMode,
    setIsEditMode,
    handleDelete
  } = use_Edit_Menu_item()

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    fetchMenuItem()
  }, [])

  const handleEdit = () => {
    setIsEditMode(false)
  }

  const handleCancel = () => {
    setIsEditMode(true)
    setIsButtonDisabled(true)
  }

  

  if (status === 'loading') {
    return <Loading />
  } else if (status === 'error') {
    return <ServerError_UI />
  }
  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden">
      <div className="flex justify-between mt-2  space-x-3">
        {isEditMode && (
          <button
            onClick={handleEdit}
            className="px-3 py-1.5 bg-gray-500 text-white text-sm font-medium rounded-lg ml-2
             shadow-sm hover:bg-gray-600 hover:shadow-md 
             transition-all duration-200 ease-in-out flex items-center space-x-1"
          >
            Edit
          </button>
        )}
        {!isEditMode && (
          <>
            <button
              onClick={handleCancel}
              className="px-3 py-1.5  text-white text-sm font-medium rounded-lg ml-2
             shadow-sm hover:bg-gray-500 hover:shadow-md 
             transition-all duration-200 ease-in-out flex items-center space-x-1"
            >
              ❌
            </button>

            <button
              onClick={handleDelete}
              className="px-3 py-1.5 text-white text-xl font-medium rounded-lg mr-2
             shadow-sm hover:bg-red-600 hover:shadow-md 
             transition-all duration-200 ease-in-out flex items-center space-x-1"
            >
              🗑️
            </button>
          </>
        )}
      </div>
      {/* Image Upload */}
      <div className="p-4 flex flex-col items-center space-y-3 border-b">
        <div className="relative w-32 h-32">
          {/* Blurhash placeholder */}
          {blurHash && !image && (
            <Blurhash
              hash={blurHash}
              width={128}
              height={128}
              resolutionX={32}
              resolutionY={32}
              punch={1}
              className="rounded-lg border"
            />
          )}

          {/* Actual Image */}
          {image && (
            <img
              src={
                typeof image === 'string' ? image : URL.createObjectURL(image)
              }
              alt="preview"
              className="w-32 h-32 object-cover rounded-lg border"
            />
          )}

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageChange}
            disabled={isEditMode}
            className="hidden"
            ref={fileInputRef}
          />

          {/* Change Profile Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute -top-2 -left-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
            title="Change Profile"
          >
            ✎
          </button>
        </div>

        {imageError && <h1 className="text-red-500">{imageError}</h1>}
      </div>

      {/* Form */}
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Add Food Item
        </h1>
        {errors.productName && (
          <h1 className=" text-red-500">{errors.productName}</h1>
        )}
        {/* Product Name */}
        <input
          type="text"
          maxLength={50}
          name="productName"
          value={foodItem?.productName}
          onChange={handleChange}
          disabled={isEditMode}
          placeholder="Enter Product Name"
          className={`w-full p-3 rounded-lg border focus:ring-2 ${
            errors.productName
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:ring-blue-400'
          }`}
        />

        {/* Sizes & Prices */}
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 font-semibold mb-1">
            Select Sizes & Enter Prices
          </label>
          {errors.sizes && <h1 className=" text-red-500">{errors.sizes}</h1>}

          {(['quarter', 'half', 'full'] as const).map((size) => (
            <div key={size} className="flex items-center space-x-4">
              <label className="flex items-center w-28 space-x-2">
                <input
                  type="checkbox"
                  name={size}
                  checked={foodItem.sizes[size]}
                  onChange={handleChange}
                  disabled={isEditMode}
                  className="w-4 h-4 text-blue-500 rounded"
                />
                <span className="capitalize">{size}</span>
              </label>

              {foodItem?.sizes[size] && (
                <div className="flex flex-col">
                  <input
                    type="number"
                    placeholder="Price"
                    value={foodItem.prices[size]}
                    onChange={(e) => handlePriceChange(size, e.target.value)}
                    disabled={isEditMode}
                    className={`border p-2 rounded-lg w-32 focus:ring-2 ${
                      errors.prices?.[size]
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-gray-300 focus:ring-blue-400'
                    }`}
                  />
                  {errors.prices && (
                    <h1 className="text-red-500 text-sm mt-1">
                      {errors?.prices[size]}
                    </h1>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Dropdowns */}
        {errors.foodType && (
          <h1 className="text-red-500 text-sm mt-1">{errors?.foodType}</h1>
        )}
        <select
          name="foodType"
          value={foodItem.foodType}
          onChange={handleChange}
          disabled={isEditMode}
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Food Type</option>
          <option value="veg">Veg</option>
          <option value="non-veg">Non-Veg</option>
        </select>

        <select
          name="foodCategory"
          value={foodItem.foodCategory}
          onChange={handleChange}
          disabled={isEditMode}
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select Food Category</option>
          {foodCategories.map((category, index) => (
            <option
              key={index}
              value={category.toLowerCase().replace(/\s+/g, '-')}
            >
              {category}
            </option>
          ))}
        </select>

        {errors.availability && (
          <h1 className="text-red-500 text-sm mt-1">{errors?.availability}</h1>
        )}

        <select
          name="availability"
          value={foodItem.availability}
          onChange={handleChange}
          disabled={isEditMode}
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value="Available">Available</option>
          <option value="ComingSoon">Coming Soon</option>
        </select>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={uploadStatus || isButtonDisabled}
          className={`
    mt-4 w-full text-white font-bold py-3 px-6 rounded-xl shadow-md
    transform hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out
    ${
      isButtonDisabled || isEditMode
        ? 'bg-gray-400 cursor-not-allowed opacity-70' // disabled color/style
        : 'bg-gradient-to-r from-green-400 to-blue-500 hover:shadow-lg'
    } // active color/style
  `}
        >
          {uploadStatus ? (
            <div className="flex items-center justify-center gap-2">
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
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Loading...
            </div>
          ) : (
            'Submit'
          )}
        </button>
      </div>
    </div>
  )
}

export default Mgr_Edit_Menu_item_UI
