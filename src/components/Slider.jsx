import React, { useState, useEffect } from "react";

import slide1 from "../assets/images/plant15.jpeg";
import slide2 from "../assets/images/plant14.jpeg";
import slide3 from "../assets/images/plant13.jpeg";

const images = [slide1, slide2, slide3];

export default function Slider() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((index + 1) % images.length);
  const prevSlide = () =>
    setIndex((index - 1 + images.length) % images.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 3000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <>
      {/* FULL SCREEN SLIDER */}
      <div className="slider fullscreen-slider">
        <img src={images[index]} alt="Plant" className="slide-image" />
        <button className="prev" onClick={prevSlide}>❮</button>
        <button className="next" onClick={nextSlide}>❯</button>
      </div>
    </>
  );
}
