// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // yeh option zaroori hai ngrok jese tools ke liye
    host: true, 
    
    // isko add karein taake Vite ngrok ke host ko allow kare
    allowedHosts: [
      // Yeh wildcard har ngrok-free.app subdomain ko allow kar dega
      // Is se aapko baar baar URL change nahi karna parega
      '.ngrok-free.app' 
    ],
  },
});