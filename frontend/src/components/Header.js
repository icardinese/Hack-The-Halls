import React from 'react';
import './Header.css';
import logo from '../images/PrediCore_AI_logo.png';

const Header = () => (
  <header className="header">
    <img src={logo} alt="Santa Hat" className="header-image" />
    <h1 className="header-logo">🎅 PrediCore AI - Christmas Edition 🎄</h1>
    <nav className="header-nav">
      <a href="/" className="nav-link">Home</a>
      <a href="/input-form" className="nav-link">Predict</a>
      <a href="/scan-pdf" className="nav-link">Scan PDF</a>
      <a href="/santa" className="nav-link">Santa Claus</a>
      <a href="/gifts" className="nav-link">Gift Suggestions</a>
      <a href="/data-analysis" className="nav-link">Data Analysis</a>
    </nav>
  </header>
);

export default Header;

