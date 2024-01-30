import './App.css';
import Signup from './Component/Signup';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './Component/Home';
import Login from './Component/Login';
import { createContext, useEffect, useState } from 'react';

export const authData = createContext()

function App() {
  const [users, setUsers] = useState([])
  const [login, setLogin] = useState(false)
  const [logedUser, setLogedUser] = useState(null)
  

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
      {/* <Signup /> */}
      <BrowserRouter>
        <authData.Provider value={{ users, setUsers, login, setLogin, logedUser, setLogedUser }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </authData.Provider>

      </BrowserRouter>
    </>
  );
}

export default App;
