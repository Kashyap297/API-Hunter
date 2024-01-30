import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { authData } from '../App'

const Home = () => {

  // const [logedUser, setLogedUser] = useState({name : ""})
  const {logedUser, setLogedUser} = useContext(authData)
  console.log(logedUser);

  // console.log(logedUser);
  // useEffect(() => {
  //   const loginUser = JSON.parse(localStorage.getItem('loginUser'))
  //   setLogedUser(loginUser)
  // }, [])

  return (
    <>
      <Header />
      <h1 className='text-center mt-5 home'> Welcome to the home page!</h1>
      <h2 className='text-center mt-3'> Hello - {logedUser && logedUser.name}</h2>
    </>
  )
}

export default Home