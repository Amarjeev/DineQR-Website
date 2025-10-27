import { useState } from 'react'
import axios from 'axios'
import { type Status } from '../../../../../../../ServerErrorUI/ServerError_UI'
import { BaseUrl } from '../../../../../../../BaseUrl/BaseUrl'

interface StaffAccount {
  staffId: string
  name: string
}

export const use_Get_Staff_Acc = () => {

  const [staffAccounts, setStaffAccounts] = useState<StaffAccount[]>([])

  const [status, setStatus] = useState<Status>('null')

  const handleFetchStaffaccount = async () => {
    try {
      setStatus('loading')
      const response = await axios.get(`${BaseUrl}manager/get/staff/accounts`, {
        withCredentials: true,
      })

      if (response.data.success) {
        setStatus('null')
        setStaffAccounts(response.data.data) // ✅ save accounts
        return
      }
    } catch (error: any) {
      setStatus('null')
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          setStaffAccounts([])
          return
        } else {
          setStatus('error')
          return
        }
      }
    }
  }

  return {
    staffAccounts,
    handleFetchStaffaccount,
    status,
  }
}
