"use client"

import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export function Footer() {
  const { t } = useLanguage()
  return (
    <footer className="bg-gradient-to-r from-pink-600 via-orange-500 to-yellow-500 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img
              src="/Joe_logo.jpg"
              alt="Delicious Gelatin Cakes by Joe"
              className="h-24 w-auto mb-4"
            />
            <p className="text-yellow-50">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="text-yellow-50 hover:text-white transition-colors">
                  {t.nav.shop}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-yellow-50 hover:text-white transition-colors">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-yellow-50 hover:text-white transition-colors">
                  {t.nav.cart}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4">{t.footer.contact}</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5" />
                <span className="text-yellow-50">+1 716-982-2951</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5" />
                <span className="text-yellow-50">deliousgelatincakesbyjoe@yahoo.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span className="text-yellow-50">Buffalo & Western New York</span>
              </li>
              <li className="flex items-center space-x-2">
                <Facebook className="w-5 h-5" />
                <a
                  href="https://www.facebook.com/profile.php?id=61571596236109"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-50 hover:text-white transition-colors"
                >
                  Delicious Gelatin Cakes -By Joe
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-yellow-300 mt-8 pt-8 text-center text-yellow-50">
          <p>&copy; 2026 Delicious Gelatin Cakes by Joe. {t.footer.allRights}</p>
        </div>
      </div>
    </footer>
  )
}
