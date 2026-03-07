import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const backend = 'https://localhost:7013';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: backend,
                changeOrigin: true,
                secure: false
            }
        }
    }
})