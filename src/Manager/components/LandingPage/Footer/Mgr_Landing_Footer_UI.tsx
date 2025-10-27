const Mgr_Landing_Footer_UI: React.FC = () => {
  return (
    <footer id="about" className="bg-gray-100 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-8 items-start">
        {/* About Section */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">About DineQR</h3>
          <p className="text-gray-600 text-sm">
            DineQR simplifies restaurant management with easy order tracking,
            staff management, and real-time updates for smooth operations.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <button className="hover:text-green-500 transition">
                Login
              </button>
            </li>
            <li>
              <button className="hover:text-green-500 transition">
                Create Account
              </button>
            </li>
            <li>
              <button  className="hover:text-green-500 transition">
                Support
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>📞 +91 98765 43210</li>
            <li>✉️ support@dineqr.com</li>
            <li>🏢 123 Food Street, City, India</li>
          </ul>
          <div className="flex space-x-4 mt-4">
            <button
              className="text-gray-500 hover:text-green-500 transition"
            >
              🐦
            </button>
            <button
              className="text-gray-500 hover:text-green-500 transition"
            >
              📘
            </button>
            <button className="text-gray-500 hover:text-green-500 transition">
              📸
            </button>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm py-4 border-t border-gray-200">
        &copy; {new Date().getFullYear()} DineQR. All rights reserved.
      </div>
    </footer>
  )
}

export default Mgr_Landing_Footer_UI
