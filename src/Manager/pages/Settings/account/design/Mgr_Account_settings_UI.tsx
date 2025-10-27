import React, { useEffect, useState } from 'react'
import { LogOut, Trash2, AlertTriangle } from 'lucide-react'
import Delete_Confir_Form_UI from '../Delete-Confirm-Form-UI/Mgr_Delete_Confir_Form_UI'
import Loading from '../../../../components/Loading/Mgr_Loading'
import { use_Logout } from '../logic/use_Logout'
import ServerError_UI from '../../../../../ServerErrorUI/ServerError_UI'

const Mgr_Account_settings_UI: React.FC = () => {
  const { handleLogout, status } = use_Logout()

  // Initialize from sessionStorage
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(() => {
    const stored = sessionStorage.getItem('showDeleteConfirm')
    return stored === 'true'
  })

  // Sync state to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('showDeleteConfirm', showDeleteConfirm.toString())
  }, [showDeleteConfirm])

  const handleDeleteAccount = () => {
    const confirmLogout = window.confirm(
      '⚠️ Are you sure you want to delete your account? This action is irreversible!'
    )
    if (!confirmLogout) return
    setShowDeleteConfirm(true)
  }

  if (status === 'loading') {
    return <Loading />
  } else if (status === 'error') {
    return <ServerError_UI />
  }

  return (
    <div className="max-w-lg mx-auto mt-10 space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-bold text-gray-800 text-center">
        Account Settings
      </h2>

      {/* Logout */}
      {!showDeleteConfirm && (
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg font-medium shadow-md hover:bg-blue-700 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      )}

      {/* Delete Account */}
      {!showDeleteConfirm && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="text-red-600" size={20} />
            <p className="text-sm text-red-700 font-semibold">
              Deleting your account is permanent
            </p>
          </div>
          <p className="text-xs text-gray-600 mb-3">
            Once deleted, all your data will be permanently removed and cannot
            be recovered. Please proceed only if you are certain.
          </p>

          <button
            onClick={handleDeleteAccount}
            className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-lg font-medium shadow-md hover:bg-red-700 transition"
          >
            <Trash2 size={18} /> Delete Account
          </button>
        </div>
      )}
      {showDeleteConfirm && (
        <Delete_Confir_Form_UI onCancel={() => setShowDeleteConfirm(false)} />
      )}
    </div>
  )
}

export default Mgr_Account_settings_UI
