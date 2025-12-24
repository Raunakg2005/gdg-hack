'use client'

import { useState, useRef } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
  onImageSelect: (file: File, previewUrl: string) => void
  currentImage?: string
  onRemove?: () => void
}

export default function ImageUpload({
  onImageSelect,
  currentImage,
  onRemove,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreview(result)
        onImageSelect(file, result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file) handleFileChange(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleRemove = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    if (onRemove) onRemove()
  }

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFileChange(file)
        }}
        className="hidden"
        id="image-upload"
      />

      {preview ? (
        <div className="relative group">
          <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-gray-900 border border-gray-700">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <button
            onClick={handleRemove}
            className="absolute top-2 right-2 p-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-700 hover:to-red-800 transition-all transform hover:scale-110 shadow-lg"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <label
          htmlFor="image-upload"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden ${
            isDragging
              ? 'border-primary-400 bg-gray-700/50 backdrop-blur-sm'
              : 'border-gray-600 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/50 hover:border-primary-500/50'
          }`}
        >
          {isDragging && (
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 to-blue-500/20 animate-pulse"></div>
          )}
          <div className="relative flex flex-col items-center justify-center pt-5 pb-6 z-10">
            <Upload className={`h-12 w-12 mb-4 transition-all duration-300 ${isDragging ? 'text-primary-400 animate-bounce' : 'text-gray-500'}`} />
            <p className="mb-2 text-sm text-gray-300">
              <span className="font-semibold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
          </div>
        </label>
      )}
    </div>
  )
}
