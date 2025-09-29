import React, { useState } from 'react';
import './style.css';
import { CiShoppingCart, CiUser, CiHome } from "react-icons/ci";
import { IoMdContacts } from "react-icons/io";
import { Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import logo from '../assets/logo.png';
import { send } from "@emailjs/browser";
import { auth, provider } from '../firebaseConfig';
import { signInWithPopup } from "firebase/auth";

const ConectUse = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState("");
    const [user, setUser] = useState(null);
    const [hover, setHover] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("ENV values:", 
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        console.log("Form data:", formData);

        send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
            formData,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        )
        .then((response) => {
            console.log("EmailJS Response:", response);
            setStatus("המייל נשלח בהצלחה! תודה על הפנייה.");
            setFormData({ name: "", email: "", message: "" });
        })
        .catch((error) => {
            console.error("EmailJS Error:", error);
            setStatus("אירעה שגיאה בשליחת המייל. אנא ודאי שהשדות בתבנית קיימים ונסי שוב.");
        });
    };

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
                                {user ? `מחובר כ: ${user.displayName}` : "לא מחובר - התחברי עם Google"}
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

            <div className="contact-page">
                <div className="contact-container">
                    <h1>צור קשר</h1>
                    <p>נשמח לשמוע ממך! השאירי הודעה ואנחנו נחזור בהקדם.</p>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="שם מלא" 
                            value={formData.name} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="email" 
                            name="email" 
                            placeholder="דוא״ל" 
                            value={formData.email} 
                            onChange={handleChange} 
                            required 
                        />
                        <textarea 
                            name="message" 
                            placeholder="הודעה" 
                            value={formData.message} 
                            onChange={handleChange} 
                            required 
                        />
                        <button type="submit">שלח הודעה</button>
                    </form>

                    {status && <p className="status">{status}</p>}
                </div>
            </div>
        </div>
    );
};

export default ConectUse;
