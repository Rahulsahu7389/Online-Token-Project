import React from 'react';
import './Home.css'; // We'll create this new file for specific styles

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="brand-title">Q track</h1>
        <nav>
          <a href="/home">Get Token</a>
          <a href="/login">Admin Login</a>
        </nav>
      </header>

      <main className="main-section">
        <h2>Welcome to Qtrack</h2>
        <p className="subtitle">A digital queue tracking system for hospitals and government offices.</p>
        <button className="main-button">Get Token</button>

        <div className="form-grid">
          <div className="card">
            <h3>Get Your Token</h3>
            <input type="text" placeholder="Department" />
            <input type="text" placeholder="Phone Number" />
            <button>Submit</button>
          </div>
          <div className="card">
            <h3>Admin Login</h3>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Log in</button>
          </div>
        </div>

        <section className="features">
          <h3>Features</h3>
          <ul>
            <li><strong>Real-Time Tracking</strong> - Monitor your queue status in real-time</li>
            <li><strong>Notifications</strong> - Receive alerts when your turn is near</li>
            <li><strong>Queue History</strong> - View your previous queue tokens</li>
            <li><strong>Admin Dashboard</strong> - Manage queues and monitor activity</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
