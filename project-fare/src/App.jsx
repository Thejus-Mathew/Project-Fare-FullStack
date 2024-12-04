import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Footer from './components/Footer'
import Auth from './pages/Auth'
import 'react-toastify/dist/ReactToastify.css';
import { tokenAuthContext } from './ContextApi/Tokenauth'
import { useContext } from 'react'

function App() {
  const {isAuthorized,setIsAuthorized} = useContext(tokenAuthContext)


  return (
    <>
    <Routes>
      <Route path='/*' element={<Navigate to={'/'}/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={isAuthorized?<Dashboard/>:<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/projects' element={isAuthorized?<Projects/>:<Home/>}/>
      <Route path='/register' element={<Auth register/>}/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App
