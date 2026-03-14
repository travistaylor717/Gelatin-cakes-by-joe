"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useCart } from '@/contexts/CartContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from 'lucide-react'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart()
  const { t } = useLanguage()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        <section className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {t.cart.title}
              </h1>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-2xl mx-auto border-2 border-gray-200 shadow-xl">
            <CardContent className="p-12 text-center">
              <ShoppingCart className="w-24 h-24 mx-auto mb-6 text-gray-300" />
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {t.cart.empty}
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                {t.cart.emptyDesc}
              </p>
              <Link href="/shop">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 hover:from-pink-600 hover:via-orange-500 hover:to-yellow-500 text-white font-bold text-lg px-8 py-6">
                  {t.cart.startShopping}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <section className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {t.cart.title}
            </h1>
            <p className="text-xl text-yellow-50">
              {totalItems} {totalItems === 1 ? t.cart.item : t.cart.items} {t.cart.inYourCart}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.product.id} className="border-2 border-gray-200 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="w-full sm:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={item.product.image_url}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-800 mb-1">
                              {item.product.name}
                            </h3>
                            <p className="text-gray-600">
                              ${item.product.price.toFixed(2)} {t.cart.each}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.product.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border-2 border-pink-300 rounded-lg overflow-hidden">
                            <Button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="bg-white hover:bg-pink-50 text-pink-600 border-none rounded-none px-3"
                            >
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="px-4 py-1 text-lg font-bold text-gray-800 bg-white">
                              {item.quantity}
                            </span>
                            <Button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="bg-white hover:bg-pink-50 text-pink-600 border-none rounded-none px-3"
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="text-2xl font-bold text-pink-600">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-2 border-pink-200 shadow-xl sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {t.cart.orderSummary}
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>{t.cart.subtotal} ({totalItems} {totalItems === 1 ? t.cart.item : t.cart.items})</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>{t.cart.delivery}</span>
                    <span className="font-semibold text-green-600">{t.cart.pickupOnly}</span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>{t.cart.total}</span>
                      <span className="text-pink-600">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link href="/checkout">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 hover:from-pink-600 hover:via-orange-500 hover:to-yellow-500 text-white font-bold text-lg py-6 shadow-lg"
                  >
                    {t.cart.proceedToCheckout}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>

                <Link href="/shop">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full mt-3 border-2 border-pink-300 text-pink-600 hover:bg-pink-50 font-semibold"
                  >
                    {t.cart.continueShopping}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
