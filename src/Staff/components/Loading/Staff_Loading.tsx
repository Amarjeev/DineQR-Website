import React from 'react'

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  text?: string
  fullScreen?: boolean
}

/**
 * Simple Loading UI Component
 * Clean and minimal loading indicator
 */
const Staff_Loading: React.FC<LoadingProps> = ({
  size = 'md',
  text = "Loading...",
  fullScreen = false
}) => {
  // Size configurations
  const sizeConfig = {
    sm: { spinner: 'w-6 h-6', text: 'text-sm' },
    md: { spinner: 'w-8 h-8', text: 'text-base' },
    lg: { spinner: 'w-12 h-12', text: 'text-lg' }
  }

  const { spinner, text: textSize } = sizeConfig[size]

  return (
    <div className={`flex flex-col items-center justify-center ${fullScreen ? 'min-h-screen' : 'py-8'}`}>
      {/* Spinner */}
      <div className={`${spinner} border-3 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-3`}></div>
      
      {/* Text */}
      {text && <p className={`${textSize} text-gray-600`}>{text}</p>}
    </div>
  )
}

export default Staff_Loading