import React, { useEffect, useState } from 'react'
import Loading from '../../../../../components/Loading/Mgr_Loading'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Blurhash } from 'react-blurhash'
import { use_Get_Menu_Items } from '../logic/use_Get_Menu_Items'
import ServerError_UI from '../../../../../../ServerErrorUI/ServerError_UI'

const Mgr_Edit_Food_List_UI: React.FC = () => {
  const navigate = useNavigate()

  const { dishCategory } = useParams<{ dishCategory: string }>()
  //Delete this beacuse before page stored this data refresh time page navigate another page
  sessionStorage.removeItem('activeMenuItem')

  const {
    handleFetchData,
    menuList,
    totalCount,
    status,
    handleViewMore,
    page,
    loadMoreItems,
  } = use_Get_Menu_Items()

  const [isLoaded, setIsLoaded] = useState(true) // Track image load

  useEffect(() => {
    if (!dishCategory) {
      navigate('/Manager-Dashboard/dishes-list')
      return
    }
    handleFetchData(dishCategory)
  }, [page])

  if (status === 'loading') {
    return <Loading />
  } else if (status === 'error') {
    return <ServerError_UI />
  }

  return (
    <div className="p-6">
      {/* Category Heading */}
      <div className="mb-16">
        <h2 className="text-xl font-semibold text-indigo-600 border-b-2 border-black pb-2 mb-6">
          {dishCategory}
        </h2>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {menuList?.map((item) => {
            // Truncate long names
            const displayName =
              item?.productName.length > 50
                ? item?.productName.slice(0, 47) + '...'
                : item?.productName

            return (
              <div
                key={item?._id}
                className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl"
                style={{ width: '150px' }}
              >
                {/* BlurHash placeholder */}
                {!isLoaded && item?.blurHash && (
                  <Blurhash
                    hash={item.blurHash}
                    width={150}
                    height={144}
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                  />
                )}

                {/* Actual Image */}
                <img
                  src={item?.s3Url}
                  alt={item?.productName}
                  className={`w-full h-36 object-cover transition-opacity duration-500 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setIsLoaded(true)}
                />

                {/* Item Info */}
                <div className="p-3 w-full flex flex-col items-center">
                  <h3 className="text-sm font-semibold text-gray-800 text-center mb-2">
                    {displayName}
                  </h3>
                  <Link
                    to={`/Manager-Dashboard/EditMenu/${item?._id}/${page}`}
                    className="flex items-center gap-1 text-xs bg-black text-white px-3 py-1 rounded hover:bg-gray-800 transition"
                  >
                    ✏️ Edit
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* View More Button with Divider */}
        {totalCount > 12 && totalCount > loadMoreItems && (
          <div className="mt-8 flex items-center">
            <div className="flex-1 h-px bg-gray-300"></div>
            <button
              onClick={handleViewMore}
              type="button"
              className="mx-4 flex items-center rounded-full border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 shadow-sm transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="mr-2 h-4 w-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
              View More
            </button>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Mgr_Edit_Food_List_UI
