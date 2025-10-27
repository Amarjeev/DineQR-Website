import axios from "axios";
import { showError, showSuccess } from "../../../utils/toast";
import { useState } from "react";
import { BaseUrl } from "../../../../../BaseUrl/BaseUrl";

export const use_Mark_Paid = () => {
    const [markPaidLoading, setMarkPaidLoading] = useState(false);

    const handle_Mark_Paid_ApiCall = async (orderId: string) => {
      setMarkPaidLoading(true)
    try {
       await axios.post(
        `${BaseUrl}manager/orders/mark-paid/${orderId}`,
        {},
        { withCredentials: true } // if you need cookies/auth
      );

      // Optionally, return response data
      showSuccess('Mark Paid Successfully')
    } catch (error: any) {
      console.error("Error marking order as paid:", error);
      showError('Something went wrong Please try again')
    } finally {
        setMarkPaidLoading(false)
    }
  };

  return { handle_Mark_Paid_ApiCall ,markPaidLoading};
};
