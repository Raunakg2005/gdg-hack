const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dkzm6ooyt'

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'lost_found_preset') // You'll need to create this in Cloudinary
  formData.append('cloud_name', cloudName)

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const data = await response.json()
    return data.secure_url
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error)
    throw new Error('Failed to upload image')
  }
}

export const getCloudinaryUrl = (publicId: string, transformations?: string): string => {
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`
  return transformations
    ? `${baseUrl}/${transformations}/${publicId}`
    : `${baseUrl}/${publicId}`
}
