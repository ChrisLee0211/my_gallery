import { VitePWA } from 'vite-plugin-pwa'
const {resolve} = require('path')
export default {
  alias: {
    '/@/': resolve(__dirname, 'src')
  },
  plugins: [
    VitePWA({
        manifest: {
            // content of manifest
          },
          workbox: {
            // workbox options for generateSW
          }
    })
  ]
}