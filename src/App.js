import './App.css';
import Signup from './Component/Signup';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Component/Home';
import Login from './Component/Login';
import { createContext, useEffect, useState } from 'react';
import error from './icon/error-404.png'
import Products from './Pages/Products';
import Header from './Component/Header';
import Cart from './Pages/Cart';

export const authData = createContext()

function App() {
  const [users, setUsers] = useState([])
  const [login, setLogin] = useState(false)
  const [logedUser, setLogedUser] = useState(null)
  const [bagCount, setBagCount] = useState(0)


  useEffect(() => {
    const checkLogin = JSON.parse(localStorage.getItem('login'))
    const storedLogin = JSON.parse(localStorage.getItem('loginUser'))
    setLogedUser(storedLogin)
    if (checkLogin) {
      setLogin(checkLogin)
      setLogedUser(storedLogin)
    }
  }, [])



  return (
    <>
      <BrowserRouter>
        <authData.Provider value={{ users, setUsers, login, setLogin, logedUser, setLogedUser, bagCount, setBagCount }}>
          <Header />
          <Routes>
            {
              !login ? (
                <>
                  <Route path='/' element={<Home />} />
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/products' element={<Products />} />
                </>
              ) : (
                <>
                  <Route path='/' element={<Home />} />
                  <Route path='/products' element={<Products />} />
                  <Route path='/cart' element={<Cart />} />
                </>
              )
            }
            {/* <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} /> */}
            <Route path='*' element={<h1 className='text-center mt-5'><img src={error} width="250px"></img></h1>} />
          </Routes>
        </authData.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
