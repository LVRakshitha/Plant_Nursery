import React from "react";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Plants from "./components/location";
import ContactUs from "./components/Contact";
import "./index.css";

export default function App() {
  return (
    <>
      <Navbar />

      <section id="home">
        <Slider />
      </section>

      <section id="about">
        <About />
      </section>

      <Gallery />
      
      <Plants />
      
      <section id="location">
        <ContactUs/>
      </section>
      
    </>
  );
}
