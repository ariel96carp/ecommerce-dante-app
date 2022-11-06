import { defineConfig } from "vite"
import { resolve } from 'path'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                about: resolve(__dirname, 'about.html'),
                blog: resolve(__dirname, 'blog.html'),
                cart: resolve(__dirname, 'cart.html'),
                contact: resolve(__dirname, 'contact.html'),
                details: resolve(__dirname, 'details.html'),
                shop: resolve(__dirname, 'shop.html')
            }
        }
    }
})
