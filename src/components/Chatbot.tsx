'use client'

import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader2, Bot, User } from 'lucide-react'
import axios from 'axios'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm your Lost & Found AI assistant. I can help you navigate the portal, report items, or answer questions about how our AI matching works. How can I help you today?"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || loading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post('/api/chat', {
        messages: [...messages, userMessage].map(m => ({
          role: m.role,
          content: m.content
        }))
      })

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.message
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Chat error:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again later or contact support if the issue persists."
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-full shadow-2xl hover:shadow-cyan-500/50 hover:scale-110 transition-all duration-300 group"
          aria-label="Open chat"
        >
          <MessageCircle className="h-6 w-6 group-hover:animate-bounce" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="h-8 w-8 text-white" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-cyan-600"></div>
              </div>
              <div>
                <h3 className="text-white font-bold">Lost & Found AI</h3>
                <p className="text-cyan-100 text-xs">Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600'
                      : 'bg-gray-700'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-cyan-400" />
                  )}
                </div>
                <div
                  className={`flex-1 px-4 py-3 rounded-2xl ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none'
                      : 'bg-gray-800 border border-gray-700 text-gray-100 rounded-tl-none'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {message.content}
                  </p>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-cyan-400" />
                </div>
                <div className="flex-1 px-4 py-3 rounded-2xl rounded-tl-none bg-gray-800 border border-gray-700">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-gray-800 border-t border-gray-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                disabled={loading}
                className="flex-1 px-4 py-2.5 bg-gray-900 border border-gray-700 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed placeholder-gray-500"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-cyan-600 disabled:hover:to-blue-600 flex items-center justify-center min-w-[44px]"
                aria-label="Send message"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Powered by Grok AI
            </p>
          </div>
        </div>
      )}
    </>
  )
}
