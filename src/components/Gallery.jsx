import React from "react";

import plant1 from "../assets/images/plant4.jpeg";
import plant2 from "../assets/images/plant5.jpeg";
import plant3 from "../assets/images/plant6.jpeg";
import plant4 from "../assets/images/plant7.jpeg";
import plant5 from "../assets/images/plant8.jpeg";
import plant6 from "../assets/images/plant9.jpeg";
import plant7 from "../assets/images/plant10.jpeg";
import plant8 from "../assets/images/plant11.jpeg";
import plant9 from "../assets/images/plant12.jpeg";
import plant10 from "../assets/images/plant13.jpeg";
import plant11 from "../assets/images/plant9.jpeg";
import plant12 from "../assets/images/plant1.jpeg";

export default function Gallery() {
  const images = [
    plant1, plant2, plant3, plant4, plant5,
    plant6, plant7, plant8, plant9, plant10,plant11, plant12
  ];

  return (
    <section className="gallery-section" id="gallery">
      <h2 className="gallery-title">🌿 Our Plant Gallery</h2>

      <div className="gallery-grid">
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Plant ${i + 1}`} className="gallery-image" />
        ))}
      </div>
    </section>
  );
}
