"use client"

import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/contexts/LanguageContext'
import { Heart, Award, PartyPopper, MapPin, Shield } from 'lucide-react'

export function AboutClient() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <section className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              {t.about.title}
            </h1>
            <p className="text-xl text-yellow-50">
              {t.about.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-pink-200 shadow-xl mb-12">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center justify-center mb-6">
                  <img
                    src="/Joe_logo.jpg"
                    alt="Delicious Gelatin Cakes by Joe"
                    className="h-24 w-auto"
                  />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
                  {t.about.story.title}
                </h2>
                <div className="space-y-4 text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {t.about.story.content}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <Card className="border-2 border-orange-200 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {t.about.mission.title}
                  </h3>
                  <p className="text-gray-600">
                    {t.about.mission.content}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-yellow-200 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {t.about.quality.title}
                  </h3>
                  <p className="text-gray-600">
                    {t.about.quality.content}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-pink-200 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PartyPopper className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {t.about.custom.title}
                  </h3>
                  <p className="text-gray-600">
                    {t.about.custom.content}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2 border-orange-200 shadow-lg md:col-span-2">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">
                    {t.footer.contact}
                  </h3>
                  <div className="text-gray-600 space-y-2">
                    <p className="font-semibold text-lg">Buffalo & Western New York</p>
                    <p className="text-lg">+1 716-982-2951</p>
                    <p className="text-lg">deliousgelatincakesbyjoe@yahoo.com</p>
                    <p className="mt-3">Custom orders for all occasions</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
