import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { use_Mgr_Edit_Table_logic } from './use_Mgr_Edit_Table_logic'
import Loading from '../../../../components/Loading/Mgr_Loading'
import ServerError_UI from '../../../../../ServerErrorUI/ServerError_UI'

const Mgr_Edit_Table_UI: React.FC = () => {
  const {
    loading,
    fetchError,
    totalTables,
    filteredTables,
    searchTerm,
    setSearchTerm,
    handleLoadMore,
    handleEdit,
    handleCancel,
    isDeleting,
    isEditUploading,
    handleDelete,
    handleSave,
    editError,
    EditedtableName,
    setEditedTableName,
    editIndex,
    isButtonDisabled,
    PageNumber,
    editStatus,
    handleRefreshTable,
    isRefreshingTable,
  } = use_Mgr_Edit_Table_logic()

  if (editStatus === 'error' || fetchError) return <ServerError_UI />
  if (loading) return <Loading />

  return (
    <div className="p-6 min-h-screen from-gray-100 to-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold text-gray-800 drop-shadow-md">
          Table List
        </h2>

        {/* 🔄 Page Refresh Button */}
        <button
          disabled={isRefreshingTable}
          onClick={() => handleRefreshTable(PageNumber)}
          className={`px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-lg shadow-sm flex items-center gap-2 transition 
    ${isRefreshingTable ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-300'}`}
        >
          <span
            className={`inline-block ${isRefreshingTable ? 'animate-spin' : ''}`}
          >
            🔄
          </span>
          {isRefreshingTable ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      <p className="mb-4 text-sm text-gray-600">
        Total Tables:{' '}
        <span className="font-semibold text-gray-900">{totalTables}</span>
      </p>

      {/* Search Bar */}
      <div className="mb-6 flex w-full max-w-md mx-auto shadow-sm rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Search tables..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-3 text-sm border-none focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-gray-800 transition"
        />
        <button className="px-4 py-3 bg-blue-500 text-white text-sm font-medium rounded-r-lg hover:bg-blue-600 shadow-md transition transform">
          Search
        </button>
      </div>

      {/* Table List */}
      <div className="max-h-[500px] overflow-y-auto border rounded-xl bg-white shadow-lg">
        <table className="text-sm border-collapse w-full">
          <thead className="bg-blue-50 sticky top-0 shadow-sm">
            <tr>
              <th className="px-4 py-3 text-left w-full text-gray-700 font-medium">
                Table Name
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredTables && filteredTables.length > 0 ? (
                filteredTables.map((table) => (
                  <motion.tr
                    key={table._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="border-b hover:bg-blue-50 transition-colors"
                  >
                    <td className="px-4 py-3 flex flex-col gap-1 w-full">
                      {editIndex === table._id ? (
                        <>
                          <div className="flex items-center gap-3 w-full">
                            <div className="relative w-full">
                              <input
                                type="text"
                                value={EditedtableName}
                                onChange={(e) =>
                                  setEditedTableName(e.target.value)
                                }
                                disabled={isEditUploading || isDeleting}
                                className={`px-3 py-2 border rounded-lg text-sm w-full shadow-inner focus:outline-none focus:ring-2 focus:ring-green-400 transition-all duration-200 ${
                                  isEditUploading || isDeleting
                                    ? 'animate-pulse bg-gray-100 cursor-not-allowed'
                                    : ''
                                }`}
                              />
                            </div>

                            <button
                              onClick={() => handleSave('Edit', PageNumber)}
                              disabled={
                                isEditUploading ||
                                isDeleting ||
                                isButtonDisabled
                              }
                              className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg shadow-md hover:bg-green-600"
                            >
                              {isEditUploading ? 'Saving...' : 'Save'}
                            </button>

                            <button
                              onClick={handleCancel}
                              disabled={isEditUploading || isDeleting}
                              className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 shadow-md transition"
                            >
                              Cancel
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(table._id, PageNumber)
                              }
                              disabled={isEditUploading || isDeleting}
                              className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg shadow-md hover:bg-red-600"
                            >
                              {isDeleting ? 'Deleting...' : '🗑️'}
                            </button>
                          </div>
                          {editError && (
                            <span className="text-xs text-red-500 mt-1">
                              {editError}
                            </span>
                          )}
                        </>
                      ) : (
                        <div className="flex items-center justify-between w-full">
                          <span className="font-medium text-gray-800">
                            {table.name}
                          </span>
                          <button
                            onClick={() => handleEdit(table._id, table.name)}
                            className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 shadow-md transition"
                          >
                            Edit
                          </button>
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-6 text-center text-gray-500">
                    No tables found.
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>

        {totalTables > filteredTables.length &&
          !searchTerm &&
          totalTables !== 0 &&
          filteredTables.length > 0 && (
            <div className="mt-2 mb-2 text-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white text-sm font-semibold rounded-xl shadow-lg hover:scale-105 transition"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
      </div>
    </div>
  )
}

export default Mgr_Edit_Table_UI
