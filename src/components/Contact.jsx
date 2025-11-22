import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

const ContactUs = () => {
  const address = "AL 1, Jail Road, Hari Nagar Delhi 110064";
  const phone = "+91-123-456-7890";
  const email = "info@yourwebsite.com";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  return (
    <>
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          backgroundColor: "#e8f5e9",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2 style={{ fontSize: "2em", color: "#1f6220ff", marginBottom: "20px" }}>
          Contact Us
        </h2>

        <p style={pStyle}>
          <strong>Address:</strong> {address}
        </p>
        <p style={pStyle}>
          <strong>Phone:</strong> {phone}
        </p>
        <p style={pStyle}>
          <strong>Email:</strong>{" "}
          <a href={`mailto:${email}`} style={{ color: "#1f6220" }}>
            {email}
          </a>
        </p>
        <p style={pStyle}>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#1f6220", textDecoration: "underline" }}
          >
            View on Google Maps
          </a>
        </p>
      </div>

      <div style={footerStyle}>
        <div style={footerContainer}>

          <div style={columnStyle}>
            <h3 style={headingStyle}>Gardening Knowledge</h3>
            <p>Blogs &gt; Plant Talk</p>
            <p>Blog &gt; Kitchen Gardening</p>
            <p>Blogs &gt; Top 10 Plants</p>
            <p>Blogs &gt; Sustainable Living</p>
            <p>blog.example.com</p>
            <p>wiki.example.com</p>
          </div>

          <div style={columnStyle}>
            <h3 style={headingStyle}>Useful Links</h3>
            <p>Track Order</p>
            <p>Orders</p>
            <p>FAQ's</p>
            <p>Offers</p>
            <p>Rewards</p>
            <p>Affiliate</p>
          </div>

          <div style={columnStyle}>
            <h3 style={headingStyle}>About</h3>
            <p>About Us</p>
            <p>Contact Us</p>
            <p>Privacy Policy</p>
            <p>Refund Policy</p>
            <p>Shipping Policy</p>
            <p>Terms of Service</p>
            <p>Jobs</p>
          </div>

          <div style={columnStyle}>
            <h3 style={headingStyle}>Follow Us</h3>
            <div style={iconRow}>
              <FaFacebookF />
              <FaTwitter />
              <FaPinterestP />
              <FaInstagram />
              <FaYoutube />
              <FaLinkedinIn />
            </div>
          </div>

          <div style={columnStyle}>
            <h3 style={headingStyle}>Subscribe</h3>
            <p>Join us to receive gardening tips, offers, news & more</p>
            <input
              type="email"
              placeholder="Email address"
              style={inputStyle}
            />
            <button style={btnStyle}>Sign up</button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ContactUs;

const pStyle = {
  fontSize: "1.1em",
  lineHeight: "1.6",
  maxWidth: "800px",
  margin: "auto",
};

const footerStyle = {
  backgroundColor: "#f4f4f4",
  padding: "50px 20px",
  fontFamily: "Arial, sans-serif",
};

const footerContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "20px",
  maxWidth: "1200px",
  margin: "auto",
};

const columnStyle = {
  padding: "10px",
};

const headingStyle = {
  fontSize: "1.3em",
  marginBottom: "10px",
  color: "#1f6220",
};

const iconRow = {
  display: "flex",
  gap: "10px",
  fontSize: "20px",
  marginTop: "10px",
};

const inputStyle = {
  padding: "10px",
  width: "100%",
  marginTop: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const btnStyle = {
  marginTop: "10px",
  padding: "10px 20px",
  backgroundColor: "#1f6220ff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
