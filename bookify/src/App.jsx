import './App.css'
// CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
// Routing
import { Route, Routes } from 'react-router-dom'
// Pages Import
import Register  from './pages/Register'
import Login from './pages/Login';
import List from './pages/List.jsx';
import Home from './pages/Home.jsx';
import BookDetails from './pages/BookDetails.jsx';
import ViewOrder from './pages/ViewOrder.jsx';
import ViewOrderDetail from './pages/ViewOrderDetail.jsx';
// Components
import MyNavbar from './components/Navbar.jsx';

function App() {

  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/book/list' element={<List />}></Route>
        <Route path='/book/view/:bookId' element={<BookDetails />}></Route>
        <Route path='/book/orders' element={<ViewOrder />}></Route>
        <Route path='/books/orders/:bookId' element={<ViewOrderDetail />}></Route>
      </Routes>
    </div>
  )
}

export default App
