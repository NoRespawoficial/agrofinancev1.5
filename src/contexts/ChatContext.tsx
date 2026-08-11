'use client'

import React, { createContext, useContext, useState } from 'react'

export type Message = {
  role: 'user' | 'ai'
  content: string
  time: string
  type?: 'text' | 'insight' | 'alert'
  imageUrl?: string
  showAutoload?: boolean
}

export const initialMessages: Message[] = [
  {
    role: 'ai',
    content: '¡Hola! Soy **Kapi**, tu asistente de inteligencia climática 🌱\n\nEstoy conectado a tus datos ESG y puedo ayudarte a:\n- Analizar tus emisiones Scope 1, 2 y 3\n- Generar reportes HC Perú automáticamente\n- Identificar oportunidades de reducción de carbono\n- Responder preguntas sobre tu cumplimiento ESG\n\n¿Por dónde empezamos?',
    time: 'Ahora',
    type: 'text',
  },
]

interface ChatContextType {
  isChatOpen: boolean
  openChat: () => void
  closeChat: () => void
  toggleChat: () => void
  messages: Message[]
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>
  isTyping: boolean
  setIsTyping: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isTyping, setIsTyping] = useState(false)

  const openChat = () => setIsChatOpen(true)
  const closeChat = () => setIsChatOpen(false)
  const toggleChat = () => setIsChatOpen((prev) => !prev)

  return (
    <ChatContext.Provider value={{ 
      isChatOpen, openChat, closeChat, toggleChat,
      messages, setMessages,
      isTyping, setIsTyping
    }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  const context = useContext(ChatContext)
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}
