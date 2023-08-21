import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default () => {
  return defineConfig({
    plugins: [react()],
    server: {
      open: true,
      host: '127.0.0.1',
      port: 3000,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  });
};
