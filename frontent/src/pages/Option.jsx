import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { DataContext } from './Context';
import 'react-toastify/dist/ReactToastify.css';

const Option = () => {
    const navigate = useNavigate();
    const { triggerRefresh } = React.useContext(DataContext);

    const [userInfo, setUserInfo] = React.useState({
        name: "",
        email: "",
        phone: "",
        code: "", // ✅ added field
    });

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = (phone) => /^\d{10}$/.test(phone);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, phone, code } = userInfo;

        if (!name || !email || !phone || !code) {
            return toast.error("Please fill all the fields");
        }
        if (!validateEmail(email)) return toast.error("Please enter a valid email");
        if (!validatePhone(phone)) return toast.error("Phone number must be 10 digits");

        const storedCode = localStorage.getItem("code");
        if (code !== storedCode) {
            toast.error("Invalid code entered");
            return;
        }

        try {
            localStorage.setItem("User-name", userInfo.name);
            const response = await fetch("http://localhost:8080/auth/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, phone })
            });

            const data = await response.json();
            setUserInfo({ name: "", email: "", phone: "", code: "" });
            triggerRefresh();

            if (data.success) {
                toast.success(data.message);
                setTimeout(() => navigate("/user"), 1000);
            } else {
                toast.error(data?.error?.details?.[0]?.message || data.message || "Something went wrong");
            }
        } catch (error) {
            toast.error(error.message || "Error submitting form");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <h2 style={styles.title}>Get Your Token Now</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        onChange={handleChange}
                        value={userInfo.name}
                        style={styles.input}
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        onChange={handleChange}
                        value={userInfo.email}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter phone number"
                        onChange={handleChange}
                        value={userInfo.phone}
                        style={styles.input}
                    />
                    <input
                        type="text"
                        name="code"
                        placeholder="Enter OTP Code"
                        onChange={handleChange}
                        value={userInfo.code}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.button}>Get Token</button>
                </form>
            </div>

            <div style={styles.orContainer}>
                <h4 style={{ color: '#007BFF' }}>OR</h4>
                <Link to="/login" style={styles.loginLink}>
                    <div style={styles.loginContainer}>
                        <h3>Login as Admin</h3>
                    </div>
                </Link>
            </div>
            <ToastContainer />
        </div>
    );
};

const styles = {
    page: {
        backgroundColor: '#f0f8ff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Segoe UI, sans-serif',
        padding: '20px',
    },
    container: {
        backgroundColor: '#ffffff',
        padding: '30px 40px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
    },
    title: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#007BFF',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    button: {
        padding: '12px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    orContainer: {
        marginTop: '20px',
        textAlign: 'center',
    },
    loginContainer: {
        marginTop: '10px',
        backgroundColor: '#ffffff',
        border: '2px solid #007BFF',
        padding: '15px 20px',
        borderRadius: '10px',
        color: '#007BFF',
        cursor: 'pointer',
        transition: 'background 0.3s, color 0.3s',
    },
    loginLink: {
        textDecoration: 'none',
    }
};

export default Option;


