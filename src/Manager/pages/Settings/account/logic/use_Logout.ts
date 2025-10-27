import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { type Status } from '../../../../../ServerErrorUI/ServerError_UI'
import { useState } from 'react'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'


export const use_Logout = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState<Status>('null')

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?')
    if (!confirmLogout) return

    try {
      setStatus('loading')
      await axios.post(
        `${BaseUrl}manager/logout`,
        {},
        { withCredentials: true }
      )
      setStatus('null')

      sessionStorage.setItem('isPasswordCorrect', false.toString())

      // Navigate to home or login page
      navigate('/', { replace: true })
    } catch (error: any) {
      console.error('Logout failed:', error)

      if (axios.isAxiosError(error)) {
        setStatus('null')
        setStatus('error')
      }
    }
  }

  return { handleLogout, status }
}
