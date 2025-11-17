import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close menu after clicking
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'chat', 'about', 'gallery', 'location', 'contact'];
      let current = 'home';
      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = section;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <style>
        {`
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 30px; /* Increased padding for more space */
            padding-bottom: 25px; /* Increased bottom padding */
            background: linear-gradient(135deg, #4CAF50, #81C784); /* Attractive green gradient background */
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1000;
            transition: all 0.3s ease;
            border-bottom: 2px solid #388E3C; /* Subtle border for definition */
          }
          .navbar.scrolled {
            background: linear-gradient(135deg, #388E3C, #66BB6A); /* Darker gradient on scroll */
            box-shadow: 0 6px 12px rgba(0,0,0,0.3);
          }
          .logo {
            font-size: 26px; /* Slightly larger for prominence */
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.3s, color 0.3s;
            color: #FFFFFF; /* White text for contrast on green background */
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3); /* Subtle shadow for depth */
          }
          .logo:hover {
            transform: scale(1.1);
            color: #FFD700; /* Gold on hover for attractiveness */
          }
          .hamburger {
            display: none;
            background: none;
            border: none;
            font-size: 28px; /* Larger icon */
            cursor: pointer;
            transition: transform 0.3s, color 0.3s;
            color: #FFFFFF;
          }
          .hamburger:hover {
            transform: rotate(90deg);
            color: #FFD700;
          }
          .nav-links {
            display: flex;
            list-style: none;
            margin: 0;
            padding: 0;
            transition: transform 0.3s ease-in-out;
          }
          .nav-links li {
            margin-left: 25px; /* More spacing between links */
          }
          .nav-links a {
            text-decoration: none;
            color: #FFFFFF; /* White text */
            font-weight: 600; /* Bolder font */
            padding: 8px 15px; /* More padding for buttons */
            border-radius: 8px; /* Rounded corners */
            transition: all 0.3s ease;
            position: relative;
            background: rgba(255, 255, 255, 0.1); /* Semi-transparent background */
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .nav-links a:hover {
            background-color: #FFD700; /* Gold hover */
            color: #388E3C; /* Green text on hover */
            transform: translateY(-2px); /* Lift effect */
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
          }
          .nav-links a.active {
            background-color: #FFD700; /* Gold for active */
            color: #388E3C;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
          }
          .nav-links a::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            width: 0;
            height: 3px; /* Thicker underline */
            background-color: #FFD700;
            transition: width 0.3s, left 0.3s;
            border-radius: 2px;
          }
          .nav-links a:hover::after,
          .nav-links a.active::after {
            width: 100%;
            left: 0;
          }
          @media (max-width: 768px) {
            .hamburger {
              display: block;
            }
            .nav-links {
              display: none;
              flex-direction: column;
              position: absolute;
              top: 100%;
              left: 0;
              width: 100%;
              background: linear-gradient(135deg, #4CAF50, #81C784); /* Matching gradient */
              padding: 15px 0;
              box-shadow: 0 4px 8px rgba(0,0,0,0.2);
              transform: translateY(-100%);
              opacity: 0;
              border-top: 2px solid #388E3C;
            }
            .nav-links.open {
              display: flex;
              transform: translateY(0);
              opacity: 1;
            }
            .nav-links li {
              margin: 15px 0;
              text-align: center;
            }
            .nav-links a {
              margin: 5px 20px;
              width: calc(100% - 40px);
            }
          }
        `}
      </style>
      <nav className={`navbar ${window.scrollY > 50 ? 'scrolled' : ''}`}>
        <div className="logo" onClick={() => scrollToSection('home')}>🌿 पौधा by Satya Nursery</div>
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>
        <ul className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <li><a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>Home</a></li>
          <li><a href="#chat" className={activeSection === 'chat' ? 'active' : ''} onClick={() => scrollToSection('chat')}>Chat</a></li>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={() => scrollToSection('about')}>About Us</a></li>
          <li><a href="#gallery" className={activeSection === 'gallery' ? 'active' : ''} onClick={() => scrollToSection('gallery')}>Gallery</a></li>
          <li><a href="#location" className={activeSection === 'location' ? 'active' : ''} onClick={() => scrollToSection('location')}>Shop</a></li>
          <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>Contact Us</a></li>
        </ul>
      </nav>
    </>
  );
}
