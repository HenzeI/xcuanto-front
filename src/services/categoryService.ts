import type { Category } from '../types/category'
import { mockCategories } from '../mocks/categories'
import { mockDelay, isMockMode, apiFetch } from './api'

export const categoryService = {
  getAll: async (): Promise<Category[]> => {
    if (isMockMode()) {
      return mockDelay(mockCategories)
    }
    return apiFetch<Category[]>('/categorias/')
  },

  getBySlug: async (slug: string): Promise<Category | undefined> => {
    if (isMockMode()) {
      return mockDelay(mockCategories.find((c) => c.slug === slug))
    }
    return apiFetch<Category>(`/categorias/${slug}/`)
  },
}
