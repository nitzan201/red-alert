/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CESIUM_ACCESS_TOKEN: string;
  readonly VITE_MAIL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}