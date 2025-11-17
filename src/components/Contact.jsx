// ContactUs.jsx
import React from 'react';

const ContactUs = () => {
  // Contact details (customize as needed)
  const address = "AL 1, Jail Road, Hari Nagar Delhi 110064";
  const phone = "+91-123-456-7890"; // Replace with your actual phone
  const email = "info@yourwebsite.com"; // Replace with your actual email
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  // Inline styles (same as Location for consistency)
  const contactStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#e8f5e9',
    fontFamily: 'Arial, sans-serif'
  };

  const h2Style = {
    fontSize: '2em',
    color: '#2f8f2f',
    marginBottom: '20px'
  };

  const pStyle = {
    fontSize: '1.1em',
    lineHeight: '1.6',
    maxWidth: '800px',
    margin: 'auto'
  };

  return (
    <div style={contactStyle}>
      <h2 style={h2Style}>Contact Us</h2>
      <p style={pStyle}><strong>Address:</strong> {address}</p>
      <p style={pStyle}><strong>Phone:</strong> {phone}</p>
      <p style={pStyle}><strong>Email:</strong> <a href={`mailto:${email}`}>{email}</a></p>
      <p style={pStyle}>
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
          View on Google Maps
        </a>
      </p>
    </div>
  );
};

export default ContactUs;