import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import istanbul from 'vite-plugin-istanbul'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), istanbul({
    include: ['src/**/*'], // files to track coverage on
    exclude: ['node_modules'], // files to NOT track coverage on
    requireEnv: false
  }), sentryVitePlugin({
    org: "zone-delivery-services",
    project: "javascript-react"
  })],

  build: {
    sourcemap: true
  }
})