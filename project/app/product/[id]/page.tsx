import { supabase, Product } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { ProductClient } from './ProductClient'

async function getProduct(id: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error || !data) {
    return null
  }

  return data as Product
}

async function getRelatedProducts(categorytoExclude: string, currentId: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', categorytoExclude)
    .neq('id', currentId)
    .eq('in_stock', true)
    .limit(3)

  if (error) {
    return []
  }

  return data as Product[]
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.category, product.id)

  return <ProductClient product={product} relatedProducts={relatedProducts} />
}
