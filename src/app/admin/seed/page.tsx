'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Loader2, CheckCircle } from 'lucide-react'

const dummyItems = [
  {
    type: 'lost',
    status: 'lost',
    title: 'Black Leather Wallet',
    description: 'Lost my black leather wallet near the campus library. Contains ID cards and some cash.',
    category: 'Bags & Wallets',
    location: 'Campus Library, Building A',
    date: '2025-12-20',
    contactInfo: 'demo@lostandfound.com',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
    imageLabels: ['wallet', 'leather', 'black', 'accessory', 'personal item'],
    userId: 'demo-user-1',
    userEmail: 'demo@lostandfound.com',
    userName: 'Demo User',
    createdAt: new Date('2025-12-20T10:30:00'),
    updatedAt: new Date('2025-12-20T10:30:00'),
  },
  {
    type: 'found',
    status: 'found',
    title: 'Brown Leather Wallet',
    description: 'Found a brown wallet near the cafeteria. Has some cards inside.',
    category: 'Bags & Wallets',
    location: 'Student Cafeteria',
    date: '2025-12-21',
    contactInfo: 'john.doe@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800',
    imageLabels: ['wallet', 'leather', 'brown', 'accessory', 'personal item'],
    userId: 'demo-user-2',
    userEmail: 'john.doe@example.com',
    userName: 'John Doe',
    createdAt: new Date('2025-12-21T14:15:00'),
    updatedAt: new Date('2025-12-21T14:15:00'),
  },
  {
    type: 'lost',
    status: 'lost',
    title: 'Silver MacBook Pro',
    description: 'Lost MacBook Pro 14" with stickers on the lid. Last seen in computer lab.',
    category: 'Electronics',
    location: 'Computer Lab, Room 301',
    date: '2025-12-19',
    contactInfo: 'alice@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    imageLabels: ['laptop', 'computer', 'macbook', 'apple', 'electronics', 'silver'],
    userId: 'demo-user-3',
    userEmail: 'alice@example.com',
    userName: 'Alice Johnson',
    createdAt: new Date('2025-12-19T16:45:00'),
    updatedAt: new Date('2025-12-19T16:45:00'),
  },
  {
    type: 'found',
    status: 'found',
    title: 'iPhone 14 Pro',
    description: 'Found an iPhone with a blue case near the parking lot. Screen locked.',
    category: 'Electronics',
    location: 'Parking Lot B',
    date: '2025-12-22',
    contactInfo: 'bob@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800',
    imageLabels: ['phone', 'iphone', 'mobile', 'smartphone', 'electronics', 'blue'],
    userId: 'demo-user-4',
    userEmail: 'bob@example.com',
    userName: 'Bob Smith',
    createdAt: new Date('2025-12-22T09:20:00'),
    updatedAt: new Date('2025-12-22T09:20:00'),
  },
  {
    type: 'lost',
    status: 'lost',
    title: 'Set of Car Keys',
    description: 'Toyota car keys with a red keychain. Lost somewhere in the main building.',
    category: 'Keys',
    location: 'Main Building',
    date: '2025-12-23',
    contactInfo: 'sarah@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=800',
    imageLabels: ['keys', 'car keys', 'keychain', 'metal', 'red'],
    userId: 'demo-user-5',
    userEmail: 'sarah@example.com',
    userName: 'Sarah Williams',
    createdAt: new Date('2025-12-23T11:00:00'),
    updatedAt: new Date('2025-12-23T11:00:00'),
  },
  {
    type: 'found',
    status: 'found',
    title: 'Blue Backpack',
    description: 'Found a blue JanSport backpack in the gym. Contains some books and a water bottle.',
    category: 'Bags & Wallets',
    location: 'Sports Complex Gym',
    date: '2025-12-21',
    contactInfo: 'mike@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
    imageLabels: ['backpack', 'bag', 'blue', 'jansport', 'school bag'],
    userId: 'demo-user-6',
    userEmail: 'mike@example.com',
    userName: 'Mike Brown',
    createdAt: new Date('2025-12-21T17:30:00'),
    updatedAt: new Date('2025-12-21T17:30:00'),
  },
  {
    type: 'lost',
    status: 'lost',
    title: 'Gold Ring',
    description: 'Lost my gold wedding ring near the swimming pool. Sentimental value.',
    category: 'Jewelry',
    location: 'Swimming Pool Area',
    date: '2025-12-18',
    contactInfo: 'emma@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800',
    imageLabels: ['ring', 'gold', 'jewelry', 'wedding band', 'gold band'],
    userId: 'demo-user-7',
    userEmail: 'emma@example.com',
    userName: 'Emma Davis',
    createdAt: new Date('2025-12-18T13:45:00'),
    updatedAt: new Date('2025-12-18T13:45:00'),
  },
  {
    type: 'found',
    status: 'found',
    title: 'Textbook - Introduction to AI',
    description: 'Found a textbook in the library. Name written inside: "Chris P."',
    category: 'Books',
    location: 'Central Library, Floor 2',
    date: '2025-12-22',
    contactInfo: 'lisa@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800',
    imageLabels: ['book', 'textbook', 'education', 'ai', 'study'],
    userId: 'demo-user-8',
    userEmail: 'lisa@example.com',
    userName: 'Lisa Taylor',
    createdAt: new Date('2025-12-22T15:10:00'),
    updatedAt: new Date('2025-12-22T15:10:00'),
  },
  {
    type: 'lost',
    status: 'lost',
    title: 'Prescription Glasses',
    description: 'Black frame prescription glasses in a brown case. Lost in lecture hall.',
    category: 'Other',
    location: 'Lecture Hall 5',
    date: '2025-12-23',
    contactInfo: 'david@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=800',
    imageLabels: ['glasses', 'eyeglasses', 'spectacles', 'black frame', 'optical'],
    userId: 'demo-user-9',
    userEmail: 'david@example.com',
    userName: 'David Martinez',
    createdAt: new Date('2025-12-23T08:20:00'),
    updatedAt: new Date('2025-12-23T08:20:00'),
  },
  {
    type: 'found',
    status: 'found',
    title: 'Student ID Card',
    description: 'Found a student ID card near the main entrance. Name: Jennifer Lee',
    category: 'Documents',
    location: 'Main Entrance',
    date: '2025-12-24',
    contactInfo: 'ryan@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1591376397716-774090886b4d?w=800',
    imageLabels: ['id card', 'identification', 'student card', 'document', 'card'],
    userId: 'demo-user-10',
    userEmail: 'ryan@example.com',
    userName: 'Ryan Anderson',
    createdAt: new Date('2025-12-24T07:45:00'),
    updatedAt: new Date('2025-12-24T07:45:00'),
  },
  {
    type: 'lost',
    status: 'lost',
    title: 'AirPods Pro',
    description: 'Lost white AirPods Pro in charging case. Name engraved on the case.',
    category: 'Electronics',
    location: 'Study Room 12',
    date: '2025-12-22',
    contactInfo: 'kelly@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=800',
    imageLabels: ['airpods', 'earbuds', 'wireless', 'apple', 'electronics', 'white'],
    userId: 'demo-user-11',
    userEmail: 'kelly@example.com',
    userName: 'Kelly Wilson',
    createdAt: new Date('2025-12-22T12:30:00'),
    updatedAt: new Date('2025-12-22T12:30:00'),
  },
  {
    type: 'found',
    status: 'found',
    title: 'Water Bottle - Hydro Flask',
    description: 'Found a purple Hydro Flask water bottle with stickers on it.',
    category: 'Other',
    location: 'Basketball Court',
    date: '2025-12-23',
    contactInfo: 'tom@example.com',
    imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800',
    imageLabels: ['water bottle', 'hydro flask', 'bottle', 'purple', 'drinkware'],
    userId: 'demo-user-12',
    userEmail: 'tom@example.com',
    userName: 'Tom Garcia',
    createdAt: new Date('2025-12-23T16:00:00'),
    updatedAt: new Date('2025-12-23T16:00:00'),
  },
]

export default function SeedDataPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleSeed = async () => {
    setLoading(true)
    setSuccess(false)
    setProgress(0)

    try {
      const itemsRef = collection(db, 'items')
      
      for (let i = 0; i < dummyItems.length; i++) {
        await addDoc(itemsRef, dummyItems[i])
        setProgress(Math.round(((i + 1) / dummyItems.length) * 100))
      }

      setSuccess(true)
      setTimeout(() => {
        router.push('/items')
      }, 2000)
    } catch (error) {
      console.error('Error seeding data:', error)
      alert('Error seeding data. Please check console.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden flex items-center justify-center py-12 px-4">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[900px] h-[900px] bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-[900px] h-[900px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-2xl w-full bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
          Seed Demo Data
        </h1>
        <p className="text-gray-400 mb-6">
          Click the button below to populate the database with {dummyItems.length} demo items for your presentation.
        </p>

        <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
          <h2 className="text-white font-semibold mb-3">Demo Data Includes:</h2>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>• 6 Lost items (Wallet, MacBook, Keys, Ring, Glasses, AirPods)</li>
            <li>• 6 Found items (Wallet, iPhone, Backpack, Textbook, ID Card, Water Bottle)</li>
            <li>• High-quality images from Unsplash</li>
            <li>• Realistic descriptions and locations</li>
            <li>• AI-generated labels for matching</li>
          </ul>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/50 rounded-xl flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            <span className="text-emerald-400 font-medium">
              Successfully added {dummyItems.length} items! Redirecting...
            </span>
          </div>
        )}

        {loading && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Adding items...</span>
              <span className="text-cyan-400 font-semibold">{progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <button
          onClick={handleSeed}
          disabled={loading || success}
          className="w-full py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Seeding Data...
            </>
          ) : success ? (
            <>
              <CheckCircle className="h-5 w-5" />
              Data Seeded Successfully
            </>
          ) : (
            'Seed Demo Data'
          )}
        </button>

        <button
          onClick={() => router.push('/items')}
          className="mt-4 w-full py-2.5 bg-gray-700 text-gray-300 font-semibold rounded-xl hover:bg-gray-600 transition-all duration-300"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
