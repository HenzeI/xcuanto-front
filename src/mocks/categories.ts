import type { Category } from '../types/category'

export const mockCategories: Category[] = [
  {
    id: 1,
    nombre: 'Juegos',
    slug: 'juegos',
    icono: 'Gamepad2',
    descripcion: 'Videojuegos, consolas y accesorios gaming',
    total_productos: 48,
  },
  {
    id: 2,
    nombre: 'Móviles',
    slug: 'moviles',
    icono: 'Smartphone',
    descripcion: 'Teléfonos inteligentes, tablets y accesorios',
    total_productos: 63,
  },
  {
    id: 3,
    nombre: 'Informática',
    slug: 'informatica',
    icono: 'Laptop',
    descripcion: 'Portátiles, ordenadores, periféricos y componentes',
    total_productos: 37,
  },
  {
    id: 4,
    nombre: 'Electrónica',
    slug: 'electronica',
    icono: 'Zap',
    descripcion: 'Auriculares, cámaras, smart home y más',
    total_productos: 55,
  },
  {
    id: 5,
    nombre: 'Accesorios',
    slug: 'accesorios',
    icono: 'Package',
    descripcion: 'Fundas, cables, cargadores y complementos',
    total_productos: 82,
  },
]
