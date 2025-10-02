import React, { useState } from 'react';
import './style.css';
import { User } from "firebase/auth";
import { CiShoppingCart, CiUser, CiHome } from "react-icons/ci";
import { IoMdContacts } from "react-icons/io";
import { Link } from "react-router-dom";
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from "firebase/auth";

const Cart = () => {
    const [user, setUser] = useState<User | null>(null);
    const [hover, setHover] = useState(false);

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
                localStorage.setItem('user', JSON.stringify(result.user));
                console.log("Signed in user:", result.user);
            })
            .catch((error) => {
                console.error("Error signing in:", error);
                alert("אירעה שגיאה בהתחברות.");
            });
    };

    return (
        <div>
            <nav className="sticky-nav">
                <Link to="/home">
                    {/* <img src={logo} alt="Logo" style={{ height: '7vh' }} /> */}
                </Link>
                <div>
                    <Link to="/contact">
                        <IoMdContacts style={{ fontSize: 'x-large', marginTop: '1vh' }} />
                    </Link>
                    <Link to="/user"
                        onClick={handleGoogleSignIn}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}>
                        <CiUser style={{ fontSize: 'x-large', marginTop: '1vh' }} />
                    </Link>
                    <Link to="/cart">
                        <CiShoppingCart style={{ fontSize: 'x-large', marginTop: '1vh' }} />
                    </Link>
                    <Link to="/home">
                        <CiHome style={{ fontSize: 'x-large', marginTop: '1vh' }} />
                    </Link>
                </div>
            </nav>

            <div className="content">
                <h1>עגלת קניות</h1>
                <p>תוכן לדוגמה לעגלת הקניות.</p>
            </div>
        </div>
    );
}

export default Cart;
