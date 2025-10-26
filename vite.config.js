import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // HashRouter kullandığımız için base'e gerek yok.
})
