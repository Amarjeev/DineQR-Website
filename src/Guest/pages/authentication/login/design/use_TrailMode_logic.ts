import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BaseUrl } from '../../../../../BaseUrl/BaseUrl'
import { showError } from '../../../../utils/toast'

export const use_TrailMode_logic = () => {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // 🔹 Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    if (!/^[0-9]{10}$/.test(phone)) {
      setError('Please enter a valid 10-digit mobile number.')
      return
    }

    const hotelKey = sessionStorage.getItem('hotelKey')
    if (!hotelKey) {
      showError('Hotel Key not found. Please access via proper link.')
      return
    }

    try {
      setLoading(true)
      await axios.post(
        `${BaseUrl}auth/login/verify/trail-mode`,
        {
          mobileNumber: `+91${phone}`,
          hotelKey,
        },
        { withCredentials: true }
      )
      navigate('/guest-dashboard', { replace: true })
    } catch (err) {
      showError('Server error, please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return {
    phone,
    setPhone,
    loading,
    error,
    setError,
    handleSubmit,
    navigate,
  }
}
