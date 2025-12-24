'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import Link from 'next/link'
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  Package, 
  CheckCircle, 
  XCircle,
  BarChart3,
  PieChart,
  ArrowLeft
} from 'lucide-react'

const ADMIN_EMAILS = ['admin@lostandfound.com', 'your-email@example.com']

export default function AnalyticsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState({
    totalItems: 0,
    lostItems: 0,
    foundItems: 0,
    matchedItems: 0,
    activeUsers: 0,
    newItemsToday: 0,
    newItemsWeek: 0,
    categories: {} as Record<string, number>,
    dailyReports: [] as { date: string; lost: number; found: number }[],
    matchRate: 0,
    topCategories: [] as { name: string; count: number }[],
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        const adminStatus = ADMIN_EMAILS.includes(user.email || '')
        setIsAdmin(adminStatus)
        if (!adminStatus) {
          router.push('/items')
        }
      } else {
        router.push('/auth/login')
      }
    })
    return () => unsubscribe()
  }, [router])

  useEffect(() => {
    if (isAdmin) {
      loadAnalytics()
    }
  }, [isAdmin])

  const loadAnalytics = async () => {
    try {
      setLoading(true)
      
      // Get all items
      const itemsSnapshot = await getDocs(collection(db, 'items'))
      const items = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      }))

      // Get all users
      const usersSnapshot = await getDocs(collection(db, 'users'))
      const totalUsers = usersSnapshot.size

      // Calculate statistics
      const lostItems = items.filter((item: any) => item.type === 'lost').length
      const foundItems = items.filter((item: any) => item.type === 'found').length
      const matchedItems = items.filter((item: any) => item.status === 'matched').length

      // Calculate new items (last 24 hours and 7 days)
      const now = new Date()
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      
      const newItemsToday = items.filter((item: any) => 
        item.createdAt && item.createdAt > oneDayAgo
      ).length
      
      const newItemsWeek = items.filter((item: any) => 
        item.createdAt && item.createdAt > oneWeekAgo
      ).length

      // Category breakdown
      const categoryCount: Record<string, number> = {}
      items.forEach((item: any) => {
        const category = item.category || 'Other'
        categoryCount[category] = (categoryCount[category] || 0) + 1
      })

      const topCategories = Object.entries(categoryCount)
        .map(([name, count]) => ({ name, count: count as number }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5)

      // Daily reports (last 7 days)
      const dailyReports: { date: string; lost: number; found: number }[] = []
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        const dayStart = new Date(date.setHours(0, 0, 0, 0))
        const dayEnd = new Date(date.setHours(23, 59, 59, 999))
        
        const dayItems = items.filter((item: any) => 
          item.createdAt && item.createdAt >= dayStart && item.createdAt <= dayEnd
        )
        
        dailyReports.push({
          date: dateStr,
          lost: dayItems.filter((item: any) => item.type === 'lost').length,
          found: dayItems.filter((item: any) => item.type === 'found').length,
        })
      }

      const matchRate = items.length > 0 ? (matchedItems / items.length) * 100 : 0

      setAnalytics({
        totalItems: items.length,
        lostItems,
        foundItems,
        matchedItems,
        activeUsers: totalUsers,
        newItemsToday,
        newItemsWeek,
        categories: categoryCount,
        dailyReports,
        matchRate,
        topCategories,
      })
    } catch (error) {
      console.error('Error loading analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!isAdmin) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading analytics...</div>
      </div>
    )
  }

  const StatCard = ({ 
    icon: Icon, 
    title, 
    value, 
    subtitle, 
    trend, 
    color 
  }: { 
    icon: any
    title: string
    value: string | number
    subtitle?: string
    trend?: 'up' | 'down'
    color: string
  }) => (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm ${trend === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          </div>
        )}
      </div>
      <h3 className="text-gray-400 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white mb-1">{value}</p>
      {subtitle && <p className="text-gray-400 text-xs">{subtitle}</p>}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link 
              href="/admin" 
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-4 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-gray-300">Real-time insights and platform statistics</p>
          </div>
          <button
            onClick={loadAnalytics}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
          >
            Refresh Data
          </button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Package}
            title="Total Items"
            value={analytics.totalItems}
            subtitle={`+${analytics.newItemsToday} today`}
            trend="up"
            color="from-cyan-500 to-blue-500"
          />
          <StatCard
            icon={XCircle}
            title="Lost Items"
            value={analytics.lostItems}
            subtitle={`${((analytics.lostItems / analytics.totalItems) * 100).toFixed(1)}% of total`}
            color="from-orange-500 to-red-500"
          />
          <StatCard
            icon={CheckCircle}
            title="Found Items"
            value={analytics.foundItems}
            subtitle={`${((analytics.foundItems / analytics.totalItems) * 100).toFixed(1)}% of total`}
            color="from-emerald-500 to-teal-500"
          />
          <StatCard
            icon={Users}
            title="Active Users"
            value={analytics.activeUsers}
            color="from-purple-500 to-pink-500"
          />
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={Activity}
            title="Match Rate"
            value={`${analytics.matchRate.toFixed(1)}%`}
            subtitle={`${analytics.matchedItems} items matched`}
            trend={analytics.matchRate > 50 ? 'up' : 'down'}
            color="from-blue-500 to-cyan-500"
          />
          <StatCard
            icon={TrendingUp}
            title="New Items (24h)"
            value={analytics.newItemsToday}
            subtitle="Last 24 hours"
            color="from-cyan-500 to-emerald-500"
          />
          <StatCard
            icon={BarChart3}
            title="New Items (7d)"
            value={analytics.newItemsWeek}
            subtitle="Last 7 days"
            color="from-emerald-500 to-teal-500"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Reports Chart */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-white">Daily Reports (7 Days)</h2>
            </div>
            <div className="space-y-4">
              {analytics.dailyReports.map((day, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                    <span>{day.date}</span>
                    <span className="text-white font-semibold">{day.lost + day.found} items</span>
                  </div>
                  <div className="flex gap-2">
                    <div 
                      className="h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center text-white text-xs font-semibold transition-all duration-500"
                      style={{ width: `${(day.lost / Math.max(...analytics.dailyReports.map(d => d.lost + d.found), 1)) * 100}%` }}
                    >
                      {day.lost > 0 && `${day.lost} Lost`}
                    </div>
                    <div 
                      className="h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white text-xs font-semibold transition-all duration-500"
                      style={{ width: `${(day.found / Math.max(...analytics.dailyReports.map(d => d.lost + d.found), 1)) * 100}%` }}
                    >
                      {day.found > 0 && `${day.found} Found`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Categories */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-6">
              <PieChart className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Top Categories</h2>
            </div>
            <div className="space-y-4">
              {analytics.topCategories.map((category, index) => {
                const percentage = (category.count / analytics.totalItems) * 100
                const colors = [
                  'from-cyan-500 to-blue-500',
                  'from-emerald-500 to-teal-500',
                  'from-purple-500 to-pink-500',
                  'from-orange-500 to-red-500',
                  'from-blue-500 to-cyan-500',
                ]
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                      <span className="font-medium">{category.name}</span>
                      <span className="text-white font-semibold">{category.count} items ({percentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${colors[index]} rounded-full transition-all duration-1000`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-white mb-4">Platform Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`inline-flex p-4 rounded-full mb-3 ${analytics.matchRate > 50 ? 'bg-emerald-500/20' : 'bg-orange-500/20'}`}>
                <Activity className={`w-8 h-8 ${analytics.matchRate > 50 ? 'text-emerald-400' : 'text-orange-400'}`} />
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Matching Performance</h3>
              <p className="text-2xl font-bold text-white">{analytics.matchRate > 50 ? 'Excellent' : 'Good'}</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full mb-3 bg-cyan-500/20">
                <TrendingUp className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-gray-400 text-sm mb-1">Weekly Growth</h3>
              <p className="text-2xl font-bold text-white">+{analytics.newItemsWeek}</p>
            </div>
            <div className="text-center">
              <div className="inline-flex p-4 rounded-full mb-3 bg-purple-500/20">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-gray-400 text-sm mb-1">User Engagement</h3>
              <p className="text-2xl font-bold text-white">{(analytics.totalItems / Math.max(analytics.activeUsers, 1)).toFixed(1)} items/user</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
