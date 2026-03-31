import { useState, useEffect } from 'react'
import type { Product } from '../types/product'
import { productService } from '../services/productService'

interface UseProductReturn {
  product: Product | null
  related: Product[]
  loading: boolean
  error: string | null
}

export function useProduct(slug: string): UseProductReturn {
  const [product, setProduct] = useState<Product | null>(null)
  const [related, setRelated] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)
    setProduct(null)
    setRelated([])

    productService
      .getBySlug(slug)
      .then(async (data) => {
        if (cancelled) return
        if (!data) {
          setError('Producto no encontrado')
          setLoading(false)
          return
        }
        setProduct(data)
        const rel = await productService.getRelated(data)
        if (!cancelled) {
          setRelated(rel)
          setLoading(false)
        }
      })
      .catch((err: Error) => {
        if (!cancelled) {
          setError(err.message)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return { product, related, loading, error }
}
