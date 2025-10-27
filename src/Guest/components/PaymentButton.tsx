import axios from "axios";
import { showError } from "../utils/toast";
import { BaseUrl } from "../../BaseUrl/BaseUrl";

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Function you can call from any component
export  const handlePayment = async (orderId: string) => {
  try {
    // Call backend to create Razorpay order
    const response = await axios.post(
      `${BaseUrl}guest/razopay/create-order/${orderId}`,
      {},
      { withCredentials: true }
    );

    // Load Razorpay script dynamically
    await new Promise<void>((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      document.body.appendChild(script);
    });

    const { data, amount, keyId } = response.data;

    // Razorpay options
    const options = {
      key: keyId,
      amount: amount,
      currency: "INR",
      name: "DineQR",
      description: "Order Payment",
      order_id: data.id,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error("Payment error:", error);
    showError("Payment failed. Please try again.");
  }
};
