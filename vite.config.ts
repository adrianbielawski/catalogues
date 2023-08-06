import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { sentryVitePlugin } from "@sentry/vite-plugin"

export default defineConfig(({mode}) => {
  const config = {
    root: 'src',
    build: {
      outDir: '../dist',
      sourcemap: true,
    },
    base: '/',
    publicDir: '../assets',
    plugins: [
      react(),
      vitePluginFaviconsInject(`./src/assets/img/icon.svg`),
      sentryVitePlugin({
        org: 'catalogues',
        project: 'catalogues',
        authToken: process.env.SENTRY_AUTH_TOKEN,
        debug: true,
        disable: mode === 'development',
        telemetry: false,
      }),
    ],
    resolve: {
      alias: {
        path: 'path-browserify', // Module "path" has been externalized for browser compatibility
        src: `${__dirname}/src`,
        assets: `${__dirname}/src/assets`,
        components: `${__dirname}/src/components`,
        store: `${__dirname}/src/store`,
        hoc: `${__dirname}/src/hoc`,
        "global-styles": `${__dirname}/src/global-styles`,
      }
    },
    css: {
      devSourcemap: true
    },
    appType: 'spa' as const,
    server: {
      https: true,
    }
  }

  if (mode === 'development') {
    config.plugins.push(basicSsl())
  }

  return config
})
