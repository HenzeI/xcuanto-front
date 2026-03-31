/**
 * Capa base de la API.
 *
 * En modo mock (VITE_DATA_MODE=mock) los servicios devuelven datos locales.
 * Para conectar con Django, cambia VITE_DATA_MODE=api y asegúrate de que
 * VITE_API_URL apunta al servidor de Django (por defecto: http://localhost:8000/api).
 *
 * Los servicios devuelven siempre Promise<T> — los componentes no necesitan
 * cambiar nada cuando se conecte el backend real.
 */

export const API_BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'
export const DATA_MODE = import.meta.env.VITE_DATA_MODE ?? 'mock'

export function isMockMode(): boolean {
  return DATA_MODE !== 'api'
}

/** Simula la latencia de red en modo mock para un prototipo más realista */
export function mockDelay<T>(data: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), ms))
}

export async function apiFetch<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`)
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`)
  }
  return res.json() as Promise<T>
}
