'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { collection, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { Item } from '@/types'
import { Package, Users, TrendingUp, Trash2, Eye, CheckCircle, XCircle, BarChart3, BarChart2 } from 'lucide-react'
import Link from 'next/link'
import ItemCard from '@/components/ItemCard'

// Add admin emails here
const ADMIN_EMAILS = ['admin@lostandfound.com', 'your-email@example.com']

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState<Item[]>([])
  const [stats, setStats] = useState({
    totalItems: 0,
    lostItems: 0,
    foundItems: 0,
    matchedItems: 0,
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        const adminStatus = ADMIN_EMAILS.includes(user.email || '')
        setIsAdmin(adminStatus)
        if (!adminStatus) {
          router.push('/')
        } else {
          loadData()
        }
      } else {
        router.push('/auth/login')
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [router])

  const loadData = async () => {
    try {
      const q = query(collection(db, 'items'), orderBy('createdAt', 'desc'))
      const snapshot = await getDocs(q)
      const itemsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        date: doc.data().date,
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Item[]
      
      setItems(itemsData)
      
      setStats({
        totalItems: itemsData.length,
        lostItems: itemsData.filter(i => i.type === 'lost').length,
        foundItems: itemsData.filter(i => i.type === 'found').length,
        matchedItems: itemsData.filter(i => i.status === 'matched').length,
      })
    } catch (error) {
      console.error('Error loading data:', error)
    }
  }

  const handleDeleteItem = async (itemId: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteDoc(doc(db, 'items', itemId))
        await loadData()
      } catch (error) {
        console.error('Error deleting item:', error)
      }
    }
  }

  const handleUpdateStatus = async (itemId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'items', itemId), { status, updatedAt: new Date() })
      await loadData()
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  if (loading) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>
  }

  if (!isAdmin) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Access Denied</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
                <Package className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <div className="flex gap-4 items-center">
              <Link 
                href="/admin/analytics" 
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300 flex items-center gap-2"
              >
                <BarChart2 className="w-4 h-4" />
                Analytics
              </Link>
              <Link href="/items" className="px-4 py-2 text-gray-300 hover:text-white transition">
                User View
              </Link>
              <span className="text-sm text-gray-300 hidden md:block">{user.email}</span>
              <button
                onClick={() => auth.signOut()}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium mb-2">Total Items</p>
                <p className="text-4xl font-bold text-white">{stats.totalItems}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
                <Package className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="group bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium mb-2">Lost Items</p>
                <p className="text-4xl font-bold text-white">{stats.lostItems}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                <XCircle className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="group bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium mb-2">Found Items</p>
                <p className="text-4xl font-bold text-white">{stats.foundItems}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="group bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm font-medium mb-2">Matched</p>
                <p className="text-4xl font-bold text-white">{stats.matchedItems}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* All Items Table */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-cyan-400" />
            All Items Management
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">Title</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">Type</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">Category</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">Location</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">User</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-700 hover:bg-gray-700/50 transition-colors">
                    <td className="py-3 px-4 text-white font-medium">{item.title}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        item.type === 'lost' ? 'bg-red-900 text-red-300' : 'bg-green-900 text-green-300'
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-300">{item.category}</td>
                    <td className="py-3 px-4 text-gray-300">{item.location}</td>
                    <td className="py-3 px-4 text-gray-300">{item.userName}</td>
                    <td className="py-3 px-4">
                      <select
                        value={item.status}
                        onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                        className="bg-gray-700 border border-gray-600 text-white text-xs rounded px-2 py-1"
                      >
                        <option value="lost">Lost</option>
                        <option value="found">Found</option>
                        <option value="matched">Matched</option>
                        <option value="returned">Returned</option>
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="group p-2 bg-red-900/50 hover:bg-red-900 text-red-300 rounded-lg transition-all transform hover:scale-110"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4 group-hover:animate-pulse" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
