export type Status = 'null' | 'loading' | 'error'

function ServerError_UI() {
  const handleRefresh = () => {
    window.location.reload() // Refresh the page
  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center animate-fadeIn">
        <img
          src="https://yemca-services.net/404.png"
          alt="Error Illustration"
          className="mx-auto w-80 shadow-xl rounded-lg animate-[float_3s_infinite]"
        />
        <h1 className="text-5xl font-extrabold text-red-600 mt-6">
          Something Went Wrong!
        </h1>
        <p className="text-xl text-gray-700 mt-2">
          Server error occurred. Please try again.
        </p>
        <button
          onClick={handleRefresh}
          className="mt-6 bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transform transition hover:scale-105 hover:bg-red-700"
        >
          Refresh Page
        </button>
      </div>

      {/* Inline animation styles */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

export default ServerError_UI
