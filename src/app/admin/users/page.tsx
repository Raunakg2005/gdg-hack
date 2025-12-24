'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { collection, getDocs } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { Package, Users, Mail, Calendar } from 'lucide-react'
import Link from 'next/link'

const ADMIN_EMAILS = ['admin@lostandfound.com', 'your-email@example.com']

interface UserData {
  id: string
  name: string
  email: string
  phone?: string
  createdAt: Date
}

export default function AdminUsersPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        const adminStatus = ADMIN_EMAILS.includes(user.email || '')
        setIsAdmin(adminStatus)
        if (!adminStatus) {
          router.push('/')
        } else {
          loadUsers()
        }
      } else {
        router.push('/auth/login')
      }
      setLoading(false)
    })
    return () => unsubscribe()
  }, [router])

  const loadUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'users'))
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      })) as UserData[]
      setUsers(usersData)
    } catch (error) {
      console.error('Error loading users:', error)
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
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Users className="h-8 w-8 text-primary-400" />
              <h1 className="text-2xl font-bold text-white">User Management</h1>
            </div>
            <div className="flex gap-4">
              <Link href="/admin" className="px-4 py-2 text-gray-300 hover:text-primary-400">
                Dashboard
              </Link>
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
        <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">All Users ({users.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">Name</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">Email</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">Phone</th>
                  <th className="text-left py-3 px-4 text-gray-300 font-semibold">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((userData) => (
                  <tr key={userData.id} className="border-b border-gray-700 hover:bg-gray-750">
                    <td className="py-3 px-4 text-white">{userData.name}</td>
                    <td className="py-3 px-4 text-gray-300">{userData.email}</td>
                    <td className="py-3 px-4 text-gray-300">{userData.phone || 'N/A'}</td>
                    <td className="py-3 px-4 text-gray-300">
                      {userData.createdAt?.toLocaleDateString()}
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
