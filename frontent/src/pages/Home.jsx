
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { DataContext } from './Context'

// Soft, modern palette (same as previous pages)
const palette = {
  bgStart: '#f4f7fa',
  bgEnd: '#e3e9f3',
  card: '#ffffff',
  cardAlt: '#f6faff',
  accent: '#2563eb',
  accentDark: '#0e1726',
  subtext: '#64748b',
  border: '#e0e7ef',
  hover: '#e9f1fb',
  danger: '#ff4d4f',
  dangerBg: '#fff0f0'
}

const Home = () => {
  const [otp, setotp] = useState("");
  const { refreshFlag, emergency, handleEmerge } = React.useContext(DataContext)
  const [loggedInUser, setloggedInUser] = useState('')
  const [products, setProducts] = useState([])
  const [color, setcolor] = useState(palette.danger)
  const [bgcolor, setbgcolor] = useState(palette.card)
  const navigate = useNavigate()

  useEffect(() => {
    setloggedInUser(localStorage.getItem("name"));
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    localStorage.removeItem("code");
    toast.success("Logged out successfully!")
    setTimeout(() => {
      navigate("/login")
    }, 1200)
  }

  const handleEmergency = () => {
    handleEmerge()
  }

  useEffect(() => {
    if (emergency === true) {
      setcolor(palette.card)
      setbgcolor(palette.danger)
    } else {
      setcolor(palette.danger)
      setbgcolor(palette.card)
    }
  }, [emergency])

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products"
      const data = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      })
      const result = await data.json()
      console.log(result.code);
      setotp(result.code);
      localStorage.setItem('code',result.code);
      setProducts(result.data)
    } catch (error) {
      toast.error(error)
    }
  }

  const handleDelete = async (id) => {
    try {
      const url = `http://localhost:8080/products/${id}`
      const data = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      })
      const result = await data.json()
      toast.success(result.message)
      fetchProducts()
    } catch (error) {
      toast.error(error)
    }
  }

  useEffect(() => {
    fetchProducts()
    // eslint-disable-next-line
  }, [refreshFlag])

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${palette.bgStart} 0%, ${palette.bgEnd} 100%)`,
      fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
      padding: 0,
      margin: 0
    }}>
      {/* Navbar */}
      <div style={{
        width: "90vw",
        maxWidth: 1100,
        borderRadius: "1.1rem",
        margin: "2.2rem auto 1.2rem auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.1rem 2rem",
        background: palette.card,
        boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
        fontWeight: 700,
        fontSize: "1.1rem"
      }}>
        <span style={{ color: palette.accentDark }}>
          Welcome, <span style={{ color: palette.accent }}>{loggedInUser}</span>
        </span>
        <button
          style={{
            color: color,
            background: bgcolor,
            border: `2px solid ${palette.danger}`,
            borderRadius: "6px",
            padding: "0.5rem 1.1rem",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: emergency ? `0 0 0 3px ${palette.danger}33` : "none",
            transition: "all 0.2s"
          }}
          onClick={handleEmergency}
        >
          {emergency ? "Emergency ON" : "Emergency"}
        </button>
        <button
          // onClick={handleLogout}
          style={{
            background: palette.accent,
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1.1rem",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 2px 8px #e3e9f355",
            transition: "background 0.2s"
          }}
          onMouseEnter={e => e.target.style.background = palette.accentDark}
          onMouseLeave={e => e.target.style.background = palette.accent}
        >
          Code - {otp}
        </button>
        <button
          onClick={handleLogout}
          style={{
            background: palette.accent,
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1.1rem",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: "pointer",
            boxShadow: "0 2px 8px #e3e9f355",
            transition: "background 0.2s"
          }}
          onMouseEnter={e => e.target.style.background = palette.accentDark}
          onMouseLeave={e => e.target.style.background = palette.accent}
        >
          Logout
        </button>
      </div>

      {/* Main */}
      <div style={{
        width: "90vw",
        maxWidth: 600,
        borderRadius: "1.1rem",
        margin: "0 auto",
        padding: "2rem 2vw",
        background: palette.cardAlt,
        minHeight: "60vh",
        boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
        position: "relative"
      }}>
        {!emergency ? (
          products.length > 0 ? (
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem"
            }}>
              {products.map(val => (
                <li key={val._id}>
                  <div
                    style={{
                      background: palette.card,
                      borderRadius: "1rem",
                      boxShadow: "0 4px 20px rgba(36, 99, 235, 0.07)",
                      padding: "1.2rem 1.4rem 1.2rem 1.2rem",
                      display: "flex",
                      alignItems: "center",
                      position: "relative",
                      border: `1.5px solid ${palette.border}`,
                      minHeight: 80,
                      transition: "transform 0.18s, box-shadow 0.18s"
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = "translateY(-4px) scale(1.01)"
                      e.currentTarget.style.boxShadow = "0 8px 32px rgba(36,99,235,0.12)"
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = "none"
                      e.currentTarget.style.boxShadow = "0 4px 20px rgba(36, 99, 235, 0.07)"
                    }}
                  >
                    <div style={{
                      background: palette.accent,
                      color: "#fff",
                      borderRadius: "50%",
                      width: 38,
                      height: 38,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "1.08rem",
                      marginRight: "1.1rem",
                      boxShadow: "0 2px 8px #e3e9f355"
                    }}>
                      {val.token}
                    </div>
                    <div style={{
                      fontWeight: 700,
                      color: palette.accentDark,
                      fontSize: "1.12rem",
                      flex: 1
                    }}>
                      {val.name}
                    </div>
                    <button
                      onClick={() => handleDelete(val._id)}
                      style={{
                        background: palette.danger,
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        padding: "0.4rem 0.95rem",
                        fontWeight: 700,
                        fontSize: "0.98rem",
                        cursor: "pointer",
                        boxShadow: "0 2px 8px #ff4d4f22",
                        transition: "background 0.18s",
                        marginLeft: "1rem"
                      }}
                      onMouseEnter={e => e.target.style.background = "#b71c1c"}
                      onMouseLeave={e => e.target.style.background = palette.danger}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{
              color: palette.subtext,
              textAlign: "center",
              fontWeight: 600,
              fontSize: "1.2rem",
              marginTop: "2.5rem"
            }}>
              No products found.
            </div>
          )
        ) : (
          <div style={{
            color: palette.danger,
            background: palette.dangerBg,
            borderRadius: "1rem",
            padding: "3rem 1.5rem",
            fontWeight: 900,
            fontSize: "2rem",
            textAlign: "center",
            boxShadow: "0 4px 24px #ff4d4f22"
          }}>
            🚨 Emergency mode is ON 🚨
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: 50,
        color: palette.subtext,
        fontSize: '1rem',
        letterSpacing: 1,
        opacity: 0.9,
        textAlign: "center"
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

export default Home