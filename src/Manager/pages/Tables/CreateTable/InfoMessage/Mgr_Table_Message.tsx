import React from 'react'

const Mgr_Table_Message: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-12">
      <div className="max-w-5xl mx-auto my-4">
        <div
          className="rounded-md bg-blue-50 border-l-4 border-blue-500 text-blue-900 px-4 py-2 shadow-sm"
          role="alert"
        >
          <div className="flex items-start sm:items-center">
            <svg
              className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
            <div className="ml-3">
              <h3 className="font-semibold text-sm sm:text-base">
                Table Identity Information
              </h3>
              <p className="mt-1 text-xs sm:text-sm leading-snug">
                Each table has a <span className="font-medium">unique ID </span>
                to make it easy for customers to track their orders. This helps
                ensure <span className="font-medium">efficient delivery </span>
                and smooth service. Make sure each table has a
                <span className="font-medium"> unique name</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mgr_Table_Message
