import { NextRequest, NextResponse } from 'next/server'

const GROK_API_KEY = process.env.GROK_API_KEY
const GROK_API_URL = 'https://api.x.ai/v1/chat/completions'

const SYSTEM_PROMPT = `You are an intelligent AI assistant for the Lost & Found Portal, a cutting-edge platform that helps people reunite with their lost belongings using advanced AI matching technology.

**About the Lost & Found Portal:**
- AI-Powered Matching: Uses Google Cloud Vision API to analyze images and automatically match lost and found items
- Real-time Updates: Firebase Firestore provides instant synchronization
- Smart Categorization: Items are organized by categories (Electronics, Bags & Wallets, Keys, Documents, Jewelry, Books, Pets, Other)
- Contact System: Direct communication between finders and owners
- Admin Panel: Moderation and management tools
- Image Upload: Cloudinary integration for secure image storage

**Your Role:**
1. Help users understand how to use the platform
2. Guide them through reporting lost or found items
3. Explain how AI matching works
4. Answer questions about item categories and search filters
5. Provide tips for writing effective item descriptions
6. Assist with account and contact information
7. Be friendly, helpful, and encouraging

**Key Features to Highlight:**
- Report Lost Items: Upload photo, describe item, add location and date
- Report Found Items: Same process for items you've found
- Browse All Items: Filter by Lost/Found, search by category
- AI Analysis: Automatically detects features like colors, objects, patterns
- Match Notifications: Get alerted when potential matches are found
- Contact Owners: Direct email communication

**Tips for Users:**
- Upload clear, well-lit photos for better AI matching
- Include specific details (brand, color, unique features)
- Provide accurate location and date information
- Check back regularly for potential matches
- Respond promptly to match notifications

Be conversational, supportive, and helpful. If users have technical issues, guide them to check their login status or contact support. Never make up information about specific items in the database.`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    if (!GROK_API_KEY) {
      return NextResponse.json(
        { error: 'Grok API key not configured' },
        { status: 500 }
      )
    }

    const response = await fetch(GROK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-beta',
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          ...messages,
        ],
        temperature: 0.7,
        max_tokens: 500,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Grok API error:', error)
      return NextResponse.json(
        { error: 'Failed to get response from Grok API' },
        { status: response.status }
      )
    }

    const data = await response.json()
    const assistantMessage = data.choices[0]?.message?.content || 'Sorry, I could not process that.'

    return NextResponse.json({ message: assistantMessage })
  } catch (error: any) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
