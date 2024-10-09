import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import App from './App.tsx'

import './styles/index.scss'
import { Provider } from 'react-redux'
import { store } from './shared/Redux/store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
  </Provider>
)
