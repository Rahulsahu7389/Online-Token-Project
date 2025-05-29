import React from 'react'
import { Link } from 'react-router-dom'

// Custom palette for soft background and visible fonts
const palette = {
  bgStart: '#f4f7fa',    // Very light blue-gray
  bgEnd:   '#e3e9f3',    // Soft blue-gray
  card1:   '#ffffff',    // White card
  card2:   '#f6faff',    // Slightly blue-tinted card
  accent:  '#2563eb',    // Blue accent for headings
  accent2: '#0e1726',    // Almost black for max contrast
  subtext: '#64748b',    // Soft gray-blue for subtext
  hover:   '#e0e7ef',    // Subtle hover
}

const Option1 = () => {
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
      margin: 0,
    }}>
      {/* Header */}
      <header style={{
        marginBottom: 40,
        textAlign: 'center',
        color: palette.accent2,
        letterSpacing: 1,
        fontWeight: 900,
        fontSize: '2.3rem',
        lineHeight: 1.2,
        textShadow: `0 2px 8px ${palette.bgEnd}55`,
      }}>
        <span style={{
          background: `linear-gradient(90deg, ${palette.accent}, ${palette.accent2})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Welcome to the Q-Track
        </span>
      </header>

      {/* Option Cards */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        width: '100%',
        maxWidth: 400,
      }}>
        {/* Card 1 */}
        <div style={{
          borderRadius: 18,
          background: palette.card1,
          boxShadow: `0 4px 24px ${palette.bgEnd}44`,
          border: `1px solid ${palette.bgEnd}`,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}>
          <Link
            to="/token"
            style={{
              display: 'block',
              textDecoration: 'none',
              padding: '32px 0',
              textAlign: 'center',
              borderRadius: 18,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = palette.hover}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <h2 style={{
              color: palette.accent,
              fontSize: '1.8rem',
              fontWeight: 800,
              letterSpacing: 1,
              margin: 0,
              transition: 'color 0.2s',
              textShadow: '0 1px 0 #fff',
            }}>
              GET YOUR TOKEN
            </h2>
            <div style={{
              fontSize: '1.1rem',
              color: palette.subtext,
              marginTop: 8,
              fontWeight: 500,
              letterSpacing: 0.5,
            }}>
              Fast & Secure Access
            </div>
          </Link>
        </div>

        {/* Card 2 */}
        <div style={{
          borderRadius: 18,
          background: palette.card2,
          boxShadow: `0 4px 24px ${palette.bgEnd}44`,
          border: `1px solid ${palette.bgEnd}`,
          transition: 'transform 0.2s, box-shadow 0.2s',
        }}>
          <Link
            to="/login"
            style={{
              display: 'block',
              textDecoration: 'none',
              padding: '32px 0',
              textAlign: 'center',
              borderRadius: 18,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = palette.hover}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <h2 style={{
              color: palette.accent2,
              fontSize: '1.8rem',
              fontWeight: 800,
              letterSpacing: 1,
              margin: 0,
              transition: 'color 0.2s',
              textShadow: '0 1px 0 #fff',
            }}>
              LOGIN AS ADMIN
            </h2>
            <div style={{
              fontSize: '1.1rem',
              color: palette.subtext,
              marginTop: 8,
              fontWeight: 500,
              letterSpacing: 0.5,
            }}>
              Admin Dashboard Access
            </div>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        marginTop: 60,
        color: palette.subtext,
        fontSize: '1rem',
        letterSpacing: 1,
        opacity: 0.9,
      }}>
        &copy; {new Date().getFullYear()} Modern Portal
      </footer>
    </div>
  )
}

export default Option1