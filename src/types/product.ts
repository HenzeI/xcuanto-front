import type { Category } from './category'

export type ProductCondition = 'nuevo' | 'como_nuevo' | 'buen_estado' | 'aceptable'

export interface Seller {
  id: number
  nombre: string
  avatar?: string
  valoracion: number
  total_ventas: number
  fecha_registro: string
}

export interface Product {
  id: number
  nombre: string
  slug: string
  precio: number
  descripcion: string
  categoria: Category
  estado: ProductCondition
  imagenes: string[]
  destacado: boolean
  fecha_publicacion: string
  vendedor?: Seller
  vistas?: number
}

export interface FilterParams {
  categoria?: string
  estado?: ProductCondition
  precio_min?: number
  precio_max?: number
  busqueda?: string
  ordenar?: 'precio_asc' | 'precio_desc' | 'fecha_desc' | 'fecha_asc'
  destacado?: boolean
}
