import React, { useState } from 'react';
import './style.css';
import { CiShoppingCart, CiUser, CiHome } from "react-icons/ci";
import { IoMdContacts } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from '../assets/logo.png';
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from "firebase/auth";

const HomePage = () => {
  const [user, setUser] = useState(null); // שמירת מצב המשתמש
  const [hover, setHover] = useState(false); // hover state

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        setUser(result.user);
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
          <img src={logo} alt="Logo" style={{ height: '7vh' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link to="/contact">
            <IoMdContacts style={{ fontSize: 'x-large', marginTop: '1vh' }} />
          </Link>

          <div
            style={{ position: 'relative', display: 'inline-block', cursor: 'pointer' }}
            onClick={handleGoogleSignIn}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <CiUser style={{ fontSize: 'x-large', marginTop: '1vh' }} />
            
            {hover && (
              <div className="tooltip">
                {user ? ` ${user.displayName} מחובר כ: ` : " Google לא מחובר - התחברי עם "}
              </div>
            )}
          </div>

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
