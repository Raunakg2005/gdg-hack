'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import ItemCard from '@/components/ItemCard'
import { Item } from '@/types'
import { Filter, Package } from 'lucide-react'
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
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Package className="h-8 w-8 text-primary-400" />
              <h1 className="text-2xl font-bold text-white">Lost & Found</h1>
            </Link>
            <div className="flex gap-4 items-center">
              {user.email === 'admin@lostandfound.com' || user.email === 'your-email@example.com' ? (
                <Link href="/admin" className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                  Admin Panel
                </Link>
              ) : null}
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
        {successType && (
          <div className="mb-6 p-4 bg-green-900 border border-green-700 text-green-300 rounded-lg">
            {successType === 'lost' ? 'Lost item reported successfully! We\'ll notify you if we find a match.' : 'Found item reported successfully! We\'ll help find the owner.'}
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-white">All Items</h2>
          <div className="flex gap-3">
            <Link
              href="/items/report-lost"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Report Lost
            </Link>
            <Link
              href="/items/report-found"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Report Found
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow p-4 mb-6">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <span className="font-medium text-gray-300">Filters:</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-xl font-medium transition-all transform hover:scale-105 ${
                  filter === 'all'
                    ? 'bg-gradient-to-r from-primary-600 to-blue-600 text-white shadow-lg shadow-primary-500/50'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('lost')}
                className={`px-4 py-2 rounded-xl font-medium transition-all transform hover:scale-105 ${
                  filter === 'lost'
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/50'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Lost
              </button>
              <button
                onClick={() => setFilter('found')}
                className={`px-4 py-2 rounded-xl font-medium transition-all transform hover:scale-105 ${
                  filter === 'found'
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg shadow-green-500/50'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Found
              </button>
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary-500"
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
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
            <p className="mt-4 text-gray-600">Loading items...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-gray-800 border border-gray-700 rounded-xl shadow">
            <Package className="h-16 w-16 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">No items found. Be the first to report!</p>
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
