import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from './Context';
import { ToastContainer, toast } from 'react-toastify';

// Unified soft palette
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
};

const styles = {
  page: {
    minHeight: '100vh',
    background: `linear-gradient(135deg, ${palette.bgStart} 0%, ${palette.bgEnd} 100%)`,
    padding: '2rem 0',
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    color: palette.accentDark,
  },
  userPanel: {
    width: '90vw',
    maxWidth: 600,
    margin: '2rem auto',
    padding: '2.2rem 2rem',
    background: palette.card,
    borderRadius: '1.2rem',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.07)',
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
  },
  queueContainer: {
    width: '90vw',
    maxWidth: 600,
    margin: '2rem auto',
    padding: '2.2rem 2rem',
    background: palette.cardAlt,
    borderRadius: '1.2rem',
    boxShadow: '0 8px 32px rgba(31, 38, 135, 0.07)',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.1rem 1.2rem',
    margin: '0.8rem 0',
    background: palette.card,
    borderRadius: '0.9rem',
    border: `1.5px solid ${palette.border}`,
    boxShadow: '0 2px 8px #e3e9f355',
    fontWeight: 600,
    fontSize: '1.08rem',
    color: palette.accentDark,
    transition: 'transform 0.18s, box-shadow 0.18s',
  },
  listItemHover: {
    transform: 'translateY(-2px) scale(1.01)',
    boxShadow: '0 8px 32px rgba(36,99,235,0.12)',
  },
  emergencyMessage: {
    textAlign: 'center',
    padding: '2.5rem 1.2rem',
    background: palette.dangerBg,
    borderRadius: '1.2rem',
    margin: '2rem auto',
    color: palette.danger,
    maxWidth: 600,
    boxShadow: '0 8px 32px #ff4d4f22',
  },
  timeEstimate: {
    fontSize: '1.15rem',
    fontWeight: '600',
    color: palette.subtext,
    marginTop: '1.1rem',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
  },
  avatar: {
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    background: palette.accent,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#fff',
    boxShadow: '0 2px 8px #2563eb33',
    flexShrink: 0,
  },
};

const AVERAGE_TIME_PER_PERSON = 7; // minutes

const User = () => {
  const [loggedUser, setLoggedUser] = useState('');
  const [products, setProducts] = useState([]);
  const [expectedTime, setExpectedTime] = useState('Calculating...');
  const { emergency } = useContext(DataContext);

  // Calculate expected wait time based on people ahead
  const calculateExpectedTime = (sortedProducts) => {
    const userIndex = sortedProducts.findIndex(p => p.name === loggedUser);
    if (userIndex === -1) return 'Not in queue';

    const peopleAhead = userIndex;
    const minutes = peopleAhead * AVERAGE_TIME_PER_PERSON;
    if (peopleAhead === 0) return "It's your turn!";
    if (minutes === 0) return 'Less than a minute';

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ''}${remainingMinutes}m (${peopleAhead} ahead)`;
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8080/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem("token")
        }
      });
      const result = await response.json();
      const sorted = result.data.sort((a, b) => a.token - b.token);
      setProducts(sorted);
      setExpectedTime(calculateExpectedTime(sorted));
    } catch (error) {
      toast.error("Failed to fetch queue data");
    }
  };

  useEffect(() => {
    const userName = localStorage.getItem("User-name");
    setLoggedUser(userName);
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setExpectedTime(calculateExpectedTime(products));
    // eslint-disable-next-line
  }, [products, loggedUser]);

  // Card hover effect
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div style={styles.page}>
      <div style={styles.userPanel}>
        <div style={styles.avatar}>
          {loggedUser ? loggedUser.charAt(0).toUpperCase() : 'U'}
        </div>
        <div>
          <h2 style={{ color: palette.accentDark, margin: 0, fontWeight: 800 }}>{loggedUser}</h2>
          <div style={styles.timeEstimate}>
            ⏳ Expected wait time: {!emergency?(expectedTime):(<div>NA</div>)}
          </div>
        </div>
      </div>

      {!emergency ? (
        <div style={styles.queueContainer}>
          <h3 style={{ color: palette.accentDark, marginTop: 0, fontWeight: 800 }}>Current Queue</h3>
          <ul style={{ padding: 0, margin: 0 }}>
            {products.map((val, idx) => (
              <li
                key={val._id}
                style={{
                  ...styles.listItem,
                  ...(hoveredIndex === idx ? styles.listItemHover : {}),
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div style={{ color: palette.accent, fontWeight: 700 }}>
                  🎟️ Token #{val.token}
                </div>
                <div style={{ color: palette.accentDark, fontWeight: 700 }}>
                  👤 {val.name}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div style={styles.emergencyMessage}>
          <h2 style={{ margin: 0 }}>⚠️ Emergency Interruption</h2>
          <p>Emergency patient is being treated<br />Your position in the queue will be preserved.</p>
        </div>
      )}

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
  );
};

export default User;