import { VitePWA } from 'vite-plugin-pwa'

export default {
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