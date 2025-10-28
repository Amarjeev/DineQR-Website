import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { BaseUrl } from '../../../BaseUrl/BaseUrl'

export const use_token_Validation = () => {
  const navigate = useNavigate()

  // Function to validate staff token
  const handle_Token_Validation = async (status: string) => {
    try {
      // Make request to backend validation route with HttpOnly cookies
      const response = await axios.get(`${BaseUrl}guest/check-token/validate`, {
        withCredentials: true, // important to send cookies
      })
      // If token is invalid, redirect to staff dashboard/login

      if (status === 'login' && response?.data?.success) {
        navigate("/guest-dashboard", { replace: true })
      }
    } catch (error) {
      navigate('/login', { replace: true })
    }
  }

  return { handle_Token_Validation }
}
