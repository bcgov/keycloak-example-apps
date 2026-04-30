import fs from 'node:fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_', 'REACT_APP_', 'SSL_']);

  return {
    plugins: [react({ include: /\.[jt]sx?$/ })],
    envPrefix: ['VITE_', 'REACT_APP_'],
    server: {
      port: 3000,
      https:
        env.SSL_CRT_FILE && env.SSL_KEY_FILE
          ? {
              cert: fs.readFileSync(env.SSL_CRT_FILE),
              key: fs.readFileSync(env.SSL_KEY_FILE),
            }
          : undefined,
    },
    preview: {
      port: 3000,
    },
  };
});