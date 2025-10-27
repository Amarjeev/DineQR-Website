import React from 'react'
import { Star, MessageSquare, Clock, Sparkles, Users, ChefHat } from 'lucide-react'

const Mgr_reviews_UI: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br p-4 sm:p-6 lg:p-8">
      <div className="relative w-full max-w-2xl">
        {/* Animated background elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-200 rounded-full blur-xl opacity-30 animate-float"></div>
        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-yellow-200 rounded-full blur-xl opacity-30 animate-float delay-1000"></div>
        <div className="absolute top-1/2 -right-8 w-16 h-16 bg-purple-200 rounded-full blur-xl opacity-20 animate-float delay-500"></div>

        <div className="relative bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-6 sm:p-8 lg:p-12 text-center border border-white/60 overflow-hidden">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-500/5 to-transparent rounded-tl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-yellow-500/5 to-transparent rounded-br-3xl"></div>

          {/* Floating icons with better animation */}
          <div className="absolute -top-8 -left-8 text-blue-100 text-8xl animate-soft-pulse select-none">
            <Star className="filter drop-shadow-sm" />
          </div>
          <div className="absolute -bottom-8 -right-8 text-yellow-100 text-8xl animate-soft-pulse delay-1000 select-none">
            <MessageSquare className="filter drop-shadow-sm" />
          </div>
          <div className="absolute top-1/2 -left-6 text-green-100 text-6xl animate-soft-pulse delay-500 select-none">
            <ChefHat className="filter drop-shadow-sm" />
          </div>

          {/* Header Section with improved styling */}
          <div className="relative mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4 shadow-lg">
              <Sparkles className="w-4 h-4" />
              <span>Manager Dashboard</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text">
              Customer Reviews
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              Discover authentic feedback about your culinary creations and service excellence
            </p>
          </div>

          {/* Coming Soon Card with enhanced design */}
          <div className="relative bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border border-yellow-200/60 shadow-lg rounded-2xl p-6 sm:p-8 mb-8 transform hover:scale-[1.02] transition-all duration-300">
            {/* Card background pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.03] rounded-2xl"></div>
            
            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-lg mb-4 mx-auto">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-3 flex items-center justify-center gap-2">
                <span className="animate-pulse">✨</span>
                Coming Soon!
                <span className="animate-pulse delay-300">✨</span>
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                We're crafting an exceptional review experience where you'll be able to 
                view, analyze, and respond to customer feedback with powerful filtering 
                and insights tools.
              </p>
            </div>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 shadow-sm">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-800 text-sm">Real Feedback</h4>
              <p className="text-gray-600 text-xs mt-1">Genuine customer insights</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 shadow-sm">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-800 text-sm">Rating Analysis</h4>
              <p className="text-gray-600 text-xs mt-1">Track performance trends</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 shadow-sm">
              <MessageSquare className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-800 text-sm">Quick Responses</h4>
              <p className="text-gray-600 text-xs mt-1">Engage with customers</p>
            </div>
          </div>

          {/* Footer with enhanced styling */}
          <div className="relative">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-600 text-white/90 px-6 py-3 rounded-full text-sm font-medium shadow-lg">
              <span className="animate-bounce">🚀</span>
              <span>Exciting updates incoming!</span>
              <span className="animate-pulse">⭐</span>
            </div>
            <p className="text-gray-500 text-xs mt-4">
              We're working hard to deliver the best experience
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Mgr_reviews_UI