import { supabase, Product } from '@/lib/supabase'
import { HomeClient } from './HomeClient'

async function getFeaturedProducts() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('in_stock', true)
    .limit(3)

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data as Product[]
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts()

  return <HomeClient featuredProducts={featuredProducts} />
}
