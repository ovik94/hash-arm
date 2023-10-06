import { defineConfig, loadEnv, splitVendorChunkPlugin, normalizePath } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker'
import { resolve } from 'path';
import viteCompression from 'vite-plugin-compression';
import { viteStaticCopy } from 'vite-plugin-static-copy'
import progress from 'vite-plugin-progress'

export default defineConfig(({mode}) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    base: '/',
    server: {
      port: 80,
      proxy: {
        // with options
        '/api': {
          target: process.env.VITE_DEV_API_URL,
          secure: false,
          changeOrigin: true
        }
      }
    },
    publicDir: './public',
    build: {
      emptyOutDir: true,
      copyPublicDir: false,
      rollupOptions: {
        treeshake: true,
        output: {
          dir: './dist'
        },
      }
    },
    plugins: [
      react(),
      checker({ typescript: true }),
      progress(),
      mode === 'production' && viteCompression(),
      mode === 'production' && splitVendorChunkPlugin(),
      mode === 'production' && viteStaticCopy({
        targets: [
          {
            src: normalizePath(resolve(__dirname, 'public')) + '/[!.]*',
            dest: normalizePath(resolve(__dirname, 'dist', 'public')),
          },
        ],
      })
    ]
  });
})
