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

// הגדרת כתובת המייל הקבועה של הנציג
// **יש להחליף את 'support@your-domain.com' בכתובת המייל האמיתית של נציג השירות**
const REP_EMAIL = "tzipi3135@gmail.com";

// **יש להחליף את 'your_rep_template_id' במזהה התבנית של המייל לנציג**
const REP_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_REP_TEMPLATE_ID 

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
        setStatus("שולח את הפנייה...");

        // 1. פרמטרים למייל אישור ללקוח (משתמש בתבנית הקיימת)
        const customerParams = {
            ...formData
        };

        // 2. פרמטרים למייל שיישלח לנציג השירות (משתמש בתבנית החדשה)
        const repParams = {
            customer_name: formData.name,
            customer_email: formData.email,
            message_body: formData.message,
            to_rep_email: REP_EMAIL // ניתן להשתמש בזה בשדה ה-To בתבנית החדשה
        };

        // הגדרת שתי פעולות השליחה
        const sendCustomerEmail = send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            import.meta.env.VITE_EMAILJS_TEMPLATE_ID, // התבנית הקיימת
            customerParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        const sendRepEmail = send(
            import.meta.env.VITE_EMAILJS_SERVICE_ID,
            REP_TEMPLATE_ID, // **התבנית החדשה שמוגדרת לנציג**
            repParams,
            import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );

        // שליחת שני המיילים במקביל וטיפול בתגובה
        Promise.all([sendCustomerEmail, sendRepEmail])
            .then((responses) => {
                console.log("Customer Email Response:", responses[0]);
                console.log("Representative Email Response:", responses[1]);
                setStatus("המיילים נשלחו בהצלחה! תודה על הפנייה.");
                setFormData({ name: "", email: "", message: "" });
            })
            .catch((error) => {
                console.error("EmailJS Error:", error);
                setStatus("אירעה שגיאה בשליחת אחד או יותר מהמיילים. אנא ודא שהגדרות ה-Template IDs והמפתחות נכונים.");
            });
    };
    
    // ... שאר הפונקציות וה-return נשארים כמעט זהים ...
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
            {/* ... קוד הניווט (nav) נשאר ללא שינוי ... */}
            <nav className="sticky-nav">
                <Link to="/home">
                    <img src={logo} alt="Logo" style={{ height: '7vh' }} />
                </Link>
                <div>
                    <Link to="/contact">
                        <IoMdContacts style={{ fontSize: 'x-large', marginTop: '1vh' }} />
                    </Link>
                    <a to="/user"
                        onClick={handleGoogleSignIn}
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}>
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


            <div className="contact-page">
                {/* צד ימין - טקסט */}
                <div className="contact-info">
                    <h1>שירות לקוחות</h1>
                    <p>יש לכם שאלה לגבי הזמנה או מוצר?<br />
                        זקוקים לתמיכה טכנית? עזרה בהצטרפות לשירות?<br />
                        השאירו פרטים/התקשרו ונציגנו ייצור איתכם קשר בהקדם.
                    </p>

                </div>

                {/* צד שמאל - טופס */}
                <div className="contact-form-container">
                    <form className="contact-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="שם מלא*"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className='input-contact'
                        />
                        <input
                            // **תיקון קל:** שיניתי את name מ-"phone" ל-"email"
                            type="email" 
                            name="email" 
                            placeholder="אימייל*"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className='input-contact'
                        />
                        <textarea
                            name="message"
                            placeholder="הודעה*"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className='input-contact'
                        />
                        <button type="submit">שליחת הודעה</button>
                        {status && <p className="status">{status}</p>}
                    </form>
                    
                </div>
            </div>
        </div>
    );
};

export default ConectUse;