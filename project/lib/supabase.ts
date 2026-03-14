import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Product = {
  id: string
  name: string
  description: string
  ingredients: string
  price: number
  image_url: string
  category: string
  slug: string
  in_stock: boolean
  created_at: string
}

export type Order = {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  pickup_date: string
  pickup_time: string
  total: number
  status: string
  payment_intent_id: string | null
  notes: string
  created_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price: number
  created_at: string
}
