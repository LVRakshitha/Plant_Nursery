import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">🌿 GreenLeaf Nursery</div>
      <ul className="nav-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About Us</a></li>
        <li><a href="#gallery">Gallery</a></li>
        <li><a href="#chatbot">Chatbot</a></li>
        <li><a href="#voice">Location</a></li>
        <li><a href="#contact">Contact Us</a></li>
      </ul>
    </nav>
  );
}
