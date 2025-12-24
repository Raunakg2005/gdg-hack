'use client'

import Image from 'next/image'
import { Calendar, MapPin, User } from 'lucide-react'
import { Item } from '@/types'
import { format } from 'date-fns'

interface ItemCardProps {
  item: Item
  onClick?: () => void
}

export default function ItemCard({ item, onClick }: ItemCardProps) {
  const isLost = item.type === 'lost'

  return (
    <div
      onClick={onClick}
      className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-300 cursor-pointer hover:transform hover:scale-105 hover:border-primary-500/50"
    >
      {item.imageUrl && (
        <div className="relative h-48 w-full bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent group-hover:from-primary-400 group-hover:to-blue-400 transition-all duration-300">{item.title}</h3>
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              isLost
                ? 'bg-red-100 text-red-800'
                : 'bg-green-100 text-green-800'
            }`}
          >
            {isLost ? 'Lost' : 'Found'}
          </span>
        </div>

        <p className="text-sm text-gray-300 mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="space-y-1 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{item.location}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(item.date), 'MMM dd, yyyy')}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>{item.userName}</span>
          </div>
        </div>

        {item.imageLabels && item.imageLabels.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {item.imageLabels.slice(0, 3).map((label, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
              >
                {label}
              </span>
            ))}
          </div>
        )}

        {item.matchScore !== undefined && (
          <div className="mt-3 pt-3 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-300">
                Match Score
              </span>
              <span className="text-lg font-bold text-primary-600">
                {item.matchScore}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
