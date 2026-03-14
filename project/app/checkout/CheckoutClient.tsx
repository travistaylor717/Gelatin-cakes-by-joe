"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useCart } from '@/contexts/CartContext'
import { useLanguage } from '@/contexts/LanguageContext'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import { Loader as Loader2, ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function CheckoutClient() {
  const router = useRouter()
  const { items, totalPrice, totalItems, clearCart } = useCart()
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    pickupDate: '',
    pickupTime: '',
    notes: '',
  })

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        <section className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                {t.checkout.title}
              </h1>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-2xl mx-auto border-2 border-gray-200 shadow-xl">
            <CardContent className="p-12 text-center">
              <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-gray-300" />
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.pickupDate) {
      toast({
        title: t.checkout.fillRequired,
        variant: "destructive",
      })
      return
    }

    if (!formData.pickupTime) {
      toast({
        title: t.checkout.selectPickupTime,
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      const orderItems = items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }))

      const { data: order, error } = await supabase
        .from('orders')
        .insert({
          customer_name: formData.customerName,
          customer_email: formData.customerEmail,
          customer_phone: formData.customerPhone,
          pickup_date: formData.pickupDate,
          pickup_time: formData.pickupTime,
          notes: formData.notes,
          total_amount: totalPrice,
          items: orderItems,
        })
        .select()
        .single()

      if (error) throw error

      clearCart()
      router.push(`/confirmation?orderId=${order.id}`)
    } catch (error) {
      console.error('Error placing order:', error)
      toast({
        title: "Error placing order",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const minDate = new Date().toISOString().split('T')[0]

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <section className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {t.checkout.title}
            </h1>
            <p className="text-xl text-yellow-50">
              {t.checkout.subtitle}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit}>
              <Card className="border-2 border-gray-200 shadow-lg mb-6">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {t.checkout.contactInfo}
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="customerName">{t.checkout.fullName} *</Label>
                      <Input
                        id="customerName"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-300"
                      />
                    </div>

                    <div>
                      <Label htmlFor="customerEmail">{t.checkout.email} *</Label>
                      <Input
                        id="customerEmail"
                        name="customerEmail"
                        type="email"
                        value={formData.customerEmail}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-300"
                      />
                    </div>

                    <div>
                      <Label htmlFor="customerPhone">{t.checkout.phone} *</Label>
                      <Input
                        id="customerPhone"
                        name="customerPhone"
                        type="tel"
                        value={formData.customerPhone}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-300"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-gray-200 shadow-lg mb-6">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    {t.checkout.pickupDetails}
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="pickupDate">{t.checkout.pickupDate} *</Label>
                      <Input
                        id="pickupDate"
                        name="pickupDate"
                        type="date"
                        min={minDate}
                        value={formData.pickupDate}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-300"
                      />
                    </div>

                    <div>
                      <Label htmlFor="pickupTime">{t.checkout.pickupTime} *</Label>
                      <Input
                        id="pickupTime"
                        name="pickupTime"
                        type="time"
                        value={formData.pickupTime}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-300"
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">{t.checkout.specialInstructions}</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder={t.checkout.instructionsPlaceholder}
                        className="border-2 border-gray-300"
                        rows={4}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-2 border-pink-200 shadow-xl sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {t.checkout.orderSummary}
                </h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {item.quantity}x {item.product.name}
                      </span>
                      <span className="font-semibold text-gray-800">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6 pt-4 border-t-2 border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span>{t.checkout.subtotal} ({totalItems} {totalItems === 1 ? t.checkout.item : t.checkout.items})</span>
                    <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>{t.checkout.delivery}</span>
                    <span className="font-semibold text-green-600">{t.checkout.pickupOnly}</span>
                  </div>
                  <div className="border-t-2 border-gray-200 pt-3">
                    <div className="flex justify-between text-xl font-bold text-gray-800">
                      <span>{t.checkout.total}</span>
                      <span className="text-pink-600">${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  size="lg"
                  className="w-full bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 hover:from-pink-600 hover:via-orange-500 hover:to-yellow-500 text-white font-bold text-lg py-6 shadow-lg"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      {t.checkout.processing}
                    </>
                  ) : (
                    t.checkout.placeOrder
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
