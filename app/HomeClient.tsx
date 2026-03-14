"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Star, Clock, MapPin } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'
import { Product } from '@/lib/supabase'

export function HomeClient({ featuredProducts }: { featuredProducts: Product[] }) {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-pink-500 via-orange-400 to-yellow-400 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg leading-tight">
              {t.home.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-yellow-50 mb-8 max-w-2xl mx-auto">
              {t.home.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop">
                <Button size="lg" className="bg-white text-pink-500 hover:bg-yellow-50 font-bold text-lg px-8 py-6 shadow-xl">
                  {t.home.hero.shopNow}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-pink-500 font-bold text-lg px-8 py-6 shadow-xl">
                  {t.home.hero.learnMore}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-pink-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t.home.about.quality}</h3>
                <p className="text-gray-600">
                  {t.home.about.qualityDesc}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t.home.about.handcrafted}</h3>
                <p className="text-gray-600">
                  {t.home.about.handcraftedDesc}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-yellow-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="pt-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{t.home.about.custom}</h3>
                <p className="text-gray-600">
                  {t.home.about.customDesc}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {t.home.featured.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.home.featured.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredProducts.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <Card className="overflow-hidden border-2 border-gray-200 hover:border-pink-400 transition-all hover:shadow-2xl group">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white px-3 py-1 rounded-full font-bold">
                      ${product.price}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">
                      {product.description}
                    </p>
                    <Button className="w-full mt-4 bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white font-bold">
                      {t.shop.viewDetails}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/shop">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 hover:from-pink-600 hover:via-orange-500 hover:to-yellow-500 text-white font-bold text-lg px-8 py-6 shadow-lg">
                {t.home.cta.button}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t.home.cta.title}
          </h2>
          <p className="text-xl text-yellow-50 mb-8 max-w-2xl mx-auto">
            {t.home.cta.subtitle}
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-white text-pink-500 hover:bg-yellow-50 font-bold text-lg px-8 py-6 shadow-xl">
              {t.home.hero.shopNow}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
