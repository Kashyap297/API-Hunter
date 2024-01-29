import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <header className='bg-dark text-white p-3'>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        <ul className='d-flex justify-content-between align-items-center mb-0'>
                            <Link to={"/"} className='fs-3'>Home</Link>
                        </ul>
                        <ul className='text-end d-flex justify-content-end align-items-center mb-0 gap-2'>
                            <Link to={"/signup"} className='btn btn-light text-dark'>SignUp</Link>
                            <Link to={"/login"} className='btn btn-light text-dark'>Login</Link>
                            <li className='btn btn-light text-dark'>LogOut</li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header