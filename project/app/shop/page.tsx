import { supabase, Product } from '@/lib/supabase'
import { ShopClient } from './ShopClient'

async function getAllProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data as Product[]
}

export default async function ShopPage() {
  const products = await getAllProducts()

  return <ShopClient products={products} />
}
