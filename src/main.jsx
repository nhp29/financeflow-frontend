// STREAMING_CHUNK: Mengimpor modul React dan ReactDOM
import React from 'react'
import { createRoot } from 'react-dom/client'

// STREAMING_CHUNK: Mengimpor file dengan nama baru untuk menghindari error case sensitivity
import App from 'DashboardApp.jsx'

// STREAMING_CHUNK: Menyuntikkan komponen utama ke DOM
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
