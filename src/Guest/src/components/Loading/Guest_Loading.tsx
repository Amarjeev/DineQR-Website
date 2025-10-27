import React from 'react'

const Guest_Loading: React.FC = () => {
  return (
    <div className="flex flex-col space-y-4 justify-center items-center  h-screen dark:invert">
      <div className="flex space-x-2">
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-8 w-8 bg-black rounded-full animate-bounce"></div>
      </div>
      <p className="text-sm font-medium text-gray-600">Please wait, loading...</p>
    </div>
  )
}

export default Guest_Loading
