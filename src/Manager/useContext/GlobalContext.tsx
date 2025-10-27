import React, { createContext, useState } from 'react'
import type { ReactNode } from 'react'

// 1️⃣ Define the type for context
interface GlobalContextType {
  formType: string
  setFormType: (type: string) => void
}

// 2️⃣ Define props type for Provider
interface GlobalProviderProps {
  children: ReactNode
}

// 3️⃣ Create the context
export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
)

// 4️⃣ Create the provider component
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [formType, setFormType] = useState<string>('login')

  return (
    <GlobalContext.Provider value={{ formType, setFormType }}>
      {children}
    </GlobalContext.Provider>
  )
}
