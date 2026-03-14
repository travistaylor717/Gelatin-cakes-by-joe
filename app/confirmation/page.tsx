"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { supabase, Order, OrderItem, Product } from '@/lib/supabase'
import { CircleCheck as CheckCircle, Chrome as Home, ShoppingBag, Clock, MapPin, Mail, Phone } from 'lucide-react'

type OrderWithItems = Order & {
  items: (OrderItem & { product: Product })[]
}

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId')
  const [order, setOrder] = useState<OrderWithItems | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (orderId) {
      fetchOrder()
    }
  }, [orderId])

  const fetchOrder = async () => {
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .maybeSingle()

    if (orderError || !orderData) {
      setLoading(false)
      return
    }

    const { data: itemsData, error: itemsError } = await supabase
      .from('order_items')
      .select('*, product:products(*)')
      .eq('order_id', orderId)

    if (itemsError) {
      setLoading(false)
      return
    }

    setOrder({
      ...orderData,
      items: itemsData as any,
    } as OrderWithItems)
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
        <div className="container mx-auto px-4 py-20">
          <Card className="max-w-2xl mx-auto border-2 border-gray-200 shadow-xl">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Order Not Found
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                We couldn't find your order. Please check your email for confirmation.
              </p>
              <Link href="/shop">
                <Button size="lg" className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 hover:from-pink-600 hover:via-orange-500 hover:to-yellow-500 text-white font-bold text-lg px-8 py-6">
                  Continue Shopping
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
      <section className="bg-gradient-to-r from-green-500 via-green-400 to-green-300 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <CheckCircle className="w-20 h-20 text-white mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Order Confirmed!
            </h1>
            <p className="text-xl text-green-50">
              Thank you for your order! We'll be in touch soon.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="border-2 border-green-200 shadow-xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Order #{order.id.slice(0, 8).toUpperCase()}
                  </h2>
                  <p className="text-gray-600">
                    Placed on {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold">
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-800 flex items-center mb-2">
                      <Mail className="w-4 h-4 mr-2 text-pink-500" />
                      Contact Information
                    </h3>
                    <p className="text-gray-600">{order.customer_name}</p>
                    <p className="text-gray-600">{order.customer_email}</p>
                    <p className="text-gray-600">{order.customer_phone}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-800 flex items-center mb-2">
                      <Clock className="w-4 h-4 mr-2 text-orange-500" />
                      Pickup Details
                    </h3>
                    <p className="text-gray-600">
                      {new Date(order.pickup_date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-gray-600">{order.pickup_time}</p>
                  </div>
                </div>
              </div>

              {order.notes && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h3 className="font-bold text-gray-800 mb-2">Special Instructions</h3>
                  <p className="text-gray-600">{order.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-2 border-pink-200 shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order Items</h2>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 pb-4 border-b border-gray-200 last:border-0">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{item.product.name}</h3>
                      <p className="text-gray-600">
                        Quantity: {item.quantity} × ${item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="font-bold text-gray-800">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}

                <div className="pt-4 border-t-2 border-gray-300">
                  <div className="flex justify-between text-2xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-pink-600">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-200 shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">What's Next?</h2>
              <div className="space-y-3 text-gray-700">
                <p className="flex items-start">
                  <span className="mr-2">1.</span>
                  <span>You'll receive a confirmation email shortly at <strong>{order.customer_email}</strong></span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">2.</span>
                  <span>We'll contact you within 24 hours to confirm your order and arrange payment</span>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">3.</span>
                  <span>Pick up your order at our location on your scheduled date and time</span>
                </p>
              </div>

              <div className="mt-6 p-4 bg-pink-50 border border-pink-200 rounded-lg">
                <h3 className="font-bold text-gray-800 flex items-center mb-2">
                  <MapPin className="w-4 h-4 mr-2 text-pink-500" />
                  Pickup Location
                </h3>
                <p className="text-gray-600">
                  123 Sweet Street<br />
                  Los Angeles, CA 90001<br />
                  (555) 123-4567
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 via-orange-400 to-yellow-400 hover:from-pink-600 hover:via-orange-500 hover:to-yellow-500 text-white font-bold px-8">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
            <Link href="/shop">
              <Button size="lg" variant="outline" className="border-2 border-pink-300 text-pink-600 hover:bg-pink-50 font-bold px-8">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
