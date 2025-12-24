'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { Item } from '@/types'
import { ArrowLeft, Calendar, MapPin, User, Mail, Package, Tag, LogOut, Settings, Sparkles, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { format } from 'date-fns'

export default function ItemDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [user, setUser] = useState<any>(null)
  const [item, setItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(true)

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
    if (params.id) {
      loadItem(params.id as string)
    }
  }, [params.id])

  const loadItem = async (id: string) => {
    try {
      const docRef = doc(db, 'items', id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        setItem({
          id: docSnap.id,
          ...docSnap.data(),
          date: docSnap.data().date,
          createdAt: docSnap.data().createdAt?.toDate(),
          updatedAt: docSnap.data().updatedAt?.toDate(),
        } as Item)
      } else {
        router.push('/items')
      }
    } catch (error) {
      console.error('Error loading item:', error)
      router.push('/items')
    } finally {
      setLoading(false)
    }
  }

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 flex items-center justify-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-cyan-500 border-r-transparent"></div>
      </div>
    )
  }

  if (!item) {
    return null
  }

  const isLost = item.type === 'lost'

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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/items"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white mb-6 transition-all rounded-lg backdrop-blur-sm border border-white/20 group"
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          Back to Items
        </Link>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-96 md:h-auto bg-gradient-to-br from-slate-800 to-slate-900">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="p-8 bg-white/5 rounded-2xl">
                    <Package className="h-24 w-24 text-cyan-400" />
                  </div>
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-5 py-2.5 text-sm font-bold rounded-xl shadow-lg backdrop-blur-sm border ${
                    isLost
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-red-400/50'
                      : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-emerald-400/50'
                  }`}
                >
                  {isLost ? '❌ LOST ITEM' : '✓ FOUND ITEM'}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent mb-6">
                {item.title}
              </h1>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
                    <Tag className="h-4 w-4 text-white flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Category</p>
                    <p className="text-white font-semibold">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
                    <MapPin className="h-4 w-4 text-white flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Location</p>
                    <p className="text-white font-semibold">{item.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
                    <Calendar className="h-4 w-4 text-white flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Date</p>
                    <p className="text-white font-semibold">
                      {format(new Date(item.date), 'MMMM dd, yyyy')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
                    <User className="h-4 w-4 text-white flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Reported By</p>
                    <p className="text-white font-semibold">{item.userName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition">
                  <div className="p-2 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-lg">
                    <Mail className="h-4 w-4 text-white flex-shrink-0" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Contact Email</p>
                    <a
                      href={`mailto:${item.contactInfo}`}
                      className="text-cyan-400 hover:text-cyan-300 font-semibold transition"
                    >
                      {item.contactInfo}
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/20 pt-6">
                <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-cyan-500 to-blue-500 rounded-full"></div>
                  Description
                </h2>
                <p className="text-gray-300 leading-relaxed text-base">{item.description}</p>
              </div>

              {item.imageLabels && item.imageLabels.length > 0 && (
                <div className="border-t border-white/20 pt-6 mt-6">
                  <h2 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-cyan-400" />
                    AI Detected Features
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {item.imageLabels.map((label, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-300 text-sm rounded-lg font-semibold hover:bg-cyan-500/30 transition"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.matchScore !== undefined && (
                <div className="border-t border-white/20 pt-6 mt-6">
                  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Google Cloud Vision AI</p>
                        <span className="text-lg font-bold text-white">
                          Match Score
                        </span>
                      </div>
                      <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        {item.matchScore}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex gap-3">
                <a
                  href={`mailto:${item.contactInfo}?subject=${isLost ? 'Found' : 'Lost'} Item: ${item.title}`}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 text-center flex items-center justify-center gap-2"
                >
                  <Mail className="h-5 w-5" />
                  Contact Owner
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
