import React from 'react'
import { Sparkles, Brain, Rocket, Stars, Zap, Target } from 'lucide-react'

interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>
  text: string
  color: string
}

const Mgr_ProfitAlertUI: React.FC = () => {
  const features: FeatureItem[] = [
    { icon: Target, text: "Smart Analysis", color: "text-blue-400" },
    { icon: Sparkles, text: "AI Powered", color: "text-purple-400" },
    { icon: Rocket, text: "Growth Insights", color: "text-pink-400" }
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl">
        {/* Animated Icon Container */}
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute w-40 h-40 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl animate-spin-slow" />
          <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl">
            <Brain className="w-16 h-16 text-purple-300 animate-float-slow" />
            <div className="absolute -top-2 -right-2">
              <Zap className="w-6 h-6 text-yellow-400 animate-ping" />
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            AI-Powered Business Intelligence
            <span className="block text-lg md:text-xl font-normal text-purple-300 mt-2">
              See Your Business Grow Smarter, Not Harder
            </span>
          </h1>
        </div>

        {/* Description */}
        <p className="text-lg text-gray-200 leading-relaxed mb-8 max-w-xl backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
          <strong className="text-white">Transform your business decisions</strong> with our intelligent analytics platform. 
          Our AI technology works 24/7 to analyze your data and uncover valuable insights that drive growth.
          <br /><br />
          <span className="text-yellow-300 font-semibold">✓ Spot profitable opportunities</span> you might have missed
          <br />
          <span className="text-green-300 font-semibold">✓ Understand customer behavior</span> and market trends
          <br />
          <span className="text-blue-300 font-semibold">✓ Make data-driven decisions</span> with confidence
          <br /><br />
          No technical expertise needed — we make complex data simple and actionable for everyone.
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full max-w-lg">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <IconComponent className={`w-6 h-6 ${feature.color} animate-pulse`} />
                <span className="text-sm font-medium text-gray-200">{feature.text}</span>
                <span className="text-xs text-gray-400 text-center mt-1">
                  {index === 0 && "Deep analysis of your business data"}
                  {index === 1 && "Advanced artificial intelligence"}
                  {index === 2 && "Actionable growth recommendations"}
                </span>
              </div>
            )
          })}
        </div>

        {/* Benefits Section */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 mb-8 max-w-xl">
          <h3 className="text-xl font-bold text-white mb-4">What You'll Get</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
              <span>Real-time profit alerts and insights</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
              <span>Easy-to-understand visual reports</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
              <span>Competitive advantage intelligence</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
              <span>Time-saving automated analysis</span>
            </div>
          </div>
        </div>

        {/* Coming Soon Badge */}
        <div className="flex items-center gap-3 bg-gradient-to-r from-purple-600/30 to-pink-600/30 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20 shadow-lg hover:scale-105 transition-transform duration-300 group">
          <Sparkles className="w-5 h-5 text-yellow-300 animate-spin-slow group-hover:animate-bounce" />
          <span className="text-sm font-semibold text-gray-100 tracking-wider">
            Launching Soon • Get Ready to Transform Your Business
          </span>
          <Stars className="w-5 h-5 text-yellow-300 animate-spin-slow group-hover:animate-bounce" />
        </div>

        {/* Call to Action */}
        <p className="text-gray-300 text-sm mt-4 max-w-md">
          Join thousands of business owners who are already preparing to unlock their full profit potential with AI-driven insights.
        </p>

        {/* Animated Rocket */}
        <div className="mt-12 animate-bounce-slow hover:animate-float cursor-pointer transition-transform duration-300 hover:scale-110">
          <div className="relative">
            <Rocket className="w-12 h-12 text-purple-400 filter drop-shadow-lg" />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-500 rounded-full blur-sm animate-pulse" />
          </div>
          <p className="text-xs text-gray-400 mt-2">Ready for takeoff!</p>
        </div>
      </div>
    </div>
  )
}

export default Mgr_ProfitAlertUI