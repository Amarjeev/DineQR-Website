import { useState } from 'react'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'
import localforage from 'localforage'
import axios from 'axios'

/** Interface defining the structure of portion details in a cart item */
interface PortionDetail {
  portion: 'quarter' | 'half' | 'full'
  quantity: number
  price: number
  subtotal: number
}

/** Interface defining the structure of a cart item */
interface CartItem {
  id: string
  name: string
  image: string
  portions: PortionDetail[]
  blurHash: string
}

/**
 * Custom hook for managing cart operations in the place order flow
 * Handles user cart fetching, storage management, and cart state
 * 
 * @returns Object containing cart state and fetch function
 */
export const use_PlaceOrder_Cart = () => {
  // State for storing the current user ID
  const [userId, setUserId] = useState<string | null>(null)
  
  // State for storing the list of food items in the cart
  const [addedFoodItems, setAddedFoodItems] = useState<CartItem[]>([])

  /**
   * Fetches user cart data from session storage or API
   * Retrieves user ID and associated cart items with expiry validation
   * Handles both authenticated and guest user scenarios
   */
  const fetchUserCart = async () => {
    let fetchedUserId
    
    // Try to get user ID from session storage first
    fetchedUserId = sessionStorage.getItem('guest-userId')

    try {
      // Fetch user ID from API if not found in session storage
      if (!fetchedUserId) {
        const response = await axios.get(`${BaseUrl}guest/get/userId`, {
          withCredentials: true,
        })
        fetchedUserId = response.data.userId
        sessionStorage.setItem('guest-userId', fetchedUserId)
      }
      setUserId(fetchedUserId)

      // Retrieve cart data from local storage with expiry check
      const storedData = await localforage.getItem<{
        items: any[]
        expiry: number
      }>(`Add-to-cart_food_list${fetchedUserId}`)

      // Clear cart if data is expired or doesn't exist
      if (
        !storedData ||
        (storedData.expiry && storedData.expiry < Date.now())
      ) {
        setAddedFoodItems([])
        return
      }

      // Map stored items to CartItem interface and update state
      if (storedData?.items && Array.isArray(storedData.items)) {
        const mappedItems: CartItem[] = storedData.items.map((item) => ({
          id: item.itemId,
          name: item.productName,
          image: item.s3Url,
          portions: item.portions.map((p: any) => ({
            portion: p.portion,
            quantity: p.quantity,
            price: p.price,
            subtotal: p.subtotal,
          })),
          blurHash: item.blurHash || 'LEHV6nWB2yk8pyo0adR*.7kCMdnj', // Default blurhash
        }))
        setAddedFoodItems(mappedItems)
      }
    } catch (err: any) {
      console.error('Error fetching user ID or cart items:', err)
    }
  }

  return { fetchUserCart, userId, addedFoodItems, setAddedFoodItems }
}