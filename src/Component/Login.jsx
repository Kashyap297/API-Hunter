import React, { useContext, useEffect, useState } from 'react'
import { authData } from '../App'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'

const Login = () => {

    const { users, setUsers } = useContext(authData)
    const { login, setLogin } = useContext(authData)
    const {logedUser, setLogedUser} = useContext(authData)

    const navigate = useNavigate()
    // console.log(users);

    useEffect(() => {
        getData()
    }, [])

    const getData = async() => {
        await axios.get("http://localhost:2000/users")
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
                    Swal.fire({
                        title: "Login Successfully !",
                        text: "Visit our home page to start your shopping.",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1700
                    });
                    setLogin(true)
                    navigate("/")
                    // console.log(foundUser);
                    setLogedUser(foundUser)
                    localStorage.setItem("loginUser", JSON.stringify(foundUser))
                    localStorage.setItem("login", JSON.stringify(true))
                } else {
                    toast.error("Incorrect Password...!", {
                        position: toast.POSITION,
                    });
                }
            } else {
                toast.info("User Not Found Please SignUp...", {
                    position: toast.POSITION,
                });
            }

            setInput({ email: '', password: '' })
        }
    }

    return (
        <>

            <ToastContainer />
            <div className="login">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-center vh-100">
                        <div className="col-4">
                            <form action="" className='shadow-lg bor-rad p-4 bg-light' onSubmit={handleLogIn}>
                                <h1 className='text-center text-secondary'>Log-In</h1>
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="" className='fw-bold my-2 lightslategrey'>Email-ID : </label>
                                    <span className='text-danger fs-6 fw-bold '>{errors.email}</span>
                                </div>
                                <input type="email" className='w-100 form-control' placeholder='Enter Email' name='email' value={input.email} onChange={handleChange} />
                                <div className="d-flex justify-content-between align-items-center">
                                    <label htmlFor="" className='fw-bold my-2 lightslategrey'>Password : </label>
                                    <span className='text-danger fs-6 fw-bold '>{errors.password}</span>
                                </div>
                                <input type="password" className='w-100 form-control' placeholder='Enter Password' name='password' value={input.password} onChange={handleChange} />
                                <div className="text-center mt-3">
                                    <button className='btn btn-dark rounded w-100'>Login</button>
                                </div>
                                <p className='text-center mt-3 mb-0'>Don't have an account ? <Link to={"/signup"} className="text-primary fw-bold w-100">Sign Up</Link></p>
                                <p className='text-center text-secondary mt-2'>------ Or ------</p>
                                <div className='btn btn-outline-dark w-100'><i className="fa-brands fa-google me-2"></i>Login with Google</div>
                                <div className='btn btn-outline-dark mt-3 w-100'><i className="fa-brands fa-github me-2"></i>Login with Git-Hub</div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login