"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/contexts/LanguageContext'
import { Product } from '@/lib/supabase'

export function ShopClient({ products }: { products: Product[] }) {
  const { t } = useLanguage()
  const categories = Array.from(new Set(products.map(p => p.category)))

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <section className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {t.shop.title}
            </h1>
            <p className="text-xl text-yellow-50">
              {t.shop.subtitle}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 mb-8 justify-center">
            <Badge className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-4 py-2 text-sm font-semibold">
              All Products ({products.length})
            </Badge>
            {categories.map(category => {
              const count = products.filter(p => p.category === category).length
              return (
                <Badge
                  key={category}
                  variant="outline"
                  className="border-2 border-pink-300 text-pink-700 px-4 py-2 text-sm font-semibold hover:bg-pink-50"
                >
                  {category} ({count})
                </Badge>
              )
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {products.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <Card className="overflow-hidden border-2 border-gray-200 hover:border-pink-400 transition-all hover:shadow-2xl group h-full">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white px-3 py-1 rounded-full font-bold text-lg shadow-lg">
                      ${product.price}
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-white text-pink-600 font-semibold">
                        {product.category}
                      </Badge>
                    </div>
                    {!product.in_stock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold text-lg">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {product.description}
                    </p>
                    <Button
                      className="w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white font-bold"
                      disabled={!product.in_stock}
                    >
                      {product.in_stock ? t.shop.viewDetails : 'Out of Stock'}
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-600">{t.shop.noCakes}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
