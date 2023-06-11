import './App.scss'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Onboarding from './pages/Onboarding'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useCookies } from 'react-cookie'

function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const authToken = cookies.AuthToken

  return (
    <>
        <BrowserRouter>
          <Routes>
            {/* {!authToken && <Route path='/*' element={<Navigate to='/' replace />} />} */}
            <Route path='/' element={<Home />} />
            {authToken && <Route path='/dashboard' element={<Dashboard />} />}
            {authToken && <Route path='/onboarding' element={<Onboarding />} />}
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
