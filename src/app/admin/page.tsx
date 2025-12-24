'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { collection, getDocs, query, orderBy, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { Item } from '@/types'
import { Package, Users, TrendingUp, Trash2, Eye, CheckCircle, XCircle, BarChart3 } from 'lucide-react'
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
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-primary-400" />
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
            </div>
            <div className="flex gap-4 items-center">
              <Link href="/items" className="px-4 py-2 text-gray-300 hover:text-primary-400">
                User View
              </Link>
              <span className="text-sm text-gray-300">{user.email}</span>
              <button
                onClick={() => auth.signOut()}
                className="px-4 py-2 text-gray-300 hover:text-red-400"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="group bg-gradient-to-br from-blue-900 to-blue-800 border border-blue-700/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">Total Items</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.totalItems}</p>
              </div>
              <Package className="h-12 w-12 text-blue-400 opacity-80 group-hover:animate-pulse" />
            </div>
          </div>

          <div className="group bg-gradient-to-br from-red-900 to-red-800 border border-red-700/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-300 text-sm font-medium">Lost Items</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.lostItems}</p>
              </div>
              <XCircle className="h-12 w-12 text-red-400 opacity-80 group-hover:animate-pulse" />
            </div>
          </div>

          <div className="group bg-gradient-to-br from-green-900 to-green-800 border border-green-700/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-300 text-sm font-medium">Found Items</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.foundItems}</p>
              </div>
              <CheckCircle className="h-12 w-12 text-green-400 opacity-80 group-hover:animate-pulse" />
            </div>
          </div>

          <div className="group bg-gradient-to-br from-purple-900 to-purple-800 border border-purple-700/50 p-6 rounded-2xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium">Matched</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.matchedItems}</p>
              </div>
              <TrendingUp className="h-12 w-12 text-purple-400 opacity-80 group-hover:animate-pulse" />
            </div>
          </div>
        </div>

        {/* All Items Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-blue-400 text-transparent bg-clip-text mb-6">All Items</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
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
