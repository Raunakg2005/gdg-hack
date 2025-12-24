'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { Item } from '@/types'
import { ArrowLeft, Calendar, MapPin, User, Mail, Package, Tag } from 'lucide-react'
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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent"></div>
      </div>
    )
  }

  if (!item) {
    return null
  }

  const isLost = item.type === 'lost'

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

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/items"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-400 mb-6 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Items
        </Link>

        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative h-96 md:h-auto bg-gray-900">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <Package className="h-24 w-24 text-gray-600" />
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span
                  className={`px-4 py-2 text-sm font-bold rounded-full shadow-lg ${
                    isLost
                      ? 'bg-red-600 text-white'
                      : 'bg-green-600 text-white'
                  }`}
                >
                  {isLost ? 'LOST ITEM' : 'FOUND ITEM'}
                </span>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
                {item.title}
              </h1>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Tag className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Category</p>
                    <p className="text-white font-medium">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Location</p>
                    <p className="text-white font-medium">{item.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Date</p>
                    <p className="text-white font-medium">
                      {format(new Date(item.date), 'MMMM dd, yyyy')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Reported By</p>
                    <p className="text-white font-medium">{item.userName}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Contact</p>
                    <a
                      href={`mailto:${item.contactInfo}`}
                      className="text-primary-400 hover:text-primary-300 font-medium"
                    >
                      {item.contactInfo}
                    </a>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <h2 className="text-lg font-semibold text-white mb-2">Description</h2>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>

              {item.imageLabels && item.imageLabels.length > 0 && (
                <div className="border-t border-gray-700 pt-6 mt-6">
                  <h2 className="text-lg font-semibold text-white mb-3">AI Detected Features</h2>
                  <div className="flex flex-wrap gap-2">
                    {item.imageLabels.map((label, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 text-cyan-300 text-sm rounded-lg font-medium"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.matchScore !== undefined && (
                <div className="border-t border-gray-700 pt-6 mt-6">
                  <div className="bg-gradient-to-r from-primary-600/10 to-blue-600/10 border border-primary-500/30 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-white">
                        AI Match Score
                      </span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-primary-400 to-blue-400 bg-clip-text text-transparent">
                        {item.matchScore}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex gap-3">
                <a
                  href={`mailto:${item.contactInfo}?subject=${isLost ? 'Found' : 'Lost'} Item: ${item.title}`}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-primary-600 to-blue-600 text-white font-bold rounded-xl hover:from-primary-500 hover:to-blue-500 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-primary-500/50 text-center"
                >
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
