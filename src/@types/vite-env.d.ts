/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API: string
  readonly VITE_APIKEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
