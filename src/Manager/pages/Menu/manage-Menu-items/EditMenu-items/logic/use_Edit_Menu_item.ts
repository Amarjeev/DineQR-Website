import { useState } from 'react'
import { Add_Menu_Item_Schema } from '../../../add-Menu-Item/validation/Add_Menu_Item_Schema'
import type { ZodIssue } from 'zod'
import axios, { isAxiosError } from 'axios'
import { showSuccess } from '../../../../../utils/toast'
import { useParams } from 'react-router-dom'
import { type Status } from '../../../../../../../ServerErrorUI/ServerError_UI'
import { useNavigate } from 'react-router-dom'
import { BaseUrl } from '../../../../../../../BaseUrl/BaseUrl'


// Custom hook to manage editing of a menu item by a manager
export const use_Edit_Menu_item = () => {
  const navigate = useNavigate()

  // ======================= Types ======================= //
  // Interface representing a food item
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

  // Interface for individual price errors
  interface PriceErrors {
    quarter?: string
    half?: string
    full?: string
  }

  // Interface for overall food item validation errors
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
  const [image, setImage] = useState<File | string>('') // Stores uploaded image or existing URL
  const [errors, setErrors] = useState<FoodItemErrors>({}) // Form validation errors
  const [imageError, setImageError] = useState<string | null>(null) // Image validation error
  const [uploadStatus, setUploadStatus] = useState<boolean>(false) // Uploading status
  const { itemid, pageNumber } = useParams<{
    itemid: string
    pageNumber: string
  }>()
  const currentPage = Number(pageNumber)
  const [blurHash, setBlurHash] = useState<string | null>(null) // Optional blurhash for image placeholder
  const [status, setStatus] = useState<Status>('null')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [isEditMode, setIsEditMode] = useState(true)

  // Form state for the menu item
  const [foodItem, setFoodItem] = useState<FoodItem>({
    productName: '',
    sizes: { quarter: false, half: false, full: false },
    prices: { quarter: '', half: '', full: '' },
    foodType: '',
    dishTime: '',
    foodCategory: '',
    availability: 'Available',
  })

  // ======================= Fetch Menu Item ======================= //
  // Fetch existing menu item data from the backend
  const fetchMenuItem = async () => {
    try {
      setStatus('loading')
      const response = await axios.get(`${BaseUrl}menu-items/${itemid}`, {
        withCredentials: true,
      })
      setFoodItem(response.data) // Populate form with fetched data
      setBlurHash(response.data.blurHash || '') // Set optional blurhash
      setImage(response.data.s3Url || '') // Set existing image URL
      setStatus('null')
    } catch (err) {
      console.error('Failed to fetch menu item:', err)
      setStatus('error') // Server error
    }
  }

  // ======================= Handlers ======================= //

  /**
   * Handles input changes for text, select, and checkbox fields.
   * - For size checkboxes: updates `sizes` and clears price if unchecked.
   * - For other fields: updates corresponding property in `foodItem`.
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setIsButtonDisabled(false)

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
    setIsButtonDisabled(false)
    setFoodItem((prev) => ({
      ...prev,
      prices: { ...prev.prices, [size]: price },
    }))
  }

  /**
   * Handles image upload with validation for presence and max size (10 MB).
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
      setIsButtonDisabled(false)
    }
  }

  /**
   * Handles form submission.
   * Steps:
   * 1. Validate form data with Zod schema.
   * 2. Check for image presence.
   * 3. Submit form data (foodItem + image) to backend via Axios.
   * 4. Show success/error toast notifications.
   * 5. Reset upload state after submission.
   */
  const handleSubmit = async () => {
    const result =  Add_Menu_Item_Schema.safeParse(foodItem)

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

      await axios.post(`${BaseUrl}update/edit-menuItems/${itemid}/${currentPage}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      })

      setIsButtonDisabled(true)
      setIsEditMode(true)

      showSuccess('Menu item added successfully')
      setImageError(null)
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        setStatus('error') // Server error
        if (error?.response?.status === 401) {
          return navigate('/',{replace:true})
        }
      }
    } finally {
      setUploadStatus(false)
    }
  }

  //delete itemse

  const handleDelete = async () => {
    try {
      setStatus('loading')

      await axios.post(
        `${BaseUrl}delete/edit-menuItems/${itemid}/${currentPage}`,
        {}, // empty body
        { withCredentials: true } // config
      )

      setStatus('null')

      // Show success toast
      showSuccess('Deleted successfully')
      // Navigate after 2 seconds
      setTimeout(() => {
        navigate(`/Manager-Dashboard/food-list/${foodItem?.foodCategory}`)
      }, 2000)
    } catch (error: unknown) {
      console.error('Error deleting menu item:', error)
      setStatus('error')
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
    imageError,
    uploadStatus,
    fetchMenuItem,
    blurHash,
    status,
    isButtonDisabled,
    setIsButtonDisabled,
    isEditMode,
    setIsEditMode,
    handleDelete,
  }
}
