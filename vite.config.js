import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api/leetcode': {
        target: 'https://leetcode.com',
        changeOrigin: true,
        rewrite: (path) => '/graphql/',
        headers: {
          'Content-Type': 'application/json',
          'Referer': 'https://leetcode.com',
        },
      },
      '/api/gfg': {
        target: 'https://practiceapi.geeksforgeeks.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gfg/, ''),
        headers: {
          'accept': 'application/json',
          'accept-language': 'en-US,en;q=0.9',
          'content-type': 'application/json',
          'dnt': '1',
          'origin': 'https://www.geeksforgeeks.org',
          'priority': 'u=1, i',
          'referer': 'https://www.geeksforgeeks.org/',
          'sec-ch-ua': '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'same-site',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
        },
      },
    },
  },
})

// trigger reload
