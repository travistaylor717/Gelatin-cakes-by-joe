"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/supabase'
import { useCart } from '@/contexts/CartContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { useToast } from '@/hooks/use-toast'
import { ShoppingCart, Minus, Plus, ArrowLeft, Check } from 'lucide-react'

interface ProductClientProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductClient({ product, relatedProducts }: ProductClientProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()
  const { t } = useLanguage()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addItem(product, quantity)
    toast({
      title: t.product.itemAdded,
      description: `${quantity} x ${product.name}`,
    })
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <Link href="/shop">
          <Button variant="ghost" className="mb-6 text-pink-600 hover:text-pink-700 hover:bg-pink-50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.product.backToShop}
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="mb-4">
              <Badge className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-3 py-1 text-sm font-semibold">
                {product.category}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>

            <div className="text-4xl font-bold text-pink-600 mb-6">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            {product.ingredients && (
              <div className="mb-8 p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
                <h3 className="font-bold text-gray-800 mb-2 text-lg">Ingredients</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {product.ingredients}
                </p>
              </div>
            )}

            {product.in_stock ? (
              <>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-lg font-semibold text-gray-700">{t.product.quantity}:</span>
                  <div className="flex items-center border-2 border-pink-300 rounded-lg overflow-hidden">
                    <Button
                      onClick={decreaseQuantity}
                      className="bg-white hover:bg-pink-50 text-pink-600 border-none rounded-none px-4"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-6 py-2 text-lg font-bold text-gray-800 bg-white">
                      {quantity}
                    </span>
                    <Button
                      onClick={increaseQuantity}
                      className="bg-white hover:bg-pink-50 text-pink-600 border-none rounded-none px-4"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className="w-full bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 hover:from-pink-600 hover:via-orange-500 hover:to-yellow-500 text-white font-bold text-lg py-6 shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {t.product.addToCart} - ${(product.price * quantity).toFixed(2)}
                </Button>

                <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                  <div className="flex items-center text-green-700">
                    <Check className="w-5 h-5 mr-2" />
                    <span className="font-semibold">In Stock - Ready for Pickup</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6 bg-red-50 border-2 border-red-200 rounded-lg">
                <p className="text-red-700 font-semibold text-lg text-center">
                  Currently Out of Stock
                </p>
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
              More from {product.category}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedProducts.map((relatedProduct) => (
                <Link href={`/product/${relatedProduct.id}`} key={relatedProduct.id}>
                  <Card className="overflow-hidden border-2 border-gray-200 hover:border-pink-400 transition-all hover:shadow-2xl group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={relatedProduct.image_url}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-orange-400 text-white px-3 py-1 rounded-full font-bold">
                        ${relatedProduct.price}
                      </div>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <Button className="w-full bg-gradient-to-r from-pink-500 to-orange-400 hover:from-pink-600 hover:to-orange-500 text-white font-bold">
                        {t.shop.viewDetails}
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
