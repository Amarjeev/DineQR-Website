import { useState } from "react";
import axios from "axios";
import { showError } from "../../../utils/toast";
import { BaseUrl } from "../../../../../BaseUrl/BaseUrl";

// 🧩 Optional Type for Order
interface OrderDate {
  orderId: string;
  createdAt: string;
}

export const use_get_date = () => {
  const [dates, setDates] = useState<OrderDate[]>([]);

  // 🔹 Fetch orders by date
  const handle_Get_dates_ApiCall = async () => {
    try {

      // 🔸 Example: /api/v1/guest/get/orders-date
      const response = await axios.get(
        `${BaseUrl}get/orders-date`,
        { withCredentials: true }
      );
      if (response.data?.success) {
          setDates(response.data.data || []);
      } 
    } catch (err: any) {
      console.error("❌ Error fetching order dates:", err);
      showError('Error fetching order dates');
    }
  };

  return { handle_Get_dates_ApiCall, dates};
};
