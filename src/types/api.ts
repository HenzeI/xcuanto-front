export interface ApiResponse<T> {
  data: T
  total: number
  pagina: number
  por_pagina: number
  total_paginas: number
}

export interface ApiError {
  message: string
  code: string
  status: number
}
