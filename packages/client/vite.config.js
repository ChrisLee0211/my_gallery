import { VitePWA } from 'vite-plugin-pwa'
import styleImport from 'vite-plugin-style-import';

const {resolve} = require('path')
export default {
  alias: {
    '@': resolve(__dirname, 'src')
  },
  optimizeDeps:{
    // exclude:['crypto-js']
  },
  plugins: [
    VitePWA({
        manifest: {
            // content of manifest
          },
          workbox: {
            // workbox options for generateSW
          }
    }),
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: (name) => `vant/es/${name}/style`,
        },
      ],
    }),
  ]
}