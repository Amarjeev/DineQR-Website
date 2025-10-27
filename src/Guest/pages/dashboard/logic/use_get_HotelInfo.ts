import { useState} from "react"
import axios from "axios"
import { showError } from "../../../utils/toast"
import { BaseUrl } from "../../../../BaseUrl/BaseUrl"

// ---------------------- Type for hotel info ----------------------
export interface HotelInfoType {
  name: string
  address: string
  contactNumber: string
  email: string
  website: string
  openingTime: string
  closingTime: string
  description: string
}

// ---------------------- Custom Hook ----------------------
export const use_Get_HotelInfo = () => {
  const [hotelInfo, setHotelInfo] = useState<HotelInfoType | null>(() => {
    // Try to load from sessionStorage first
    const saved = sessionStorage.getItem("hotelInfo")
    return saved ? JSON.parse(saved) : null
  })

  const handle_fetch_HotelInfo_ApiCall = async (hotelKey: string) => {
    if (!hotelKey) {
      showError("Something went wrong")
      return
    }

    // Check sessionStorage again before calling API
    const saved = sessionStorage.getItem("hotelInfo")
    if (saved) {
      setHotelInfo(JSON.parse(saved))
      return
    }

    try {
      const response = await axios.get(`${BaseUrl}guest/get/Hotelinfo`,{withCredentials:true})
      setHotelInfo(response.data.data)
      console.log('hotel iformation :',response.data.data)
      sessionStorage.setItem("hotelInfo", JSON.stringify(response.data.data))
    } catch (error: any) {
      console.error("Error fetching hotel info:", error)
      showError("Something went wrong")
    }
  }

  return { hotelInfo, handle_fetch_HotelInfo_ApiCall }
}
