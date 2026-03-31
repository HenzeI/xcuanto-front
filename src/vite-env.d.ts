/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_DATA_MODE: string
  readonly VITE_LOGO_URL: string | undefined
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
