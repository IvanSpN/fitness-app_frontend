import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { registerLocale } from 'react-datepicker';
import { ru } from 'date-fns/locale/ru';

registerLocale('ru', ru);

import App from './App.tsx'

import { Provider } from 'react-redux'
import { store } from './shared/Redux/store.ts'

import './styles/index.scss'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
)
