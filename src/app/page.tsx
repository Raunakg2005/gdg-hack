'use client'

import Link from 'next/link'
import { Search, Package, Sparkles, Upload, Zap, Shield, Clock, CheckCircle, ArrowRight, Star, Users, TrendingUp, Eye, Target, Cpu, ChevronDown, Layers, Award, Rocket } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black relative overflow-hidden">
      {/* Premium animated background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[900px] h-[900px] bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-[900px] h-[900px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        
        {/* Radial gradient overlays */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(16,185,129,0.08),transparent_50%)]"></div>
        
        {/* Animated grid with glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_110%)] opacity-30"></div>
        
        {/* Enhanced floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-blue-400 rounded-full animate-ping animation-delay-2000 opacity-75"></div>
        <div className="absolute bottom-40 left-40 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping animation-delay-4000 opacity-75"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-300 rounded-full animate-pulse animation-delay-2000"></div>
        <div className="absolute top-2/3 right-1/3 w-1.5 h-1.5 bg-emerald-300 rounded-full animate-pulse animation-delay-4000"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-teal-300 rounded-full animate-ping opacity-60"></div>
      </div>

      {/* Premium Navbar with sticky glassmorphism */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-2xl transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse-slow"></div>
                <div className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600 p-2.5 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                  <Package className="h-7 w-7 text-white" />
                </div>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                Lost&Found
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-10">
              <a href="#features" className="text-gray-400 hover:text-cyan-400 transition-all duration-300 font-medium text-sm tracking-wide hover:scale-110 transform">Features</a>
              <a href="#how-it-works" className="text-gray-400 hover:text-cyan-400 transition-all duration-300 font-medium text-sm tracking-wide hover:scale-110 transform">How it Works</a>
              <a href="#technology" className="text-gray-400 hover:text-cyan-400 transition-all duration-300 font-medium text-sm tracking-wide hover:scale-110 transform">Technology</a>
            </div>

            <div className="flex items-center gap-4">
              <Link 
                href="/auth/login" 
                className="text-gray-300 hover:text-white font-semibold transition-all duration-300 text-sm tracking-wide hover:scale-110 transform"
              >
                Login
              </Link>
              <Link 
                href="/auth/register" 
                className="relative group px-6 py-2.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600 hover:from-cyan-500 hover:via-blue-500 hover:to-emerald-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-cyan-500/50 overflow-hidden transform"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <span className="relative text-sm tracking-wide">Get Started</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Enhanced */}
      <section className="relative pt-24 pb-32 md:pt-32 md:pb-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-5xl mx-auto">
            {/* Premium Badge with better animation */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-emerald-500/10 border border-cyan-500/30 rounded-full mb-10 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer group animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-400 rounded-full blur-md animate-pulse"></div>
                <Sparkles className="relative h-4 w-4 text-cyan-400 group-hover:rotate-180 transition-transform duration-500" />
              </div>
              <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent tracking-wide animate-gradient">
                AI-POWERED • COMPUTER VISION • INSTANT MATCHING
              </span>
            </div>

            {/* Headline with text-shadow */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 leading-tight">
              <span className="block text-white drop-shadow-2xl mb-3 animate-fade-in" style={{ textShadow: '0 0 80px rgba(6, 182, 212, 0.3)' }}>
                Reunite With
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent animate-gradient drop-shadow-2xl animate-fade-in-up" style={{ textShadow: '0 0 100px rgba(6, 182, 212, 0.5)' }}>
                What Matters
              </span>
            </h1>

            {/* Subheadline with better spacing */}
            <p className="text-base md:text-lg text-gray-300 mb-3 max-w-3xl mx-auto leading-relaxed animate-fade-in font-light">
              Advanced AI analyzes your photos and finds perfect matches in our database
            </p>
            <p className="text-sm md:text-base text-cyan-400 mb-10 max-w-2xl mx-auto font-semibold animate-fade-in-up">
              Lost something? Found something? Let intelligence do the work.
            </p>

            {/* CTA Buttons with shine effect */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16 animate-fade-in-up">
              <Link
                href="/items/report-lost"
                className="group relative px-8 py-3.5 bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 text-white font-bold rounded-xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-2xl shadow-red-500/40 hover:shadow-red-500/80 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center gap-2.5">
                  <Search className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-base tracking-wide">Report Lost Item</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
              
              <Link
                href="/items/report-found"
                className="group relative px-8 py-3.5 bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 text-white font-bold rounded-xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-2xl shadow-emerald-500/40 hover:shadow-emerald-500/80 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-teal-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <div className="relative flex items-center justify-center gap-2.5">
                  <Upload className="h-5 w-5 group-hover:-rotate-12 transition-transform duration-300" />
                  <span className="text-base tracking-wide">Report Found Item</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </Link>
            </div>

            {/* Trust Indicators with hover effects */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-sm animate-fade-in mb-16">
              <div className="flex items-center gap-2.5 px-5 py-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full backdrop-blur-sm hover:scale-110 hover:bg-emerald-500/20 transition-all duration-300 cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-emerald-400 rounded-full blur-sm animate-pulse"></div>
                  <div className="relative h-2.5 w-2.5 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50"></div>
                </div>
                <span className="text-emerald-400 font-semibold tracking-wide">Real-time AI</span>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full backdrop-blur-sm hover:scale-110 hover:bg-cyan-500/20 transition-all duration-300 cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-400 rounded-full blur-sm animate-pulse animation-delay-200"></div>
                  <div className="relative h-2.5 w-2.5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"></div>
                </div>
                <span className="text-cyan-400 font-semibold tracking-wide">100% Free</span>
              </div>
              <div className="flex items-center gap-2.5 px-5 py-2.5 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm hover:scale-110 hover:bg-blue-500/20 transition-all duration-300 cursor-pointer">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400 rounded-full blur-sm animate-pulse animation-delay-4000"></div>
                  <div className="relative h-2.5 w-2.5 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                </div>
                <span className="text-blue-400 font-semibold tracking-wide">Secure Platform</span>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="flex justify-center animate-bounce">
              <ChevronDown className="h-8 w-8 text-cyan-400/60" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="relative py-20 border-y border-white/5">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-emerald-500/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center group cursor-pointer hover:scale-110 transition-all duration-500">
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
                <div className="relative text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent animate-count-up">
                  10K+
                </div>
              </div>
              <div className="text-sm md:text-base text-gray-400 font-medium tracking-wide">Items Reunited</div>
            </div>
            <div className="text-center group cursor-pointer hover:scale-110 transition-all duration-500">
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse animation-delay-200"></div>
                <div className="relative text-3xl md:text-4xl font-black bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent animate-count-up">
                  95%
                </div>
              </div>
              <div className="text-sm md:text-base text-gray-400 font-medium tracking-wide">Match Accuracy</div>
            </div>
            <div className="text-center group cursor-pointer hover:scale-110 transition-all duration-500">
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse animation-delay-4000"></div>
                <div className="relative text-3xl md:text-4xl font-black bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent animate-count-up">
                  5K+
                </div>
              </div>
              <div className="text-sm md:text-base text-gray-400 font-medium tracking-wide">Active Users</div>
            </div>
            <div className="text-center group cursor-pointer hover:scale-110 transition-all duration-500">
              <div className="relative inline-block mb-3">
                <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
                <div className="relative text-3xl md:text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent animate-count-up">
                  24/7
                </div>
              </div>
              <div className="text-sm md:text-base text-gray-400 font-medium tracking-wide">AI Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 animate-fade-in">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                Powered by Intelligence
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto animate-fade-in-up">
              Our AI doesn't just match – it understands context, visual patterns, and semantic meaning
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="group relative p-6 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl hover:bg-gray-800/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20 cursor-pointer animate-fade-in flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative flex-1 flex flex-col">
                <div className="mb-4 inline-block p-3 bg-gradient-to-br from-cyan-900/50 to-cyan-800/50 rounded-xl group-hover:scale-110 transition-transform duration-500 w-fit">
                  <Eye className="h-8 w-8 text-cyan-400 group-hover:rotate-12 transition-transform duration-500" />
                </div>
                <h3 className="text-lg font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  Visual Recognition
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
                  Advanced computer vision analyzes every detail – colors, shapes, patterns, and unique features to find exact matches
                </p>
                <div className="flex items-center gap-2 text-cyan-400 font-semibold group-hover:gap-3 transition-all duration-300">
                  <span className="text-xs tracking-wide">Learn More</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>

            <div className="group relative p-6 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl hover:bg-gray-800/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/20 cursor-pointer animate-fade-in animation-delay-200 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative flex-1 flex flex-col">
                <div className="mb-4 inline-block p-3 bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-xl group-hover:scale-110 transition-transform duration-500 w-fit">
                  <Target className="h-8 w-8 text-blue-400 group-hover:rotate-12 transition-transform duration-500" />
                </div>
                <h3 className="text-lg font-bold mb-3 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  Smart Matching
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
                  AI-powered algorithms compare descriptions, locations, and timestamps to surface the most relevant matches instantly
                </p>
                <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-3 transition-all duration-300">
                  <span className="text-xs tracking-wide">Learn More</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>

            <div className="group relative p-6 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl hover:bg-gray-800/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/20 cursor-pointer animate-fade-in animation-delay-4000 flex flex-col">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
              <div className="relative flex-1 flex flex-col">
                <div className="mb-4 inline-block p-3 bg-gradient-to-br from-emerald-900/50 to-emerald-800/50 rounded-xl group-hover:scale-110 transition-transform duration-500 w-fit">
                  <Cpu className="h-8 w-8 text-emerald-400 group-hover:rotate-12 transition-transform duration-500" />
                </div>
                <h3 className="text-lg font-bold mb-3 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Real-Time Processing
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-1">
                  Cloud-powered infrastructure processes thousands of images per second with Google Cloud Vision API for instant results
                </p>
                <div className="flex items-center gap-2 text-emerald-400 font-semibold group-hover:gap-3 transition-all duration-300">
                  <span className="text-xs tracking-wide">Learn More</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-24 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 animate-fade-in">
              <span className="text-white">Simple Process,</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                Powerful Results
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto animate-fade-in-up">
              Get started in three easy steps and let AI do the heavy lifting
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Steps container with proper alignment */}
            <div className="grid md:grid-cols-3 gap-12 md:gap-8 items-start">
              
              <div className="relative text-center group animate-fade-in">
                {/* Connecting line to next step - positioned after number box */}
                <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%+32px)] h-0.5 bg-gradient-to-r from-cyan-500/50 to-blue-500/50"></div>
                
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-cyan-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse"></div>
                  <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl flex items-center justify-center text-3xl font-black text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl shadow-cyan-500/50">
                    <span className="animate-bounce-slow">1</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">Upload & Describe</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
                  Share a photo and brief description of your lost or found item with location details
                </p>
              </div>

              <div className="relative text-center group animate-fade-in animation-delay-200">
                {/* Connecting line to next step */}
                <div className="hidden md:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%+32px)] h-0.5 bg-gradient-to-r from-blue-500/50 to-emerald-500/50"></div>
                
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-blue-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse animation-delay-200"></div>
                  <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-blue-600 to-emerald-600 rounded-2xl flex items-center justify-center text-3xl font-black text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl shadow-blue-500/50">
                    <span className="animate-bounce-slow animation-delay-200">2</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors duration-300">AI Analysis</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
                  Our AI instantly analyzes visual features, patterns, and context to find potential matches
                </p>
              </div>

              <div className="relative text-center group animate-fade-in animation-delay-4000">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-50 group-hover:opacity-75 transition-opacity animate-pulse animation-delay-4000"></div>
                  <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-emerald-600 to-cyan-600 rounded-2xl flex items-center justify-center text-3xl font-black text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-2xl shadow-emerald-500/50">
                    <span className="animate-bounce-slow animation-delay-4000">3</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors duration-300">Get Matched</h3>
                <p className="text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
                  Receive instant notifications when AI finds potential matches. Connect and reunite!
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center animate-fade-in">
            <Link 
              href="/items" 
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600 hover:from-cyan-500 hover:via-blue-500 hover:to-emerald-500 text-white font-bold rounded-xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/80 group"
            >
              <span className="text-base tracking-wide">Browse All Items</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Stack Section */}
      <section id="technology-stack" className="relative py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black mb-4 animate-fade-in">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                Next-Gen Technology
              </span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto animate-fade-in-up">
              Built with cutting-edge AI and cloud infrastructure for unmatched performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group p-6 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl hover:bg-gray-800/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer">
              <div className="mb-4 p-3 bg-gradient-to-br from-cyan-900/50 to-cyan-800/50 rounded-xl inline-block group-hover:scale-110 transition-transform duration-500">
                <Cpu className="h-8 w-8 text-cyan-400 group-hover:rotate-12 transition-transform duration-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Google Cloud Vision</h3>
              <p className="text-sm text-gray-400">Advanced image analysis</p>
            </div>

            <div className="group p-6 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl hover:bg-gray-800/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/20 cursor-pointer">
              <div className="mb-4 p-3 bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-xl inline-block group-hover:scale-110 transition-transform duration-500">
                <Rocket className="h-8 w-8 text-blue-400 group-hover:rotate-12 transition-transform duration-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Next.js 14</h3>
              <p className="text-sm text-gray-400">Lightning-fast performance</p>
            </div>

            <div className="group p-6 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl hover:bg-gray-800/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-500/20 cursor-pointer">
              <div className="mb-4 p-3 bg-gradient-to-br from-emerald-900/50 to-emerald-800/50 rounded-xl inline-block group-hover:scale-110 transition-transform duration-500">
                <Shield className="h-8 w-8 text-emerald-400 group-hover:rotate-12 transition-transform duration-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Firebase Security</h3>
              <p className="text-sm text-gray-400">Enterprise-grade protection</p>
            </div>

            <div className="group p-6 bg-gray-800/30 backdrop-blur-xl border border-gray-700/50 rounded-2xl hover:bg-gray-800/50 transition-all duration-500 hover:scale-105 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer">
              <div className="mb-4 p-3 bg-gradient-to-br from-cyan-900/50 to-cyan-800/50 rounded-xl inline-block group-hover:scale-110 transition-transform duration-500">
                <Layers className="h-8 w-8 text-cyan-400 group-hover:rotate-12 transition-transform duration-500" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Cloud Storage</h3>
              <p className="text-sm text-gray-400">Scalable infrastructure</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="technology" className="relative py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative p-10 md:p-12 bg-gradient-to-br from-cyan-900/20 via-blue-900/20 to-emerald-900/20 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
            
            <div className="relative">
              <div className="mb-8 inline-block">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 blur-2xl opacity-75 animate-pulse"></div>
                  <Award className="relative h-16 w-16 text-cyan-400 mx-auto" />
                </div>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-black mb-4 animate-fade-in">
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                  Start Reuniting Today
                </span>
              </h2>
              <p className="text-base md:text-lg text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up">
                Join thousands who've already found what matters. Let AI help you reconnect.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up">
                <Link
                  href="/auth/register"
                  className="group relative px-8 py-3.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600 text-white font-bold rounded-xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/80 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  <div className="relative flex items-center justify-center gap-2.5">
                    <span className="text-base tracking-wide">Get Started Free</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </div>
                </Link>
                
                <Link
                  href="/items"
                  className="group px-8 py-3.5 bg-white/5 hover:bg-white/10 border-2 border-cyan-500/50 hover:border-cyan-500 text-white font-bold rounded-xl transition-all duration-500 transform hover:scale-110 hover:-translate-y-2"
                >
                  <div className="flex items-center justify-center gap-2.5">
                    <span className="text-base tracking-wide">Browse Items</span>
                    <Search className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 bg-gradient-to-b from-transparent to-slate-950/80 backdrop-blur-xl py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-500 rounded-2xl blur-lg opacity-75"></div>
                <div className="relative bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600 p-2.5 rounded-2xl">
                  <Package className="h-7 w-7 text-white" />
                </div>
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Lost&Found
              </span>
            </div>

            <div className="flex gap-8 text-sm text-gray-400">
              <a href="#" className="hover:text-cyan-400 transition-colors duration-300 font-medium">Privacy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors duration-300 font-medium">Terms</a>
              <a href="#" className="hover:text-cyan-400 transition-colors duration-300 font-medium">Support</a>
            </div>

            <p className="text-sm text-gray-500">
              © 2024 Lost&Found. AI-Powered Platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
