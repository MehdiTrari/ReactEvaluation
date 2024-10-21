// src/static/footer/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>© {currentYear} - Théo &amp; Mehdi</p>
    </footer>
  );
};

export default Footer;