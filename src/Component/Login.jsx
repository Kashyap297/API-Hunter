import React, { useContext, useEffect, useState } from 'react'
import { authData } from '../App'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = () => {

    const { users, setUsers } = useContext(authData)

    console.log(users);

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get("http://localhost:2000/users")
            .then((resp) => resp.data)
            .then((json) => setUsers(json))
    }

    const [input, setInput] = useState({ email: '', password: '' })
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const checkValidation = (input) => {
        const errors = {}

        if (input.email.trim() === "") {
            errors.email = "Invalid Email*"
        }
        if (input.password.trim() === "") {
            errors.password = "Invalid Password*"
        }
        return errors
    }

    const handleLogIn = (e) => {
        e.preventDefault()

        const validate = checkValidation(input)
        setErrors(validate)
        const check = Object.keys(validate)

        if (check.length < 1) {
            const foundUser = users.find(u => u.email === input.email)
            if (foundUser) {
                if (foundUser.password === input.password) {
                    alert("Successfully Logged In")
                } else {
                    alert("Incorrect Password")
                }
            } else {
                alert('User not found. Please sign up.')
            }

            setInput({ email: '', password: '' })
        }

    }

    return (
        <>
            <div className="login">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-center vh-100">
                        <div className="col-4">
                            <form action="" className='border border-dark rounded p-4' onSubmit={handleLogIn}>
                                <h1 className='text-center text-secondary'>Log-In</h1>
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="" className='fw-bold my-2'>Email-ID : </label>
                                    <span className='text-danger fs-6 fw-bold '>{errors.email}</span>
                                </div>
                                <input type="email" className='w-100 form-control' name='email' value={input.email} onChange={handleChange} />
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="" className='fw-bold my-2'>Password : </label>
                                    <span className='text-danger fs-6 fw-bold '>{errors.password}</span>
                                </div>
                                <input type="password" className='w-100 form-control' name='password' value={input.password} onChange={handleChange} />
                                <div className="text-center mt-3">
                                    <button className='btn btn-dark rounded'>Login</button>
                                </div>
                                <p className='text-center mt-3 mb-0'>Don't have an account ? <Link to={"/signup"} className="text-primary fw-semibold">Sign Up</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login