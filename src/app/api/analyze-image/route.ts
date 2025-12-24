import { NextRequest, NextResponse } from 'next/server'
import { ImageAnnotatorClient } from '@google-cloud/vision'

// Initialize Vision API client with service account
const getVisionClient = () => {
  const credentials = process.env.GOOGLE_APPLICATION_CREDENTIALS

  if (!credentials) {
    throw new Error('GOOGLE_APPLICATION_CREDENTIALS not configured')
  }

  return new ImageAnnotatorClient({
    keyFilename: credentials,
  })
}

export async function POST(request: NextRequest) {
  try {
    const { imageUrl } = await request.json()

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Image URL is required' },
        { status: 400 }
      )
    }

    const client = getVisionClient()

    // Call Google Cloud Vision API using service account
    const [result] = await client.annotateImage({
      image: {
        source: {
          imageUri: imageUrl,
        },
      },
      features: [
        { type: 'LABEL_DETECTION', maxResults: 10 },
        { type: 'OBJECT_LOCALIZATION', maxResults: 10 },
        { type: 'IMAGE_PROPERTIES' },
        { type: 'TEXT_DETECTION' },
      ],
    })

    // Extract labels
    const labels = result.labelAnnotations?.map((label) => ({
      description: label.description || '',
      score: label.score || 0,
    })) || []

    // Extract objects
    const objects = result.localizedObjectAnnotations?.map((obj) => ({
      name: obj.name || '',
      score: obj.score || 0,
    })) || []

    // Extract dominant colors
    const colors = result.imagePropertiesAnnotation?.dominantColors?.colors?.map(
      (color) => ({
        rgb: color.color,
        score: color.score || 0,
        pixelFraction: color.pixelFraction || 0,
      })
    ) || []

    // Extract text
    const text = result.textAnnotations?.[0]?.description || ''

    return NextResponse.json({
      labels,
      objects,
      colors,
      text,
    })
  } catch (error: any) {
    console.error('Error analyzing image:', error)
    return NextResponse.json(
      { error: 'Failed to analyze image', details: error.message },
      { status: 500 }
    )
  }
}
