import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import home from '../icon/home.png'
import { authData } from '../App'
import axios from 'axios'
import bin from '../icon/bin.png'

const Cart = () => {
    const { logedUser, setLogedUser } = useContext(authData)
    const [cartProducts, setCartProducts] = useState([])
    const [noRecord, setNoRecord] = useState(false)
    const [user, setUser] = useState()
    const [totalAmount, setTotalAmount] = useState(0)
    // const { bagCount, setBagCount } = useContext(authData)

    useEffect(() => {
        getCart()
    }, [])

    useEffect(() => {
        if (cartProducts.length < 1) {
            setNoRecord(true)
            setTotalAmount(0)
        } else {
            setNoRecord(false)
            const total = cartProducts.reduce((acc, item) => acc + item.qty * item.price, 0)
            setTotalAmount(total)
        }
    }, [cartProducts])


    const getCart = async () => {
        await axios.get(`http://localhost:1000/users/${logedUser.id}`)
            .then((res) => {
                if (res.data.cart) {
                    setCartProducts(res.data.cart)
                    setUser(res.data)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleIncrement = async (id) => {
        // console.log(id);
        const proid = id
        const updatedUser = { ...user }
        const updatedCart = [...cartProducts]

        updatedCart.forEach((item) => {

            if (proid === item.id) {
                item.qty++;
                updatedUser.cart = updatedCart;
            }
        })
        try {
            await axios.put(`http://localhost:1000/users/${logedUser.id}`, updatedUser)
            setCartProducts(updatedUser.cart)
            setLogedUser(updatedUser)
        } catch (err) {
            console.log(err);
        }

    }

    const handleDecrement = async (id) => {
        const proid = id
        const updatedUser = { ...user }
        const updatedCart = [...cartProducts]

        updatedCart.forEach(async (item) => {

            if (proid === item.id) {
                if (item.qty > 1) {
                    item.qty--;
                    updatedUser.cart = updatedCart;
                } else {
                    updatedUser.cart = updatedCart;
                }
            }
        })
        try {
            await axios.put(`http://localhost:1000/users/${logedUser.id}`, updatedUser)
            setCartProducts(updatedUser.cart)
            setLogedUser(updatedUser)
        } catch (err) {
            console.log(err);
        }

    }
    const handleDelete = async (id) => {

        // 1
        // const currentUser = { ...user }
        // // console.log(currentUser.cart);
        // currentUser.cart.splice(id, 1)
        // setUser(currentUser)
        // axios.put(`http://localhost:1000/users/${logedUser.id}`, user)
        //     .then(res => {
        //         setLogedUser(res.data)
        //     })

        // setCartProducts()

        // 2
        try {
            const updatedUser = { ...user }
            const updatedCart = [...cartProducts]
            // console.log(updatedCart);
            // console.log(updatedUser);
            updatedCart.splice(id, 1)
            updatedUser.cart = updatedCart
            await axios.put(`http://localhost:1000/users/${logedUser.id}`, updatedUser)
            setCartProducts(updatedCart)
            setLogedUser(updatedUser)
        } catch (err) {
            console.log(err);
        }


        // 3

        // try {
        //     const updatedCart = [...cartProducts]
        //     updatedCart.splice(id, 1);
        //     await axios.put(`http://localhost:1000/users/${logedUser.id}`, { cart: updatedCart })
        //     setCartProducts(updatedCart)
        // } catch (err) {
        //     console.log(err);
        // }
    }

    return (
        <>
            <section className='my-5'>
                <div className="container">
                    <div className="area p-4 bg-white bor-rad shadow">
                        <p className='text-end fs-5 fw-bold mt-0 text-uppercase theme-clr'> {logedUser && logedUser.name}</p>
                        <header className='bg-dark p-3 bor-rad shadow'>
                            <div className="d-flex align-items-center justify-content-between">
                                <p className='m-0 gr-text fs-5'>Shopping Cart</p>
                                <div className="cart-item d-flex">
                                    <div className="cart p-2 me-3">
                                        0 - items
                                    </div>
                                    <Link to='/products' className='btn btn-light align-items-center text-dark'>Products<img src={home} alt="" width="24px" className='ms-2' /></Link>
                                </div>
                            </div>
                        </header>
                        <div className="cart_area border shadow mt-4 p-3 bor-rad ">
                            <div className="row">
                                <div className="col-8">
                                    <table className='table table-hover mb-0 table-bordered table-rounded p-3 text-center align-middle'>
                                        <thead className='table-dark'>
                                            <tr>
                                                <th className='gr-text col-5'>Items</th>
                                                <th className='gr-text col'>Price</th>
                                                <th className='gr-text col'>Qty</th>
                                                <th className='gr-text col'>Sub-Total</th>
                                                <th className='gr-text col'>Bin</th>
                                            </tr>
                                        </thead>
                                        <tbody className='table-group-divider'>
                                            {
                                                noRecord ? (
                                                    <>
                                                        <tr>
                                                            <td className='text-center fw-bold pe-0 py-3 fs-4 text-danger' colSpan={5}>
                                                                cart is feeling a bit lonely</td>

                                                        </tr>
                                                    </>
                                                ) : (

                                                    cartProducts.map((item, id) => {
                                                        return (
                                                            <tr key={id}>
                                                                <td className='d-flex justify-content-between align-items-center py-3'>
                                                                    <div className="pro-img me-3">
                                                                        <img src={item.img} alt="" className='image-fluid bor-rad' />
                                                                    </div>
                                                                    <div className="title">
                                                                        <h6 className='text-start fw-bold mb-0 clr-gr'>{item.name}</h6>
                                                                        <p className='font-sz mb-2 lightslategrey text-justify'>{item.disc}</p>
                                                                    </div>
                                                                </td>
                                                                <td className=''>{item.price}/-</td>
                                                                <td className=''>
                                                                    <div className="quantity-field" >
                                                                        <button className="value-button decrease-button" onClick={() => handleDecrement(item.id)}>-</button>
                                                                        <div className="number">{item.qty}</div>
                                                                        <button className="value-button increase-button" onClick={() => handleIncrement(item.id)}>+</button>
                                                                    </div>
                                                                </td>
                                                                <td className=''>{item.qty * item.price}/-</td>
                                                                <td className=''>
                                                                    <button className="btn btn-light" onClick={() => handleDelete(id)}>
                                                                        <img src={bin} alt="" width="24px" />
                                                                    </button></td>
                                                            </tr>
                                                        )
                                                    })
                                                )
                                            }

                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-4">
                                    <div className="summary">
                                        <h3 className='text-center border-bottom pb-2 clr-gr'>Summary</h3>
                                        <div className="bill mt-3 px-3 border-bottom pb-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span className='fs-5 fw-bold clr-gr'>Sub-Total</span>
                                                <span className='fs-5'>{totalAmount}/-</span>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center mt-3">
                                                <span className='fs-5 fw-bold clr-gr'>Delivery Charges</span>
                                                <span className='fs-5'>FREE <span className='linethrough ms-2 lightslategrey'>120/-</span></span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-3 px-3 border-bottom pb-3">
                                            <span className='fs-5 fw-bold clr-gr'>Grand Total</span>
                                            <span className='fs-4 fw-bold'> {totalAmount}/-</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Cart