import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './store/store.js'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>  
    <App />
    </Provider>
  
)
