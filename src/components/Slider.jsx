import React, { useState, useEffect } from "react";
import slide1 from "../assets/images/plant15.jpeg";
import slide2 from "../assets/images/plant14.jpeg";
import slide3 from "../assets/images/plant13.jpeg";
import SatyaNurseryChat from "./chat";

const slides = [
  {
    image: slide1,
    title: "Nurture Nature",
    subtitle: "Bring the freshness of green into your home",
    buttonText: "Explore Plants",
  },
  {
    image: slide2,
    title: "Grow with Care",
    subtitle: "Sustainable beauty for your living space",
    buttonText: "Shop Now",
  },
  {
    image: slide3,
    title: "Nature’s Touch",
    subtitle: "Find plants that fit your personality",
    buttonText: "Discover More",
  },
];

export default function Slider() {
  const [index, setIndex] = useState(0);

  const [openChat, setOpenChat] = useState(false);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <>
      <style>
        {`
          .slider {
            position: relative;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            border-radius: 25px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          }

          .slider-track {
            display: flex;
            width: 100%;
            height: 100%;
            transition: transform 0.8s ease-in-out;
          }

          .slide {
            min-width: 100%;
            height: 100%;
            position: relative;
          }

          .slide img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(to top, rgba(0,0,0,0.5), transparent);
          }

          .caption {
            position: absolute;
            bottom: 15%;
            left: 8%;
            color: white;
            max-width: 500px;
            z-index: 5;
            animation: fadeInUp 1s ease;
          }

          .caption h2 {
            font-size: 3rem;
            font-weight: 700;
            margin-bottom: 10px;
          }

          .caption p {
            font-size: 1.2rem;
            margin-bottom: 20px;
          }

          .caption button {
            padding: 12px 25px;
            background-color: #1f6220ff;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
          }

          .caption button:hover {
            background-color: #1f6220ff;
            transform: scale(1.05);
          }

          .prev, .next {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(255,255,255,0.6);
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 24px;
            color: #333;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10;
          }

          .prev:hover, .next:hover {
            background: white;
            transform: translateY(-50%) scale(1.1);
          }

          .prev { left: 25px; }
          .next { right: 25px; }

          .slider-dots {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 12px;
            z-index: 10;
          }

          .slider-dots span {
            width: 12px;
            height: 12px;
            background: #bbb;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .slider-dots span.active {
            background: white;
            transform: scale(1.2);
          }

          .chat-icon {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: #1f6220ff;
            border-radius: 50%;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            z-index: 9999;
            transition: transform 0.2s ease;
          }

          .chat-icon:hover {
            transform: scale(1.1);
          }

          .chat-icon img {
            width: 30px;
            height: 30px;
            filter: invert(1);
          }

          .chat-popup {
            position: fixed;
            bottom: 100px;
            right: 30px;
            width: 420px;
            height: 580px;
            background: white;
            border-radius: 20px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.25);
            overflow: hidden;
            z-index: 10000;
            animation: popupAnim 0.3s ease;
          }

          .close-btn {
            position: absolute;
            top: 8px;
            right: 12px;
            background: none;
            border: none;
            font-size: 26px;
            cursor: pointer;
            z-index: 10001;
            color: #444;
          }

          @keyframes popupAnim {
            from { transform: scale(0.6); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }


          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>

      <div className="slider">
        <div
          className="slider-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((slide, i) => (
            <div className="slide" key={i}>
              <img src={slide.image} alt={`Slide ${i}`} />
              <div className="overlay"></div>

              <div className="caption">
                <h2>{slide.title}</h2>
                <p>{slide.subtitle}</p>
                <button>{slide.buttonText}</button>
              </div>
            </div>
          ))}
        </div>

        <button className="prev" onClick={prevSlide}>❮</button>
        <button className="next" onClick={nextSlide}>❯</button>

        <div className="slider-dots">
          {slides.map((_, i) => (
            <span
              key={i}
              onClick={() => setIndex(i)}
              className={i === index ? "active" : ""}
            ></span>
          ))}
        </div>
      </div>

      {openChat && (
      <div className="chat-popup">
        <SatyaNurseryChat />
        <button className="close-btn" onClick={() => setOpenChat(false)}>×</button>
      </div>
)}


      <div className="chat-icon" onClick={() => setOpenChat(true)}>
        <img src="https://cdn-icons-png.flaticon.com/512/134/134914.png" alt="Chat" />
      </div>


    </>
  );
}
