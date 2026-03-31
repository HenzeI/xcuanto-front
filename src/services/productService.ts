import type { Product, FilterParams } from '../types/product'
import { mockProducts } from '../mocks/products'
import { mockDelay, isMockMode, apiFetch } from './api'

function applyFilters(products: Product[], params?: FilterParams): Product[] {
  let result = [...products]

  if (params?.categoria) {
    result = result.filter((p) => p.categoria.slug === params.categoria)
  }
  if (params?.estado) {
    result = result.filter((p) => p.estado === params.estado)
  }
  if (params?.busqueda) {
    const q = params.busqueda.toLowerCase()
    result = result.filter(
      (p) =>
        p.nombre.toLowerCase().includes(q) ||
        p.descripcion.toLowerCase().includes(q) ||
        p.categoria.nombre.toLowerCase().includes(q),
    )
  }
  if (params?.precio_min !== undefined) {
    result = result.filter((p) => p.precio >= params.precio_min!)
  }
  if (params?.precio_max !== undefined) {
    result = result.filter((p) => p.precio <= params.precio_max!)
  }
  if (params?.destacado !== undefined) {
    result = result.filter((p) => p.destacado === params.destacado)
  }

  switch (params?.ordenar) {
    case 'precio_asc':
      result.sort((a, b) => a.precio - b.precio)
      break
    case 'precio_desc':
      result.sort((a, b) => b.precio - a.precio)
      break
    case 'fecha_asc':
      result.sort(
        (a, b) =>
          new Date(a.fecha_publicacion).getTime() - new Date(b.fecha_publicacion).getTime(),
      )
      break
    default:
      result.sort(
        (a, b) =>
          new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime(),
      )
  }

  return result
}

export const productService = {
  getAll: async (params?: FilterParams): Promise<Product[]> => {
    if (isMockMode()) {
      return mockDelay(applyFilters(mockProducts, params))
    }
    const qs = new URLSearchParams(params as Record<string, string>).toString()
    return apiFetch<Product[]>(`/productos/?${qs}`)
  },

  getBySlug: async (slug: string): Promise<Product | undefined> => {
    if (isMockMode()) {
      const product = mockProducts.find((p) => p.slug === slug)
      return mockDelay(product)
    }
    return apiFetch<Product>(`/productos/${slug}/`)
  },

  getFeatured: async (): Promise<Product[]> => {
    if (isMockMode()) {
      return mockDelay(applyFilters(mockProducts, { destacado: true }))
    }
    return apiFetch<Product[]>('/productos/?destacado=true')
  },

  getLatest: async (limit = 8): Promise<Product[]> => {
    if (isMockMode()) {
      const sorted = applyFilters(mockProducts, { ordenar: 'fecha_desc' })
      return mockDelay(sorted.slice(0, limit))
    }
    return apiFetch<Product[]>(`/productos/?ordering=-fecha_publicacion&limit=${limit}`)
  },

  getByCategory: async (categorySlug: string): Promise<Product[]> => {
    if (isMockMode()) {
      return mockDelay(applyFilters(mockProducts, { categoria: categorySlug }))
    }
    return apiFetch<Product[]>(`/productos/?categoria=${categorySlug}`)
  },

  getRelated: async (product: Product, limit = 4): Promise<Product[]> => {
    if (isMockMode()) {
      const related = mockProducts
        .filter((p) => p.categoria.slug === product.categoria.slug && p.id !== product.id)
        .slice(0, limit)
      return mockDelay(related)
    }
    return apiFetch<Product[]>(
      `/productos/?categoria=${product.categoria.slug}&exclude=${product.id}&limit=${limit}`,
    )
  },
}
