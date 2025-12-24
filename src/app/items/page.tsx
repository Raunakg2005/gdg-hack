'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import ItemCard from '@/components/ItemCard'
import { Item } from '@/types'
import { Filter, Package, LogOut, Settings, Search, TrendingUp, XCircle, CheckCircle, BarChart2 } from 'lucide-react'
import Link from 'next/link'

function ItemsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [user, setUser] = useState<any>(null)
  const [items, setItems] = useState<Item[]>([])
  const [filteredItems, setFilteredItems] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'lost' | 'found'>('all')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        router.push('/auth/login')
      }
    })
    return () => unsubscribe()
  }, [router])

  useEffect(() => {
    loadItems()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [items, filter, categoryFilter])

  const loadItems = async () => {
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
    } catch (error) {
      console.error('Error loading items:', error)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = items

    if (filter !== 'all') {
      filtered = filtered.filter((item) => item.type === filter)
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((item) => item.category === categoryFilter)
    }

    setFilteredItems(filtered)
  }

  const categories = ['all', ...Array.from(new Set(items.map((item) => item.category)))]

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  const successType = searchParams.get('success')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl group-hover:scale-110 transition-transform">
                <Package className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Lost & Found</h1>
            </Link>
            <div className="flex gap-3 items-center">
              {user.email === 'admin@lostandfound.com' || user.email === 'your-email@example.com' ? (
                <Link href="/admin" className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 hover:text-purple-100 rounded-lg transition flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Admin Panel
                </Link>
              ) : null}
              <span className="text-sm text-gray-300 hidden md:block">{user.email}</span>
              <button
                onClick={() => auth.signOut()}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 rounded-lg transition flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {successType && (
          <div className="mb-6 p-4 bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 rounded-xl backdrop-blur-sm animate-fade-in">
            {successType === 'lost' ? '✓ Lost item reported successfully! We\'ll notify you if we find a match.' : '✓ Found item reported successfully! We\'ll help find the owner.'}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 hover:bg-white/15 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Items</p>
                <p className="text-2xl font-bold text-white mt-1">{items.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 hover:bg-white/15 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Lost Items</p>
                <p className="text-2xl font-bold text-white mt-1">{items.filter(i => i.type === 'lost').length}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg">
                <XCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 hover:bg-white/15 transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Found Items</p>
                <p className="text-2xl font-bold text-white mt-1">{items.filter(i => i.type === 'found').length}</p>
              </div>
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-3xl font-bold text-white">Browse Items</h2>
          <div className="flex gap-3">
            <Link
              href="/items/report-lost"
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-all transform hover:scale-105 flex items-center gap-2 font-semibold"
            >
              <XCircle className="w-5 h-5" />
              Report Lost
            </Link>
            <Link
              href="/items/report-found"
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition-all transform hover:scale-105 flex items-center gap-2 font-semibold"
            >
              <CheckCircle className="w-5 h-5" />
              Report Found
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg p-5 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-cyan-400" />
              <span className="font-semibold text-white">Filters:</span>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setFilter('all')}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all transform hover:scale-105 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                All Items
              </button>
              <button
                onClick={() => setFilter('lost')}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all transform hover:scale-105 ${
                  filter === 'lost'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-red-500/50'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Lost Items
              </button>
              <button
                onClick={() => setFilter('found')}
                className={`px-5 py-2.5 rounded-xl font-medium transition-all transform hover:scale-105 ${
                  filter === 'found'
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/50'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                Found Items
              </button>
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2.5 bg-white/10 border border-white/20 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent backdrop-blur-sm"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Items Grid */}
        {loading ? (
          <div className="text-center py-16 bg-white/5 backdrop-blur-lg rounded-xl border border-white/20">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-cyan-500 border-r-transparent"></div>
            <p className="mt-4 text-gray-300 font-medium">Loading items...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white/5 backdrop-blur-lg rounded-xl border border-white/20">
            <div className="inline-flex p-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl mb-4">
              <Package className="h-16 w-16 text-cyan-400" />
            </div>
            <p className="text-xl text-white font-semibold mb-2">No items found</p>
            <p className="text-gray-400">Be the first to report an item!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <ItemCard 
                key={item.id} 
                item={item} 
                onClick={() => router.push(`/items/${item.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ItemsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    }>
      <ItemsContent />
    </Suspense>
  )
}
