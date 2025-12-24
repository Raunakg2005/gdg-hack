'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { uploadToCloudinary } from '@/lib/cloudinary'
import ImageUpload from '@/components/ImageUpload'
import { Loader2, CheckCircle } from 'lucide-react'
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

export default function ReportFoundPage() {
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

    if (!imageFile) {
      alert('Please upload an image of the found item')
      return
    }

    setLoading(true)

    try {
      setAnalyzing(true)
      const imageUrl = await uploadToCloudinary(imageFile)

      // Analyze image with Vision API
      let imageLabels: string[] = []
      try {
        const analysisResponse = await axios.post('/api/analyze-image', { imageUrl })
        imageLabels = analysisResponse.data.labels.map((l: any) => l.description)
      } catch (error) {
        console.error('Image analysis failed:', error)
      }
      setAnalyzing(false)

      // Save to Firestore
      const itemData = {
        type: 'found',
        status: 'found',
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

      // Check for matches with lost items
      const lostItemsQuery = query(
        collection(db, 'items'),
        where('type', '==', 'lost'),
        where('status', '==', 'lost')
      )
      const lostItemsSnapshot = await getDocs(lostItemsQuery)
      const lostItems = lostItemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      if (lostItems.length > 0 && imageLabels.length > 0) {
        // Find potential matches
        await axios.post('/api/match-items', {
          lostItems,
          foundItems: [{ ...itemData, imageLabels }],
        })
      }

      router.push('/items?success=found')
    } catch (error: any) {
      console.error('Error reporting found item:', error)
      alert('Failed to report item. Please try again.')
    } finally {
      setLoading(false)
      setAnalyzing(false)
    }
  }

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 py-12 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      
      <div className="max-w-3xl mx-auto px-4 relative z-10">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 bg-gradient-to-br from-green-900 to-green-800 rounded-xl shadow-lg shadow-green-500/50 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 text-transparent bg-clip-text">Report Found Item</h1>
              <p className="text-gray-300">Help return this item to its owner</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Photo * (Required for AI matching)
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
                <div className="mt-2 flex items-center text-sm text-blue-600">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Analyzing image with AI to find matches...
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
                placeholder="e.g., Black Leather Wallet"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                placeholder="Describe the item in detail (color, brand, contents, etc.)"
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-300 mb-1">
                  Location Found *
                </label>
                <input
                  id="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., Coffee Shop on Main St"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
                  Date Found *
                </label>
                <input
                  id="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                className="flex-1 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl shadow-lg shadow-green-500/50 hover:from-green-700 hover:to-green-800 hover:scale-105 transition-all duration-300 transform disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading || analyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    {analyzing ? 'Analyzing...' : 'Submitting...'}
                  </>
                ) : (
                  'Report Found Item'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
