"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import en from '@/locales/en.json'
import es from '@/locales/es.json'

type Language = 'en' | 'es'

type Translations = typeof en

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
}

const translations: Record<Language, Translations> = {
  en,
  es
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'en'

  const browserLang = navigator.language || (navigator as any).userLanguage

  if (browserLang.toLowerCase().startsWith('es')) {
    return 'es'
  }

  return 'en'
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language | null
    const detectedLang = detectBrowserLanguage()
    const finalLang = savedLang || detectedLang

    setLanguage(finalLang)
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('language', language)
      document.documentElement.lang = language
    }
  }, [language, isLoaded])

  const contextValue: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language]
  }

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
