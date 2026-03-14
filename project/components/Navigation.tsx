"use client"

import Link from 'next/link'
import { ShoppingCart, Menu, X, Globe } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Navigation() {
  const { totalItems } = useCart()
  const { language, setLanguage, t } = useLanguage()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/shop', label: t.nav.shop },
    { href: '/about', label: t.nav.about },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24 md:h-28">
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/Joe_logo.jpg"
              alt="Delicious Gelatin Cakes by Joe"
              className="h-20 md:h-24 w-auto"
            />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white font-semibold hover:text-yellow-100 transition-colors text-lg"
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="text-white hover:text-yellow-100 hover:bg-white/10"
            >
              <Globe className="w-4 h-4 mr-1" />
              {language === 'en' ? 'ES' : 'EN'}
            </Button>
            <Link href="/cart">
              <Button className="bg-white text-pink-500 hover:bg-yellow-50 font-bold relative">
                <ShoppingCart className="w-5 h-5 mr-2" />
                {t.nav.cart}
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-white font-semibold hover:text-yellow-100 transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              variant="ghost"
              onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
              className="text-white hover:text-yellow-100 hover:bg-white/10 w-full justify-start"
            >
              <Globe className="w-4 h-4 mr-2" />
              {language === 'en' ? 'Español' : 'English'}
            </Button>
            <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
              <Button className="bg-white text-pink-500 hover:bg-yellow-50 font-bold w-full relative">
                <ShoppingCart className="w-5 h-5 mr-2" />
                {t.nav.cart}
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
