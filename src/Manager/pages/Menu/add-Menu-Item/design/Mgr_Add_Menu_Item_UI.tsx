import { foodCategories } from '../../../../Data/FoodCategory'
import { use_Add_Menu_Item } from '../logic/use_Add_Menu_Item'


const Mgr_Add_Menu_Item_UI: React.FC = () => {
  const {
    handleSubmit,
    foodItem, // 👈 Object model of Food Item (stores all form input values)
    handleChange, // updates productName, sizes, foodType, dishTime, foodCategory, availability
    handlePriceChange, // updates prices for each size
    errors, // stores validation error messages
    handleImageChange, // handles file upload
    handleDeleteImage, // deletes uploaded image
    imageError, //Image
    image,
    uploadStatus,
  } = use_Add_Menu_Item()


  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-2xl rounded-2xl border border-gray-100 overflow-hidden">
      {/* Image Upload */}
      <div className="p-4 flex flex-col items-center space-y-3 border-b">
        {image ? (
          <div className="relative w-32 h-32">
            <img
              src={image ? URL.createObjectURL(image) : ''}
              alt="preview"
              className="w-32 h-32 object-cover rounded-lg border"
            />
            <button
              onClick={handleDeleteImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
            >
              ✕
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg text-gray-400 cursor-pointer hover:border-blue-400 transition">
            <span className="text-sm">📸 Upload</span>
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}
        {imageError && <h1 className=" text-red-500">{imageError}</h1>}
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
          value={foodItem.productName}
          onChange={handleChange}
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
                  className="w-4 h-4 text-blue-500 rounded"
                />
                <span className="capitalize">{size}</span>
              </label>

              {foodItem.sizes[size] && (
                <div className="flex flex-col">
                  <input
                    type="number"
                    placeholder="Price"
                    value={foodItem.prices[size]}
                    onChange={(e) => handlePriceChange(size, e.target.value)}
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
          className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value="Available">Available</option>
          <option value="ComingSoon">Coming Soon</option>
        </select>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={uploadStatus} // prevent multiple clicks
          className={`
        mt-4 w-full bg-gradient-to-r from-green-400 to-blue-500
        text-white font-bold py-3 px-6 rounded-xl
        shadow-md hover:shadow-lg
        transform hover:scale-105 active:scale-95
        transition-all duration-300 ease-in-out
        ${uploadStatus ? 'cursor-not-allowed opacity-70' : ''}
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

export default Mgr_Add_Menu_Item_UI
