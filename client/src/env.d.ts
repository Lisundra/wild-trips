/* eslint-disable @typescript-eslint/consistent-type-definitions */
/// <reference types="vite/client" />

// / <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_URL: string;
  readonly VITE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
