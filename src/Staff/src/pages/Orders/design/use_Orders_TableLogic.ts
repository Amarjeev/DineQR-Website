import { useState } from 'react'
import { use_Get_Orders, type Order } from '../logic/use_Get_Orders'
import { use_Edit_Orders } from '../logic/use_Edit_Orders'
import { use_Remove_Order_Items } from '../logic/use_Remove_Order_Items'
import { use_Confirm_Order } from '../logic/use_Confirm_Order'
import { use_Reject_Order } from '../logic/use_Reject_Order'
import { showError } from '../../../utils/toast'

// ============================================================================
// 🎯 MAIN HOOK - ORDERS TABLE MANAGEMENT
// Centralized logic for orders table operations including CRUD and modal states
// ============================================================================

export const use_Orders_TableLogic = () => {
  // ==========================================================================
  // 🎯 LEVEL 1: STATE MANAGEMENT
  // ==========================================================================
  
  // 🔹 Modal & UI Control States
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'items' | 'bill'>('items')
  const [deletingItemId, setDeletingItemId] = useState<string | null>(null)
  
  // 🔹 Order Action States
  const [rejectSuccess, setRejectSuccess] = useState<boolean>(false)
  const [confirmSuccess, setconfirmSuccess] = useState<boolean>(false)
  const [confirmedOrderId, setConfirmedOrderId] = useState<string>('')
  const [showRejectModal, setShowRejectModal] = useState<boolean>(false)
  const [rejectionReason, setRejectionReason] = useState<String>('')
  
  // 🔹 Data State
  const [editedQuantities, setEditedQuantities] = useState<{
    [key: string]: { [portion: string]: number }
  }>({})

  // ==========================================================================
  // 🎯 LEVEL 1: EXTERNAL HOOKS
  // ==========================================================================
  
  // 🔹 Data Management Hooks
  const { orders, setOrders, selectedOrder, setSelectedOrder, status } = use_Get_Orders()
  const { handleUpdateEditData, isSaving } = use_Edit_Orders()
  const { handleRemoveItem, isDeleting } = use_Remove_Order_Items()
  
  // 🔹 Order Action Hooks
  const { handle_RejectOrder_ApiCall } = use_Reject_Order()
  const { handle_ConfirmOrder_ApiCall } = use_Confirm_Order()

  // ==========================================================================
  // 🎯 LEVEL 2: MODAL OPERATIONS
  // ==========================================================================

  /**
   * 📦 OPEN ORDER MODAL
   * Initializes modal with order data and sets up editable quantities
   */
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)

    // Initialize quantities for editing
    const initialQuantities: { [key: string]: { [portion: string]: number } } = {}
    order.items.forEach((item) => {
      initialQuantities[item._id] = {}
      item.portions.forEach((portion) => {
        initialQuantities[item._id][portion.portion] = portion.quantity
      })
    })
    setEditedQuantities(initialQuantities)
  }

  /**
   * ❌ CLOSE MODAL
   * Resets all modal-related states to default
   */
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedOrder(null)
    setEditingItem(null)
    setEditedQuantities({})
    setActiveTab('items')
  }

  // ==========================================================================
  // 🎯 LEVEL 2: ORDER ACTIONS (CONFIRM/REJECT)
  // ==========================================================================

  /**
   * ✅ CONFIRM ORDER
   * Processes order confirmation and updates state
   */
  const handleConfirmOrder = async (orderId: string) => {
    setConfirmedOrderId(orderId)
    setconfirmSuccess(true)
    await handle_ConfirmOrder_ApiCall(orderId)
    setconfirmSuccess(false)
    setOrders((prev) => prev.filter((order) => order.orderId !== orderId))
    handleCloseModal()
  }

  /**
   * 🚫 REJECT ORDER WITH REASON
   * Handles order rejection with specified reason
   */
  const handleRejectWithReason = async () => {
    if (!rejectionReason) {
      showError('Please select a rejection reason')
      return
    }
    setRejectSuccess(true)

    try {
      if (selectedOrder?.orderId && rejectionReason) {
        await handle_RejectOrder_ApiCall(
          String(selectedOrder?.orderId),
          String(rejectionReason)
        )
        setShowRejectModal(false)
        setRejectionReason('')
      } else {
        showError('Something went wrong. Please try again.')
      }
    } catch (error) {
      setRejectSuccess(false)
      return
    } finally {
      setRejectSuccess(false)
    }
    setOrders((prev) =>
      prev.filter((order) => order.orderId !== selectedOrder?.orderId || '')
    )
    handleCloseModal()
  }

  /**
   * ↩️ CANCEL REJECTION
   * Resets rejection modal and reason
   */
  const handleCancelRejection = () => {
    setShowRejectModal(false)
    setRejectionReason('')
  }

  // ==========================================================================
  // 🎯 LEVEL 2: ITEM MANAGEMENT (EDIT/DELETE)
  // ==========================================================================

  /**
   * ✏️ START EDITING ITEM
   * Sets the current item in edit mode
   */
  const handleEditItem = (itemId: string) => setEditingItem(itemId)

  /**
   * 💾 SAVE EDITED ITEM
   * Saves quantity changes to backend and updates local state
   */
  const handleSaveEdit = async (itemId: string) => {
    if (!selectedOrder) return

    const payload = {
      orderId: selectedOrder.orderId,
      itemId,
      updatedPortions: editedQuantities[itemId],
    }

    await handleUpdateEditData(payload)

    const updatedOrder = {
      ...selectedOrder,
      items: selectedOrder.items.map((item) =>
        item._id === itemId
          ? {
              ...item,
              portions: item.portions.map((portion) => ({
                ...portion,
                quantity:
                  editedQuantities[itemId][portion.portion] || portion.quantity,
              })),
            }
          : item
      ),
    }

    setSelectedOrder(updatedOrder)
    setOrders((prev) =>
      prev.map((o) => (o.orderId === updatedOrder.orderId ? updatedOrder : o))
    )
    setEditingItem(null)
  }

  /**
   * ↩️ CANCEL EDITING
   * Resets quantities to original values
   */
  const handleCancelEdit = () => {
    if (!editingItem || !selectedOrder) return
    const resetQuantities = { ...editedQuantities }
    const originalItem = selectedOrder.items.find(
      (item) => item._id === editingItem
    )
    if (originalItem) {
      originalItem.portions.forEach(
        (portion) =>
          (resetQuantities[editingItem][portion.portion] = portion.quantity)
      )
    }
    setEditedQuantities(resetQuantities)
    setEditingItem(null)
  }

  /**
   * 🗑️ DELETE ITEM
   * Removes item from order and updates state
   */
  const handleDeleteItem = async (itemId: string) => {
    if (!selectedOrder) return

    const orderId = selectedOrder.orderId
    setDeletingItemId(itemId)

    await handleRemoveItem(orderId, itemId)

    const updatedItems = selectedOrder.items.filter(
      (item) => item._id !== itemId
    )

    // Handle empty order case
    if (updatedItems.length === 0) {
      setOrders((prev) => prev.filter((o) => o.orderId !== orderId))
      handleCloseModal()
    } else {
      const updatedOrder = {
        ...selectedOrder,
        items: updatedItems,
      }
      setSelectedOrder(updatedOrder)
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? updatedOrder : o))
      )
    }

    // Clean up quantities state
    const newQuantities = { ...editedQuantities }
    delete newQuantities[itemId]
    setEditedQuantities(newQuantities)
    setDeletingItemId(null)
  }

  // ==========================================================================
  // 🎯 LEVEL 3: UTILITY FUNCTIONS
  // ==========================================================================

  /**
   #️⃣ UPDATE QUANTITY
   * Handles quantity changes for items during editing
   */
  const handleQuantityChange = (
    itemId: string,
    portion: string,
    newQuantity: number
  ) => {
    setEditedQuantities((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], [portion]: Math.max(0, newQuantity) },
    }))
  }

  /**
   * 🧮 CALCULATE TOTAL
   * Computes order total based on current quantities
   */
  const calculateTotal = () => {
    if (!selectedOrder) return 0
    return selectedOrder.items.reduce((total, item) => {
      const itemTotal = item.portions.reduce((sum, portion) => {
        const quantity =
          editedQuantities[item._id]?.[portion.portion] || portion.quantity
        return sum + (portion.price || 0) * quantity
      }, 0)
      return total + itemTotal
    }, 0)
  }

  // ==========================================================================
  // 🎯 LEVEL 1: EXPORT ALL STATES & HANDLERS
  // ==========================================================================

  return {
    // 🔹 Data States
    orders,
    status,
    selectedOrder,
    
    // 🔹 UI States
    isModalOpen,
    editingItem,
    editedQuantities,
    activeTab,
    deletingItemId,
    isSaving,
    isDeleting,
    
    // 🔹 Order Action States
    rejectSuccess,
    confirmSuccess,
    confirmedOrderId,
    rejectionReason,
    showRejectModal,
    
    // 🔹 Modal Handlers
    handleViewOrder,
    handleCloseModal,
    
    // 🔹 Order Action Handlers
    handleConfirmOrder,
    handleRejectWithReason,
    handleCancelRejection,
    
    // 🔹 Item Management Handlers
    handleEditItem,
    handleSaveEdit,
    handleCancelEdit,
    handleDeleteItem,
    handleQuantityChange,
    
    // 🔹 Utility Handlers
    setActiveTab,
    calculateTotal,
    setRejectionReason,
    setShowRejectModal,
  }
}