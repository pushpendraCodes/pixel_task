import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import DataContext from './context/DataContext.jsx'
// import DataContext from './context/dataContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
  <DataContext>
    <App />
    </DataContext>
  </StrictMode>,
)
