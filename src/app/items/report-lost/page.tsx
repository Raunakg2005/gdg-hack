'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { uploadToCloudinary } from '@/lib/cloudinary'
import ImageUpload from '@/components/ImageUpload'
import { Loader2, AlertCircle, MapPin, Calendar, Hash, MessageSquare, Upload, Sparkles, ArrowLeft } from 'lucide-react'
import axios from 'axios'

const categories = [
  'Electronics',
  'Clothing',
  'Bags & Wallets',
  'Keys',
  'Documents',
  'Jewelry',
  'Books',
  'Pets',
  'Other',
]

export default function ReportLostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [analyzing, setAnalyzing] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    contactInfo: '',
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        setFormData((prev) => ({ ...prev, contactInfo: user.email || '' }))
      } else {
        router.push('/auth/login')
      }
    })
    return () => unsubscribe()
  }, [router])

  const handleImageSelect = (file: File, preview: string) => {
    setImageFile(file)
    setPreviewUrl(preview)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)

    try {
      let imageUrl = ''
      let imageLabels: string[] = []

      // Upload image if provided
      if (imageFile) {
        setAnalyzing(true)
        imageUrl = await uploadToCloudinary(imageFile)

        // Analyze image with Vision API
        try {
          const analysisResponse = await axios.post('/api/analyze-image', { imageUrl })
          imageLabels = analysisResponse.data.labels.map((l: any) => l.description)
        } catch (error) {
          console.error('Image analysis failed:', error)
        }
        setAnalyzing(false)
      }

      // Save to Firestore
      const itemData = {
        type: 'lost',
        status: 'lost',
        ...formData,
        imageUrl,
        imageLabels,
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || 'Anonymous',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      await addDoc(collection(db, 'items'), itemData)

      // Check for matches
      const foundItemsQuery = query(
        collection(db, 'items'),
        where('type', '==', 'found'),
        where('status', '==', 'found')
      )
      const foundItemsSnapshot = await getDocs(foundItemsQuery)
      const foundItems = foundItemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      if (foundItems.length > 0 && imageLabels.length > 0) {
        // Find potential matches
        await axios.post('/api/match-items', {
          lostItems: [{ ...itemData, imageLabels }],
          foundItems,
        })
      }

      router.push('/items?success=lost')
    } catch (error: any) {
      console.error('Error reporting lost item:', error)
      alert('Failed to report item. Please try again.')
    } finally {
      setLoading(false)
      setAnalyzing(false)
    }
  }

  if (!user) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 flex items-center justify-center"><div className="text-white">Loading...</div></div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 py-12 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
          {/* Header */}
          <div className="mb-8">
            <Link 
              href="/items" 
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-4 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Items
            </Link>
            <h1 className="text-3xl font-bold text-white mb-2">Report Lost Item</h1>
            <p className="text-gray-300">Help us find your lost item by providing details below</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <label className="block text-sm font-medium text-gray-200 mb-3 flex items-center gap-2">
                <Upload className="w-4 h-4 text-cyan-400" />
                Photo (Recommended for better matching)
              </label>
              <ImageUpload
                onImageSelect={handleImageSelect}
                currentImage={previewUrl}
                onRemove={() => {
                  setImageFile(null)
                  setPreviewUrl('')
                }}
              />
              {analyzing && (
                <div className="mt-3 flex items-center text-sm text-cyan-400 bg-cyan-500/10 p-3 rounded-lg border border-cyan-500/20">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                  Analyzing image with Google Cloud Vision AI...
                </div>
              )}
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                Item Title *
              </label>
              <input
                id="title"
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Black iPhone 13"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                Category *
              </label>
              <select
                id="category"
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                Description *
              </label>
              <textarea
                id="description"
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your item in detail (color, brand, distinctive features, etc.)"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                  Location Lost *
                </label>
                <input
                  id="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Central Park, NYC"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                  Date Lost *
                </label>
                <input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-gray-300 mb-1">
                Contact Information *
              </label>
              <input
                id="contact"
                type="text"
                required
                value={formData.contactInfo}
                onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                placeholder="Email or phone number"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-3 border border-gray-600 text-gray-300 font-semibold rounded-lg hover:bg-gray-700 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || analyzing}
                className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-xl shadow-lg shadow-red-500/50 hover:from-red-700 hover:to-red-800 hover:scale-105 transition-all duration-300 transform disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading || analyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {analyzing ? 'Analyzing...' : 'Submitting...'}
                  </>
                ) : (
                  'Report Lost Item'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
