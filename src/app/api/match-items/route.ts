import { NextRequest, NextResponse } from 'next/server'

// Simple matching algorithm based on labels and descriptions
function calculateMatchScore(
  item1Labels: string[],
  item2Labels: string[],
  item1Desc: string,
  item2Desc: string
): number {
  let score = 0

  // Label matching (70% weight)
  const labels1 = item1Labels.map(l => l.toLowerCase())
  const labels2 = item2Labels.map(l => l.toLowerCase())
  
  const commonLabels = labels1.filter(label => labels2.includes(label))
  const labelScore = (commonLabels.length / Math.max(labels1.length, labels2.length, 1)) * 70

  // Description keyword matching (30% weight)
  const words1 = item1Desc.toLowerCase().split(/\s+/)
  const words2 = item2Desc.toLowerCase().split(/\s+/)
  
  const commonWords = words1.filter(word => 
    word.length > 3 && words2.includes(word)
  )
  const descScore = (commonWords.length / Math.max(words1.length, words2.length, 1)) * 30

  score = labelScore + descScore

  return Math.min(Math.round(score), 100)
}

export async function POST(request: NextRequest) {
  try {
    const { lostItems, foundItems } = await request.json()

    const matches: any[] = []

    // Compare each lost item with each found item
    for (const lostItem of lostItems) {
      for (const foundItem of foundItems) {
        const score = calculateMatchScore(
          lostItem.imageLabels || [],
          foundItem.imageLabels || [],
          lostItem.description || '',
          foundItem.description || ''
        )

        if (score >= 30) { // Minimum threshold of 30%
          matches.push({
            lostItemId: lostItem.id,
            foundItemId: foundItem.id,
            score,
            lostItem,
            foundItem,
          })
        }
      }
    }

    // Sort by score descending
    matches.sort((a, b) => b.score - a.score)

    return NextResponse.json({ matches })
  } catch (error: any) {
    console.error('Error matching items:', error)
    return NextResponse.json(
      { error: 'Failed to match items', details: error.message },
      { status: 500 }
    )
  }
}
