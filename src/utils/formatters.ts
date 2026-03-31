import type { ProductCondition } from '../types/product'

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Hoy'
  if (diffDays === 1) return 'Ayer'
  if (diffDays < 7) return `Hace ${diffDays} días`
  if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`
  if (diffDays < 365) return `Hace ${Math.floor(diffDays / 30)} meses`
  return `Hace ${Math.floor(diffDays / 365)} años`
}

export function formatDateFull(dateString: string): string {
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

export function getConditionLabel(estado: ProductCondition): string {
  const map: Record<ProductCondition, string> = {
    nuevo: 'Nuevo',
    como_nuevo: 'Como nuevo',
    buen_estado: 'Buen estado',
    aceptable: 'Aceptable',
  }
  return map[estado]
}

export function getConditionVariant(
  estado: ProductCondition,
): 'green' | 'blue' | 'yellow' | 'orange' {
  const map: Record<ProductCondition, 'green' | 'blue' | 'yellow' | 'orange'> = {
    nuevo: 'green',
    como_nuevo: 'blue',
    buen_estado: 'yellow',
    aceptable: 'orange',
  }
  return map[estado]
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}
