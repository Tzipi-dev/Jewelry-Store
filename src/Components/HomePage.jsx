import React from 'react'
import './style.css'
import { CiShoppingCart, CiUser, CiHome } from "react-icons/ci";
import { IoMdContacts } from "react-icons/io";
import { Link } from "react-router-dom"; // <-- זה חשוב
import logo from '../assets/logo.png'

const HomePage = () => {
    return (
        <div>
            <nav className="sticky-nav">
                <Link to="/home">
                    <img src={logo} alt="Logo" style={{ height: '7vh' }} />
                </Link>
                <div>
                    <Link to="/contact">
                        <IoMdContacts style={{fontSize: 'x-large', marginTop: '1vh'}} />
                    </Link>
                    <a to="/user">
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

            <div className="content">
                <h1>תוכן לדוגמה</h1>
                <p>גללי למטה ותראי שהניווט נשאר תקוע למעלה.</p>
                <p>...</p>
                <p>תוסיפי עוד תוכן כדי לגלול</p>
            </div>
        </div>
    )
}

export default HomePage
