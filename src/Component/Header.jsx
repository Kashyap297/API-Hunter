import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { authData } from '../App'
import Swal from 'sweetalert2'

const Header = () => {

    const { login, setLogin } = useContext(authData)

    const handleLogout = () => {
        Swal.fire({
            title: "Logout Successfully !",
            text: "Thank you for using our services.",
            icon: "success",
            showConfirmButton: false,
            timer: 1700
        });
        setLogin(true)
    }

    return (
        <>
            <section className='mt-3 gr-text'>
                <div className="container">
                    <header className='bg-dark p-3 bor-rad shadow'>
                        <div className="d-flex justify-content-between align-items-center">
                            <ul className='d-flex justify-content-between align-items-center gap-3 mb-0'>
                                <Link to={"/"} className='fs-5'>Home</Link>
                                <Link className='fs-5'>Products</Link>
                                <Link className='fs-5'>Cart</Link>
                            </ul>
                            <ul className='text-end d-flex justify-content-end align-items-center mb-0 gap-2'>
                                {
                                    login ? <>
                                        <Link to={"/signup"} className='btn btn-light text-dark'>SignUp</Link>
                                        <Link to={"/login"} className='btn btn-light text-dark'>Login</Link>
                                    </>
                                        :
                                        <li className='btn btn-light text-dark' onClick={handleLogout}>LogOut</li>
                                }
                            </ul>
                        </div>
                    </header>
                </div>
            </section>
        </>
    )
}

export default Header