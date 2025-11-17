import React, { useState, useEffect } from "react";
import slide1 from "../assets/images/plant15.jpeg";
import slide2 from "../assets/images/plant14.jpeg";
import slide3 from "../assets/images/plant13.jpeg";

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
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 1rem;
            transition: all 0.3s ease;
          }

          .caption button:hover {
            background-color: #45a049;
            transform: scale(1.05);
          }

          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
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

          /* 🌿 Responsive Styles */
          @media (max-width: 1024px) {
            .caption h2 {
              font-size: 2.3rem;
            }
            .caption p {
              font-size: 1rem;
            }
          }

          @media (max-width: 768px) {
            .slider {
              height: 75vh;
              border-radius: 15px;
            }
            .caption {
              bottom: 12%;
              left: 6%;
              max-width: 90%;
            }
            .caption h2 {
              font-size: 2rem;
            }
            .caption p {
              font-size: 0.9rem;
            }
            .caption button {
              font-size: 0.9rem;
              padding: 10px 20px;
            }
            .prev, .next {
              width: 40px;
              height: 40px;
              font-size: 20px;
            }
          }

          @media (max-width: 480px) {
            .slider {
              height: 60vh;
              border-radius: 10px;
            }
            .caption h2 {
              font-size: 1.6rem;
            }
            .caption p {
              font-size: 0.85rem;
            }
            .caption button {
              padding: 8px 18px;
              font-size: 0.8rem;
            }
            .prev, .next {
              width: 35px;
              height: 35px;
              font-size: 18px;
            }
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

              {/* ✨ Caption Overlay */}
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
    </>
  );
}
