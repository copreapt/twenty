import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SharedLayout from './pages/dashboard/SharedLayout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Error, ForgotPassword, Login, Register, Verification } from './pages'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={
              <SharedLayout />
          } />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/reset-password' element={<ForgotPassword />} />
        <Route path='/verify-email' element={<Verification />} />
        <Route path='*'  element={<Error />}/>
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  )
}

export default App
