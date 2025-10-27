import { useState } from 'react'
import { Add_Menu_Item_Schema } from '../validation/Add_Menu_Item_Schema'
import type { ZodIssue } from 'zod'
import axios, { isAxiosError } from 'axios'
import { showError, showSuccess } from '../../../../utils/toast'
import { useNavigate } from 'react-router-dom'
import { BaseUrl } from '../../../../../../BaseUrl/BaseUrl'

export const use_Add_Menu_Item = () => {
  const navigate = useNavigate()

  // ======================= Types ======================= //
  interface FoodItem {
    productName: string
    sizes: {
      quarter: boolean
      half: boolean
      full: boolean
    }
    prices: {
      quarter: string
      half: string
      full: string
    }
    foodType: string // veg / non-veg
    dishTime: string // breakfast / lunch / dinner...
    foodCategory: string // category list
    availability: string // Available / Not Available
  }

  interface PriceErrors {
    quarter?: string
    half?: string
    full?: string
  }

  interface FoodItemErrors {
    productName?: string
    sizes?: string
    prices?: PriceErrors
    foodType?: string
    dishTime?: string
    foodCategory?: string
    availability?: string
  }

  // ======================= State ======================= //
  const [image, setImage] = useState<File | null>(null) // uploaded image
  const [errors, setErrors] = useState<FoodItemErrors>({}) // validation errors
  const [imageError, setImageError] = useState<string | null>(null) // image validation error
  const [uploadStatus, setUploadStatus] = useState<boolean>(false)

  // Form data for menu item
  const [foodItem, setFoodItem] = useState<FoodItem>({
    productName: '',
    sizes: { quarter: false, half: false, full: false },
    prices: { quarter: '', half: '', full: '' },
    foodType: '',
    dishTime: '',
    foodCategory: '',
    availability: 'Available',
  })

  // ======================= Handlers ======================= //

  /**
   * Handles input changes (text, select, checkbox).
   * - For size checkboxes → updates both `sizes` and resets prices if unchecked.
   * - For other fields → updates corresponding property in `foodItem`.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target

    if (
      type === 'checkbox' &&
      (name === 'quarter' || name === 'half' || name === 'full')
    ) {
      const { checked } = e.target as HTMLInputElement
      setFoodItem((prev) => ({
        ...prev,
        sizes: { ...prev.sizes, [name]: checked },
        prices: { ...prev.prices, [name]: checked ? prev.prices[name] : '' },
      }))
    } else if (name in foodItem) {
      setFoodItem((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  /**
   * Handles price input changes for each size.
   */
  const handlePriceChange = (
    size: 'quarter' | 'half' | 'full',
    price: string
  ) => {
    setFoodItem((prev) => ({
      ...prev,
      prices: { ...prev.prices, [size]: price },
    }))
  }

  /**
   * Handles image upload (with file size validation).
   */
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (!file) {
        setImageError('Please add an image')
        return
      }
      const fileSizeMB = file.size / (1024 * 1024)
      if (fileSizeMB > 10) {
        setImageError('Max 10 MB allowed')
        return
      }
      setImage(file)
    }
  }

  /**
   * Deletes uploaded image.
   */
  const handleDeleteImage = () => {
    setImage(null)
    // setCroppedImage(null)
  }

  /**
   * Handles form submission:
   * 1. Validates data with Zod schema.
   * 2. Validates image presence/size.
   * 3. Submits data (foodItem + image) to backend using Axios.
   * 4. Shows toast notifications.
   * 5. Resets form state after success.
   */
  const handleSubmit = async () => {
    const result = Add_Menu_Item_Schema.safeParse(foodItem)

    // Handle validation errors
    if (!result.success) {
      const errorObj: FoodItemErrors = {}
      result.error.issues.forEach((issue: ZodIssue) => {
        const field = issue.path[0] as string
        if (issue.path[0] === 'prices' && issue.path[1]) {
          const size = issue.path[1] as 'quarter' | 'half' | 'full'
          if (!errorObj.prices) errorObj.prices = {}
          errorObj.prices[size] = issue.message
        } else {
          errorObj[field as keyof FoodItemErrors] = issue.message
        }
      })
      setErrors(errorObj)
      return
    } else if (!image) {
      setImageError('Please add an image')
      return
    }
    setUploadStatus(true)
    setErrors({})
    try {
      const formData = new FormData()
      formData.append('foodItem', JSON.stringify(foodItem))
      formData.append('image', image)

      await axios.post(`${BaseUrl}manager/addMenuItem`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })

      showSuccess('Menu item added successfully')

      // Reset everything after success
      setFoodItem({
        productName: '',
        sizes: { quarter: false, half: false, full: false },
        prices: { quarter: '', half: '', full: '' },
        foodType: '',
        dishTime: '',
        foodCategory: '',
        availability: 'Available',
      })
      setImage(null)
      setErrors({})
      setImageError(null)
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        if (error?.response?.status === 401) {
          return navigate('/', { replace: true })
        }
        showError('Internal server error while adding menu item.')
        console.log(error)
      }
    } finally {
      setUploadStatus(false)
    }
  }

  // ======================= Exposed values & functions ======================= //
  return {
    handleSubmit,
    foodItem,
    handleChange,
    handlePriceChange,
    image,
    setImage,
    errors,
    handleImageChange,
    handleDeleteImage,
    imageError,
    uploadStatus,
  }
}
