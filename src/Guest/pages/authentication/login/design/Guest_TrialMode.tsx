import {
  FlaskConical,
  Smartphone,
  Info,
  ArrowLeft,
  AlertTriangle,
  Loader2,
} from 'lucide-react'
import { use_TrailMode_logic } from './use_TrailMode_logic'

function Guest_TrialMode() {
  const { phone, setPhone, loading, error, handleSubmit, navigate } =
    use_TrailMode_logic()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br bg-black px-4 text-white">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        {/* 🔙 Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-cyan-100 hover:text-white mb-4 transition-all"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back
        </button>

        {/* 🧪 Icon */}
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-white/20 rounded-full shadow-md">
            <FlaskConical size={30} className="text-white" />
          </div>
        </div>

        {/* 🧾 Title & Info */}
        <h1 className="text-2xl font-bold mb-2">Trial Mode — Testing Only</h1>
        <p className="text-cyan-100 mb-6 text-sm leading-relaxed">
          This page is designed for testing. You can enter any valid mobile
          number — no real OTP messages will be sent.
        </p>

        {/* 📱 Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2 border border-white/30 rounded-lg px-3 py-2 bg-white/10 focus-within:ring-2 focus-within:ring-white">
            <Smartphone className="text-white/80" size={20} />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter mobile number"
              className="w-full bg-transparent outline-none text-white placeholder:text-white/60"
              required
            />
          </div>

          {/* ⚠️ Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-red-300 bg-red-500/10 border border-red-400/30 rounded-md px-3 py-2 text-sm animate-pulse">
              <AlertTriangle size={16} className="text-red-400" />
              <span>{error}</span>
            </div>
          )}

          {/* 🔄 Submit Button */}
          <button
            disabled={loading}
            type="submit"
            className={`w-full py-2.5 flex justify-center items-center gap-2 rounded-lg font-semibold shadow-md transition-all duration-300 ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400'
            }`}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Processing...
              </>
            ) : (
              'Submit for Testing'
            )}
          </button>
        </form>

        {/* ℹ️ Info Footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-cyan-200">
          <Info size={14} />
          <p>No real SMS will be sent in this mode.</p>
        </div>
      </div>

      {/* 🏷️ Footer Tag */}
      <div className="mt-6 text-xs text-cyan-100/80">
        © {new Date().getFullYear()} DineQR — Trial Environment
      </div>
    </div>
  )
}

export default Guest_TrialMode
