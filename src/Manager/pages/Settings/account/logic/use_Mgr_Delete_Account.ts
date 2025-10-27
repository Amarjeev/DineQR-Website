import { useState, useEffect } from 'react'
import { type Status } from '../../../../../ServerErrorUI/ServerError_UI'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'

export const use_Mgr_Delete_Account = () => {
  const navigate = useNavigate()
  // track password input
  const [password, setPassword] = useState('')

  // track error message (empty, wrong password, etc.)
  const [error, setError] = useState<string>('')

  const [otp, setOtp] = useState('')

  // track request status: "null" | "loading" | "error"
  const [status, setStatus] = useState<Status>('null')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isOTPLoading, setIsOTPLoading] = useState<boolean>(false)

  // track if password is verified (persisted in sessionStorage)
  const [isPasswordCorrect, setIsPasswordCorrect] = useState<boolean>(() => {
    const stored = sessionStorage.getItem('isPasswordCorrect')
    return stored === 'true' // convert string back to boolean
  })

  // keep sessionStorage in sync whenever state changes
  useEffect(() => {
    sessionStorage.setItem('isPasswordCorrect', isPasswordCorrect.toString())
  }, [isPasswordCorrect])

  // verify password by calling API
  const handleVerifyPassword = async (e: React.FormEvent) => {
    e.preventDefault()

    // if no password entered, show error and stop
    if (!password) {
      return setError('please enter password')
    }

    try {
      setIsLoading(true)
      await axios.post(
        `${BaseUrl}manager/request/delete/account`,
        { password }, // send password in request body
        { withCredentials: true } // include cookies/session
      )

      // success → mark password as correct
      setIsPasswordCorrect(true)
      setError('')
    } catch (error: any) {
      console.log(error)

      // check if axios error
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          // unauthorized → invalid password
          return setError('invalid password')
        } else {
          // any other error
          setStatus('error')
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!otp) {
      return setError('please enter Otp')
    }

    try {
      setIsOTPLoading(true)
      await axios.post(
        `${BaseUrl}manager/OtpVerify/delete/account`,
        { otp },
        { withCredentials: true }
      )

      navigate('/', { replace: true })
    } catch (error: any) {
      console.log(error)
      // ✅ Handle error
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return setError('invalid OTP')
        } else {
          setStatus('error')
        }
      }
    } finally {
      setIsOTPLoading(false)
    }
  }

  return {
    handleVerifyPassword,
    isPasswordCorrect,
    setIsPasswordCorrect,
    password,
    setPassword,
    error,
    status,
    isLoading,
    handleVerifyOtp,
    otp,
    setOtp,
    isOTPLoading,
  }
}
