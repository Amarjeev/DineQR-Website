import { useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {BaseUrl} from "../../../../../../BaseUrl/BaseUrl"
import { showError } from '../../../../utils/toast'
import localforage from 'localforage'
import { type Status } from '../../../../../../ServerErrorUI/ServerError_UI'

export interface FoodItem {
  _id: string
  productName: string
  foodCategory: string
  foodType: 'veg' | 'non-veg'
  hotelKey: string
  availability: 'Available' | 'SoldOut' | 'ComingSoon'
  isDeleted: boolean
  prices: {
    quarter: string
    half: string
    full: string
  }
  sizes: {
    quarter: boolean
    half: boolean
    full: boolean
  }
  s3Url: string
  blurHash: string
}

/**
 * Custom hook to fetch a specific food item and cart info.
 *
 * Responsibilities:
 * - Fetch single food item from API
 * - Fetch corresponding cart item from localForage
 * - Maintain loading and error status
 */
export const use_Get_Food = () => {
  const { itemId } = useParams<{ itemId?: string }>()
  const [foodItem, setFoodItem] = useState<FoodItem | null>(null)
  const [userId, setUserId] = useState<string>('')
  const [cartItem, setCartItem] = useState<any | null>(null)
  const [loadingStatus, setLoadingStatus] = useState<Status>('null')

  const fetchFood = async () => {
    if (!itemId) {
      showError('Something went wrong')
      return
    }

    try {
      setLoadingStatus('loading')

      // Fetch food item from API
      const response = await axios.get<{
        success: boolean
        message: string
        data: FoodItem
        userId?: string
      }>(`${BaseUrl}staff/get/food/${itemId}`, {
        withCredentials: true,
      })

      setFoodItem(response.data.data)
      if (response.data.userId) setUserId(response.data.userId)

      // Fetch cart data from localForage
      const storedData = await localforage.getItem<{
        items: any[]
        expiry?: number
      }>(`Add-to-cart_food_list${response.data.userId}`)

      if (storedData && Array.isArray(storedData.items)) {
        const matchedItem = storedData.items.find(
          (item) => item.itemId === itemId
        )
        setCartItem(matchedItem || null)
      }

      setLoadingStatus('null')
    } catch (err: any) {
      console.error('Error fetching food item:', err)
      setLoadingStatus('error')
    }
  }

  return { foodItem, cartItem, fetchFood, userId, loadingStatus }
}
