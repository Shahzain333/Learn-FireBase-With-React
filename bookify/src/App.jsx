import './App.css'
// CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
// Routing
import { Route, Routes } from 'react-router-dom'
// Pages Import
import Register  from './pages/Register'
import Login from './pages/Login';

function App() {

  return (
    <Routes>
      <Route path='/' element={<h1>Home</h1>}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
    </Routes>
  )
}

export default App
