import React, { useEffect, useState } from 'react'
import { use_Get_Staff_Acc } from '../logic/use_Get_Staff_Acc'
import Loading from '../../../../../components/Loading/Mgr_Loading'
import ServerError_UI from '../../../../../../../ServerErrorUI/ServerError_UI'
import { Link } from 'react-router-dom'

const Mgr_Manage_Staff_Acc_settings_UI: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const { handleFetchStaffaccount, staffAccounts, status } =
    use_Get_Staff_Acc()

  useEffect(() => {
    handleFetchStaffaccount()
  }, [])

  const filteredStaff = staffAccounts.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.staffId.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (status === 'loading') {
    return <Loading />
  } else if (status === 'error') {
    return <ServerError_UI />
  }

  return (
    <div className="max-w-3xl mx-auto mt-3 p-4">
      <h1 className="text-2xl font-semibold mb-4">Staff Accounts</h1>

      {/* Search bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name or Staff ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff ID
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStaff.length > 0 ? (
                filteredStaff.map((staff) => (
                  <tr key={staff.staffId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {staff.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {staff.staffId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right flex gap-2 justify-end">
                      <Link
                        to={`/settings/staff-passwordReset/${staff.staffId}/${staff.name}`}
                        className="bg-yellow-400 text-white text-xs px-2.5 py-1 rounded-md hover:bg-yellow-500 transition shadow-sm"
                      >
                        Reset Password
                      </Link>
                      <Link to={`/settings/staff-deleteAccount/${staff.staffId}/${staff.name}`} className="bg-red-500 text-white text-xs px-2.5 py-1 rounded-md hover:bg-red-600 transition shadow-sm">
                        Delete
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No staff accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Mgr_Manage_Staff_Acc_settings_UI
