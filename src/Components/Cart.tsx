import React from 'react'
import './style.css'
import { CiShoppingCart, CiUser, CiHome } from "react-icons/ci";
import { IoMdContacts } from "react-icons/io";
import { Link } from "react-router-dom";
// import logo from '../assets/logo.png'
const Cart = () => {
    return (
        <div>
            <div>
                <nav className="sticky-nav">
                    <Link to="/home">
                        {/* <img src={logo} alt="Logo" style={{ height: '7vh' }} /> */}
                    </Link>
                    <div>
                        <Link to="/contact">
                            <IoMdContacts style={{ fontSize: 'x-large', marginTop: '1vh' }} />
                        </Link>
                        <a >
                            <CiUser style={{ fontSize: 'x-large', marginTop: '1vh' }} />
                        </a>
                        <Link to="/cart">
                            <CiShoppingCart style={{ fontSize: 'x-large', marginTop: '1vh' }} />
                        </Link>
                        <Link to="/home">
                            <CiHome style={{ fontSize: 'x-large', marginTop: '1vh' }} />
                        </Link>
                    </div>
                </nav>


            </div>
        </div>
    )
}

export default Cart