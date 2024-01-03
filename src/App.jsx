import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SharedLayout from './pages/dashboard/SharedLayout'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Error, ForgotPassword, Login, ProtectedRoutes, Register, Verification, ResetPassword, UpdateProfile, SingleUser, PersistentLogin } from './pages'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            // <ProtectedRoutes>
            //   <SharedLayout />
            // </ProtectedRoutes>
            <SharedLayout />
          }
        />
        <Route path="/login" element={
          <Login />
        } />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<Verification />} />
        <Route path="/updateProfile" element={<UpdateProfile />} />
        <Route path="/users/:id" element={<SingleUser />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <ToastContainer position="top-center" />
    </BrowserRouter>
  );
}

export default App
