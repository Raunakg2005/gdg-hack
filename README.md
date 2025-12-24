# Lost & Found Portal - AI-Powered Item Matching System

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-10.7-orange?style=for-the-badge&logo=firebase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)

**A cutting-edge web application that leverages Google's AI technology to reunite people with their lost belongings**

[Features](#features) • [Technology Stack](#technology-stack) • [Architecture](#architecture) • [API Documentation](#api-documentation)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

The **Lost & Found Portal** is an intelligent web platform designed to help people recover lost items through advanced AI-powered image recognition and matching. Built with modern web technologies and powered by Google Cloud's AI services, the platform provides an intuitive interface for reporting, searching, and matching lost and found items in real-time.

### Key Highlights

- **AI-Powered Matching**: Utilizes Google Cloud Vision API for intelligent image analysis
- **Real-time Synchronization**: Firebase Firestore ensures instant data updates
- **Smart Categorization**: Automatic item classification and tagging
- **AI Assistant**: Google Gemini-powered chatbot for user support
- **Secure Authentication**: Firebase Authentication with email/password
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX**: Glassmorphism effects, smooth animations, and intuitive navigation

---

## Features

### For Users

#### Report Lost Items
- Upload high-quality images of lost belongings
- Provide detailed descriptions, location, and date information
- Automatic AI analysis detects visual features (colors, objects, patterns)
- Receive instant notifications when potential matches are found

#### Report Found Items
- Submit photos of items you've found
- Help reunite items with their rightful owners
- Track your contributions to the community

#### Browse & Search
- Filter items by type (Lost/Found)
- Search by category (Electronics, Bags, Keys, Documents, etc.)
- View detailed item information with full-size images
- Contact item owners directly via email

#### AI Assistant
- 24/7 support powered by Google Gemini
- Get help with reporting items
- Learn about AI matching technology
- Receive tips for better item descriptions

### For Administrators

#### Admin Panel
- Comprehensive dashboard with statistics
- Moderate and manage all items
- User management and oversight
- Delete inappropriate content
- Monitor platform activity

#### Analytics Dashboard
- Track items reunited
- Monitor AI match accuracy
- View active users and engagement metrics
- Real-time data synchronization

---

## Technology Stack

### Frontend
- **Next.js 14.0.4** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Lucide React** - Icon library
- **date-fns** - Date utility library

### Backend & Cloud Services
- **Firebase Authentication** - Secure user authentication
- **Firebase Firestore** - NoSQL real-time database
- **Google Cloud Vision API** - Image analysis and object detection
- **Google Gemini API** - Conversational AI for chatbot
- **Cloud Storage** - Secure image storage and delivery

### Development Tools
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

---

## Architecture

```
lost-found-portal/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── analyze-image/ # Vision API integration
│   │   │   ├── chat/          # Gemini chatbot
│   │   │   └── match-items/   # AI matching algorithm
│   │   ├── auth/              # Authentication pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── items/             # Item management
│   │   │   ├── [id]/          # Item details
│   │   │   ├── report-lost/
│   │   │   └── report-found/
│   │   ├── admin/             # Admin panel
│   │   │   ├── seed/          # Demo data seeder
│   │   │   └── users/         # User management
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── Chatbot.tsx        # AI assistant
│   │   ├── ItemCard.tsx       # Item display card
│   │   └── ImageUpload.tsx    # Image upload widget
│   ├── lib/                   # Utility libraries
│   │   ├── firebase.ts        # Firebase configuration
│   │   └── cloudinary.ts      # Image upload helper
│   └── types/                 # TypeScript definitions
├── public/                    # Static assets
├── service-account-key.json   # Google Cloud credentials
└── next.config.js            # Next.js configuration
```

---

## API Documentation

### Vision API Integration

**Endpoint**: `/api/analyze-image`

**Method**: `POST`

**Request Body**:
```json
{
  "imageUrl": "https://example.com/image.jpg"
}
```

**Response**:
```json
{
  "labels": [
    { "description": "wallet", "score": 0.95 },
    { "description": "leather", "score": 0.89 },
    { "description": "black", "score": 0.87 }
  ]
}
```

### AI Chatbot

**Endpoint**: `/api/chat`

**Method**: `POST`

**Request Body**:
```json
{
  "messages": [
    { "role": "user", "content": "How do I report a lost item?" }
  ]
}
```

**Response**:
```json
{
  "message": "To report a lost item, click the 'Report Lost' button..."
}
```

### Item Matching

**Endpoint**: `/api/match-items`

**Method**: `POST`

**Request Body**:
```json
{
  "lostItems": [...],
  "foundItems": [...]
}
```

**Response**:
```json
{
  "matches": [
    {
      "lostItemId": "...",
      "foundItemId": "...",
      "matchScore": 85
    }
  ]
}
```

---

## Deployment

### Deploy to Vercel

1. Connect your repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on each commit

### Deploy to Google Cloud Run

```bash
docker build -t lost-found-portal .
docker tag lost-found-portal gcr.io/PROJECT_ID/lost-found-portal
docker push gcr.io/PROJECT_ID/lost-found-portal
gcloud run deploy lost-found-portal \
  --image gcr.io/PROJECT_ID/lost-found-portal \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

## Security Best Practices

- Environment variables for sensitive data
- Firebase Security Rules for database access control
- HTTPS-only communication
- Input validation and sanitization
- Rate limiting on API routes
- Secure service account credentials

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add comments for complex logic
- Test before submitting PR

---

## Roadmap

- Mobile app (React Native)
- Push notifications
- Multi-language support
- QR code generation for items
- Integration with campus security systems
- Advanced analytics dashboard
- Machine learning model improvements
- Social media integration

---

<div align="center">

**Made with Google Cloud Technology**

[Report Bug](https://github.com/Raunakg2005/lost-found-portal/issues) • [Request Feature](https://github.com/yourusername/lost-found-portal/issues)

</div>
