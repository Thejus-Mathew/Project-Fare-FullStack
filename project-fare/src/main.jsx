import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './ContextApi/ContextShare.jsx'
import Tokenauth from './ContextApi/Tokenauth.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <Tokenauth>
  <ContextShare>
  <BrowserRouter>
      <App/>
  </BrowserRouter>
  </ContextShare>
  </Tokenauth>
  </StrictMode>,
)
