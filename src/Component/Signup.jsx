import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { authData } from '../App'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

    // const [user, setUser] = useState([])
    const {users, setUsers} = useContext(authData) 
    const [input, setInput] = useState({ name: '', email: '', password: '' })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    // console.log(input);
    // console.log(user);

    const checkValidation = (input) => {
        const errors = {}

        if (input.name.trim() === "") {
            errors.name = "Invalid Name*"
        }
        if (input.email.trim() === "") {
            errors.email = "Invalid Email*"
        }
        if (input.password.trim() === "") {
            errors.password = "Invalid Password*"
        }
        return errors
    }

    useEffect(() => {
        getData()
    }, [])

    const getData = () => {
        axios.get("http://localhost:2000/users")
            .then((resp) => resp.data)
            .then((json) => setUsers(json))
    }

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSignUp = (e) => {
        e.preventDefault()

        const validate = checkValidation(input)
        setErrors(validate)
        const check = Object.keys(validate)
        if (check.length < 1) {
            const existUser = users.some((existingUser) => existingUser.email === input.email)
            if (existUser) {
                alert("Registered User Please Sign In Account")
            } else {
                axios.post("http://localhost:2000/users", {
                    name: input.name,
                    email: input.email,
                    password: input.password
                })
                    .then(() => {
                        getData()
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
            navigate("/login")
            setInput({ name: '', email: '', password: '' })
        }

    }

    return (
        <>
            <div className="signup">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-center vh-100">
                        <div className="col-4">
                            <form action="" className='border border-dark rounded p-4' onSubmit={handleSignUp}>
                                <h1 className='text-center text-secondary'>Sign Up</h1>
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="" className='fw-bold my-2'>UserName : </label>
                                    <span className='text-danger fs-6 fw-bold '>{errors.name}</span>
                                </div>
                                <input type="text" className='w-100 form-control' name='name' value={input.name} onChange={handleChange} />

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
                                    <button className='btn btn-dark rounded'>SignUp</button>
                                </div>
                                <p className='text-center mt-3 mb-0'>Already have an account? <Link to={"/login"} className="text-primary fw-semibold">Login </Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup