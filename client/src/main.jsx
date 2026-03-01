import { createRoot } from 'react-dom/client';
import { UserProvider } from './context/UserContext.tsx'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext.jsx'

createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>,
)
