import React, { useState, Dispatch, SetStateAction } from 'react';
import './style.css';
import { CiShoppingCart, CiUser, CiHome } from "react-icons/ci";
import { IoMdContacts } from "react-icons/io";
import { Link } from "react-router-dom";
import { Product } from '../Types/types';

import { Auth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { auth, provider } from '../firebaseConfig';

interface HandleGoogleSignInProps {
    auth: Auth;
    provider: GoogleAuthProvider;
    setUser: Dispatch<SetStateAction<User | null>>;
}

const HomePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [hover, setHover] = useState<boolean>(false);

    const handleGoogleSignIn = async ({ auth, provider, setUser }: HandleGoogleSignInProps): Promise<void> => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            localStorage.setItem("user", JSON.stringify(result.user));
            console.log("Signed in user:", result.user);
        } catch (error) {
            console.error("Error signing in:", error);
            alert("אירעה שגיאה בהתחברות.");
        }
    };

    const API_URL = "http://localhost:5000/api/products";

    const fetchAllProducts = async (): Promise<Product[]> => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Error fetching products: ${response.statusText}`);
            }
            const data: Product[] = await response.json();
            console.log(data);
            
            return data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    fetchAllProducts()
    return (
        <div>
            <nav className="sticky-nav">
                <Link to="/home">{/* לוגו כאן אם יש */}</Link>
                <div>
                    <Link to="/contact">
                        <IoMdContacts style={{ fontSize: 'x-large', marginTop: '1vh' }} />
                    </Link>
                    <Link
                        to="/user"
                        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                            e.preventDefault(); // מונע ניווט אוטומטי
                            handleGoogleSignIn({ auth, provider, setUser });
                        }}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
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
                <h1>תוכן לדוגמה</h1>
                <p>גללי למטה ותראי שהניווט נשאר תקוע למעלה.</p>
                <p>...</p>
                <p>תוסיפי עוד תוכן כדי לגלול</p>
            </div>
        </div>
    );
};

export default HomePage;
