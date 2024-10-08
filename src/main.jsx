import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import GeminiContextProvider from './components/GeminiContext/GeminiContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <GeminiContextProvider>
    <App />
  </GeminiContextProvider>,
)
