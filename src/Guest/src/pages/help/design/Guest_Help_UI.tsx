import React from "react";
import {
  QrCode,
  Smartphone,
  List,
  ShoppingCart,
  Coffee,
  MapPin,
  Bell,
  Clock,
  CreditCard,
  ArchiveRestore,
  CheckCircle,
} from "lucide-react";

const Guest_Help_UI: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-800">
      {/* Container */}
      <div className="max-w-3xl mx-auto px-5 py-8">

        {/* Hero */}
        <header className="bg-white rounded-2xl shadow-md p-5 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-orange-100 to-orange-300 flex items-center justify-center">
              <QrCode className="w-8 h-8 text-orange-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900">How DineQR Works</h1>
              <p className="text-sm text-gray-600 mt-1">
                Self-ordering made simple — scan the QR, place your order, pay online or at the counter,
                and track it live. No waiter needed.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-4 flex gap-3">
            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium">
              Scan QR to Start
            </button>
            <button className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm">
              View Menu
            </button>
          </div>
        </header>

        {/* Quick Steps */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Quick steps — ready in 60 seconds</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col items-center text-center">
              <Smartphone className="w-6 h-6 text-blue-500 mb-2" />
              <div className="text-xs font-semibold">Scan QR</div>
              <div className="text-xs text-gray-500 mt-1">Open the DineQR link on your phone</div>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col items-center text-center">
              <List className="w-6 h-6 text-purple-500 mb-2" />
              <div className="text-xs font-semibold">Browse Menu</div>
              <div className="text-xs text-gray-500 mt-1">Explore categories & items</div>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col items-center text-center">
              <ShoppingCart className="w-6 h-6 text-green-500 mb-2" />
              <div className="text-xs font-semibold">Add to Cart</div>
              <div className="text-xs text-gray-500 mt-1">Select portions & quantity</div>
            </div>

            <div className="bg-white p-3 rounded-xl shadow-sm flex flex-col items-center text-center">
              <CheckCircle className="w-6 h-6 text-indigo-500 mb-2" />
              <div className="text-xs font-semibold">Confirm & Pay</div>
              <div className="text-xs text-gray-500 mt-1">Online or pay at counter</div>
            </div>
          </div>
        </section>

        {/* Features / Explanation */}
        <section className="bg-white p-4 rounded-2xl shadow-sm mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">What you can do</h3>

          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex items-start gap-3">
              <Coffee className="w-5 h-5 text-orange-500 mt-0.5" />
              <div>
                <div className="font-medium">Order without a waiter</div>
                <div className="text-xs text-gray-500">Choose dishes and place orders directly from your phone.</div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-pink-500 mt-0.5" />
              <div>
                <div className="font-medium">Select order type</div>
                <div className="text-xs text-gray-500">
                  Dining — choose your table number (we’ll serve at the table) or Parcel — pickup ready.
                </div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <Bell className="w-5 h-5 text-yellow-500 mt-0.5" />
              <div>
                <div className="font-medium">Live order tracking & notifications</div>
                <div className="text-xs text-gray-500">Receive real-time updates (accepted, cooking, ready, delivered).</div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-blue-500 mt-0.5" />
              <div>
                <div className="font-medium">Pay online or at counter</div>
                <div className="text-xs text-gray-500">Secure payment options — card, UPI or cash at counter.</div>
              </div>
            </li>

            <li className="flex items-start gap-3">
              <ArchiveRestore className="w-5 h-5 text-emerald-500 mt-0.5" />
              <div>
                <div className="font-medium">View past orders</div>
                <div className="text-xs text-gray-500">Check previous orders, re-order or review your bills.</div>
              </div>
            </li>
          </ul>
        </section>

        {/* Detailed Flow / Illustration */}
        <section className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">How ordering works (detailed)</h3>

          <div className="space-y-4 text-sm text-gray-700">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                <Smartphone className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <div className="font-medium">1. Scan QR & enter mobile number</div>
                  <div className="text-xs text-gray-500 mt-1">When you sit at a table, scan the QR code on the table to open DineQR. Enter your mobile number — we’ll use it to send OTP and order updates.</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                <List className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <div className="font-medium">2. Browse the menu & add items</div>
                  <div className="text-xs text-gray-500 mt-1">Explore categories, select portions and quantities. Items go to your cart instantly.</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                <ShoppingCart className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <div className="font-medium">3. Confirm order</div>
                  <div className="text-xs text-gray-500 mt-1">Choose order type (Dining or Parcel). If Dining, pick your table number so staff can serve directly.</div>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-indigo-500 mt-1" />
                <div>
                  <div className="font-medium">4. Track progress</div>
                  <div className="text-xs text-gray-500 mt-1">Get notifications for order acceptance, cooking status and when it’s ready — live updates on the app.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ-style small section */}
        <section className="bg-white p-4 rounded-xl shadow-sm mb-6">
          <h4 className="font-semibold mb-3">Common questions</h4>

          <div className="space-y-3 text-sm text-gray-700">
            <div>
              <div className="font-medium">Do I need to create an account?</div>
              <div className="text-xs text-gray-500">No — just enter your mobile number and OTP to place orders.</div>
            </div>

            <div>
              <div className="font-medium">Can I change items after ordering?</div>
              <div className="text-xs text-gray-500">Small changes can be requested to staff. Large changes may require cancelling and re-ordering.</div>
            </div>

            <div>
              <div className="font-medium">Are payments secure?</div>
              <div className="text-xs text-gray-500">Yes — we use secure payment gateways and do not store card details.</div>
            </div>
          </div>
        </section>

        {/* Bottom CTA / Enjoy message */}
        <footer className="text-center py-6">
          <p className="text-sm text-gray-600 mb-3">
            DineQR — fast ordering, contactless service, and a better dining experience.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Guest_Help_UI;
