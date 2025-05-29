
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

// Soft, modern palette
const palette = {
  bgStart: '#f4f7fa',
  bgEnd: '#e3e9f3',
  card: '#ffffff',
  cardAlt: '#f6faff',
  accent: '#2563eb',
  accentDark: '#0e1726',
  subtext: '#64748b',
  border: '#e0e7ef',
  hover: '#e9f1fb'
}

const Login = () => {
  const [LoginInfo, setLogin] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  // Animation state for entry
  const [show, setShow] = React.useState(false)
  React.useEffect(() => {
    setTimeout(() => setShow(true), 100)
  }, [])

  const handlechange = (e) => {
    const { name, value } = e.target
    setLogin(prev => ({ ...prev, [name]: value }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const { email, password } = LoginInfo
    if (email === "" || password === "") {
      toast.error("Please fill all the fields")
      return
    }
    try {
      const url = "http://localhost:8080/auth/login"
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(LoginInfo)
      })
      const data = await response.json()
      const { message, success, jwtToken, name, error } = data
      if (success) {
        toast.success(message)
        localStorage.setItem("token", jwtToken)
        localStorage.setItem("name", name)
        setTimeout(() => navigate("/home"), 1000)
      } else if (error) {
        const details = error?.details?.[0]?.message || error
        toast.error(details)
      } else if (!success) {
        toast.error(message)
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${palette.bgStart} 0%, ${palette.bgEnd} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      padding: 0,
      margin: 0
    }}>
      {/* Header */}
      <header style={{
        marginBottom: 40,
        textAlign: 'center',
        color: palette.accentDark,
        letterSpacing: 1,
        fontWeight: 900,
        fontSize: '2.2rem',
        lineHeight: 1.2,
        textShadow: `0 2px 8px ${palette.bgEnd}55`
      }}>
        <span style={{
          background: `linear-gradient(90deg, ${palette.accent}, ${palette.accentDark})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Welcome Back
        </span>
      </header>

      {/* Login Card */}
      <div style={{
        background: palette.card,
        borderRadius: '1rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.05)',
        padding: '2.5rem 2rem',
        width: '100%',
        maxWidth: '420px',
        marginBottom: '2rem',
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.7s cubic-bezier(.23,1.02,.32,1)'
      }}>
        <h2 style={{
          color: palette.accent,
          fontWeight: 800,
          fontSize: '1.35rem',
          marginBottom: '1.7rem',
          textAlign: 'center'
        }}>
          Login
        </h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <label htmlFor="email" style={{
              color: palette.accentDark,
              fontWeight: 600,
              marginBottom: 2,
              fontSize: '1.05rem'
            }}>Email</label>
            <input
              onChange={handlechange}
              type="email"
              name="email"
              placeholder="Enter your email"
              value={LoginInfo.email}
              style={{
                padding: '0.85rem 1rem',
                border: `1.5px solid ${palette.border}`,
                borderRadius: '0.6rem',
                fontSize: '1.05rem',
                fontWeight: 500,
                color: palette.accentDark,
                background: palette.cardAlt,
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = palette.accent}
              onBlur={e => e.target.style.borderColor = palette.border}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
            <label htmlFor="password" style={{
              color: palette.accentDark,
              fontWeight: 600,
              marginBottom: 2,
              fontSize: '1.05rem'
            }}>Password</label>
            <input
              onChange={handlechange}
              type="password"
              name="password"
              placeholder="Enter your password"
              value={LoginInfo.password}
              style={{
                padding: '0.85rem 1rem',
                border: `1.5px solid ${palette.border}`,
                borderRadius: '0.6rem',
                fontSize: '1.05rem',
                fontWeight: 500,
                color: palette.accentDark,
                background: palette.cardAlt,
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onFocus={e => e.target.style.borderColor = palette.accent}
              onBlur={e => e.target.style.borderColor = palette.border}
            />
          </div>
          <button
            type="submit"
            style={{
              background: palette.accent,
              color: '#fff',
              padding: '0.85rem 1.5rem',
              borderRadius: '0.6rem',
              border: 'none',
              fontSize: '1.1rem',
              fontWeight: 700,
              cursor: 'pointer',
              marginTop: '0.5rem',
              boxShadow: `0 2px 8px ${palette.bgEnd}55`,
              transition: 'background 0.2s, transform 0.2s'
            }}
            onMouseEnter={e => e.target.style.background = palette.accentDark}
            onMouseLeave={e => e.target.style.background = palette.accent}
          >
            Login
          </button>
        </form>
        <div style={{
          marginTop: '1.2rem',
          textAlign: 'center',
          color: palette.subtext,
          fontWeight: 500,
          fontSize: '1rem'
        }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: palette.accent, fontWeight: 700, textDecoration: 'none' }}>
            SignUp
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: 50,
        color: palette.subtext,
        fontSize: '1rem',
        letterSpacing: 1,
        opacity: 0.9
      }}>
        &copy; {new Date().getFullYear()} Modern Portal
      </footer>

      <ToastContainer
        toastStyle={{
          borderRadius: '0.5rem',
          fontFamily: "'Inter', sans-serif",
          fontSize: '1.05rem'
        }}
        progressStyle={{
          background: palette.accent
        }}
      />
    </div>
  )
}

export default Login