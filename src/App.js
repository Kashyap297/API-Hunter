import logo from './logo.svg';
import './App.css';
import Signup from './Component/Signup';
import Header from './Component/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Component/Home';
import Login from './Component/Login';
import { createContext, useState } from 'react';

export const authData = createContext()

function App() {
  const [users, setUsers] = useState([])
  return (
    <>
      {/* <Signup /> */}

      <BrowserRouter>
        <Header />
        <authData.Provider value={{users, setUsers}}>
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
