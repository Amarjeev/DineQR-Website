import { useEffect, useState } from 'react'
import { use_Get_Food } from '../../../QuickOrder/OrderFood/logic/use_Get_Food'
import { use_order_Food } from '../../../QuickOrder/OrderFood/logic/use_order_Food'

export type Portion = 'Quarter' | 'Half' | 'Full'
export type AvailabilityStatus = 'Available' | 'SoldOut' | 'ComingSoon'

/**
 * Custom hook to manage food item details, quantities, and cart integration.
 *
 * Responsibilities:
 * - Fetch individual food details
 * - Track image loading state
 * - Manage portion quantities
 * - Handle updates from cart when editing
 * - Compute total amount dynamically
 * - Prepare structured data for cart submission
 */
export const use_Food_Detail_Logic = () => {
  const { fetchFood, foodItem, userId, cartItem, loadingStatus } = use_Get_Food()
  const { handleAddToCart, setSelectedItems, selectedItems, isUpdating } = use_order_Food()

  const [status, setStatus] = useState<AvailabilityStatus>('Available')
  const [quantities, setQuantities] = useState<Record<Portion, number>>({
    Quarter: 0,
    Half: 0,
    Full: 0,
  })
  const [imageLoaded, setImageLoaded] = useState(false)

  // ====================== Fetch Food Details ======================
  useEffect(() => {
    fetchFood()
  }, [])

  // ====================== Update Availability Status ======================
  useEffect(() => {
    if (foodItem) setStatus(foodItem.availability)
  }, [foodItem])

  // ====================== Prefill Quantities When Editing from Cart ======================
  useEffect(() => {
    if (!foodItem || !cartItem) return

    const prefill: Record<Portion, number> = { Quarter: 0, Half: 0, Full: 0 }
    cartItem.portions.forEach((p: any) => {
      const label = (p.portion.charAt(0).toUpperCase() + p.portion.slice(1)) as Portion
      prefill[label] = p.quantity
    })
    setQuantities(prefill)
  }, [cartItem, foodItem])

  // ====================== Update Selected Items Based on Quantities ======================
  useEffect(() => {
    if (!foodItem) return

    const portions = (['quarter', 'half', 'full'] as const)
      .map((portion) => {
        const label = (portion.charAt(0).toUpperCase() + portion.slice(1)) as Portion
        const qty = quantities[label]
        const price = foodItem?.prices?.[portion]
        if (!price || qty === 0) return null
        return {
          portion: portion.toLowerCase(),
          quantity: qty,
          price: Number(price),
          subtotal: qty * Number(price),
        }
      })
      .filter(Boolean)

    if (portions.length > 0) {
      const mergedItem = {
        itemId: foodItem._id,
        s3Url: foodItem.s3Url,
        blurHash: foodItem.blurHash,
        foodCategory: foodItem.foodCategory,
        productName: foodItem.productName,
        portions,
        total: portions.reduce((sum, p) => sum + (p ? p.subtotal : 0), 0),
      }
      setSelectedItems([mergedItem])
    } else {
      setSelectedItems([])
    }
  }, [quantities, foodItem])

  // ====================== Quantity Handlers ======================
  const increment = (portion: Portion) =>
    setQuantities((prev) => ({ ...prev, [portion]: prev[portion] + 1 }))

  const decrement = (portion: Portion) =>
    setQuantities((prev) => ({ ...prev, [portion]: prev[portion] > 0 ? prev[portion] - 1 : 0 }))

  const resetQuantities = () => setQuantities({ Quarter: 0, Half: 0, Full: 0 })

  // ====================== Derived States ======================
  const totalAmount = selectedItems.reduce((sum, item) => sum + item.total, 0)
  const hasSelectedQuantities = Object.values(quantities).some((qty) => qty > 0)

  return {
    foodItem,
    loadingStatus,
    status,
    quantities,
    imageLoaded,
    setImageLoaded,
    increment,
    decrement,
    resetQuantities,
    totalAmount,
    hasSelectedQuantities,
    handleAddToCart,
    userId,
    isUpdating,
  }
}
