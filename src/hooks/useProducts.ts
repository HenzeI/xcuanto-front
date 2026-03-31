import { useState, useEffect } from 'react'
import type { Product, FilterParams } from '../types/product'
import { productService } from '../services/productService'

interface UseProductsReturn {
  products: Product[]
  loading: boolean
  error: string | null
}

export function useProducts(filters?: FilterParams): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const filtersKey = JSON.stringify(filters)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    productService
      .getAll(filters)
      .then((data) => {
        if (!cancelled) {
          setProducts(data)
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtersKey])

  return { products, loading, error }
}

export function useFeaturedProducts(): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    productService
      .getFeatured()
      .then((data) => {
        if (!cancelled) {
          setProducts(data)
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
  }, [])

  return { products, loading, error }
}

export function useLatestProducts(limit?: number): UseProductsReturn {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    productService
      .getLatest(limit)
      .then((data) => {
        if (!cancelled) {
          setProducts(data)
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
  }, [limit])

  return { products, loading, error }
}
