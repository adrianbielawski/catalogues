import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginFaviconsInject from 'vite-plugin-favicons-inject'
import basicSsl from '@vitejs/plugin-basic-ssl'
import { sentryVitePlugin } from '@sentry/vite-plugin'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd() + '/src', '')

  const config = {
    root: 'src',
    build: {
      outDir: '../dist',
      sourcemap: true,
    },
    base: '/',
    publicDir: '../assets',
    plugins: [react(), vitePluginFaviconsInject(`./src/assets/img/icon.svg`)],
    resolve: {
      alias: {
        path: 'path-browserify', // Module "path" has been externalized for browser compatibility
        src: `${__dirname}/src`,
        assets: `${__dirname}/src/assets`,
        components: `${__dirname}/src/components`,
        store: `${__dirname}/src/store`,
        hoc: `${__dirname}/src/hoc`,
        'global-styles': `${__dirname}/src/global-styles`,
      },
    },
    css: {
      devSourcemap: true,
    },
    appType: 'spa' as const,
    server: {
      https: true,
      proxy: {
        '^/(api|admin)': {
          target: env.API_URL,
          changeOrigin: true,
          xfwd: true,
        },
        '^/(static|media)': env.API_URL,
      },
    },
  }

  if (mode === 'development') {
    config.plugins.push(basicSsl())
  }

  if (mode === 'production') {
    config.plugins.push(
      sentryVitePlugin({
        org: 'catalogues',
        project: 'catalogues',
        authToken: process.env.SENTRY_AUTH_TOKEN,
        debug: true,
        telemetry: false,
      }),
    )
  }

  return config
})
