import React, { useContext, useEffect, useState } from 'react'
import carticon from '../icon/cart.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { authData } from '../App'

const Products = () => {

    const { logedUser, setLogedUser } = useContext(authData)
    const [products, setProducts] = useState([])

    useEffect(() => {
        getProducts()
    }, [])

    const getProducts = async () => {
        try {
            await axios.get("http://localhost:1000/products")
                .then((resp) => resp.data)
                .then((json) => setProducts(json))

        } catch (err) {
            console.log(err);
        }
    }
    const handleAddToCart = async (product) => {
        try {
            const res = await axios.get(`http://localhost:1000/users/${logedUser.id}`)
            const currentUser = res.data
            let cart = [{ ...product }]
            if (currentUser.cart || currentUser.count) {
                const check = currentUser.cart.some(e => {
                    if (e.id === product.id) {
                        e.qty += 1;
                        return true
                    }
                })
                if (!check) {
                    cart = [...currentUser.cart, { ...product }]
                } else {
                    cart = currentUser.cart
                }
            }
            let updatedUser = { ...currentUser, cart }
            const updatedCart = await axios.put(`http://localhost:1000/users/${logedUser.id}`, updatedUser);
            setLogedUser(updatedCart.data)
        } catch (err) {
            console.log(err);
        }

    }
    return (
        <>
            <section className='my-5'>
                <div className="container">
                    <div className="area p-4 bg-white bor-rad shadow">
                        <p className='text-end fs-5 fw-bold theme-clr mt-0 text-uppercase'> {logedUser && logedUser.name}</p>
                        <header className='bg-dark p-3 bor-rad shadow'>
                            <div className="d-flex align-items-center justify-content-between">
                                <p className='m-0 gr-text fs-5'>Smart Devices</p>
                                <div className="cart-item d-flex">
                                    {/* <div className="cart p-2 me-3">
                                        Bag : 0
                                    </div> */}
                                    <Link to='/cart' className='btn btn-light text-dark'>Cart<img src={carticon} alt="" width="24px" className='ms-2' /></Link>
                                </div>
                            </div>
                        </header>
                        <div className="product_area mt-4">
                            <div className="row">
                                {
                                    products.map((product, id) => {
                                        return (
                                            <div className="col-3" key={id}>
                                                <div className="product border-1 bor-r  pad-sm shadow">
                                                    <div className="card-img">
                                                        <img src={product.img} alt="" className='w-100 bor-rad img-fluid' />
                                                    </div>
                                                    <div className="card-body mt-3 px-1">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <div className="title">
                                                                <h6 className='fs-5 fw-bold mb-0 clr-gr'>{product.name}</h6>
                                                                <p className='font-sz mb-2 lightslategrey text-justify pe-2'>{product.disc}</p>
                                                            </div>
                                                        </div>
                                                        <div className="addbtn d-flex align-items-center justify-content-between  mb-2">
                                                            <span className='fw-bold clr-gr'>Price : {product.price} /-</span>
                                                            <button className='btn btn-dark' onClick={() => handleAddToCart(product)}>Add to Cart</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Products