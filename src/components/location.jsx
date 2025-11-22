import React from 'react';

const Plants = () => {
  const plants = [
    {
      name: "Snake Plant",
      description: "A hardy, low-maintenance plant that purifies air and thrives in low light.",
      image: "https://via.placeholder.com/300x200?text=Snake+Plant", // Replace with actual image URL
      amazonLink: "https://www.amazon.com/s?k=snake+plant" // Replace with specific product link
    },
    {
      name: "Spider Plant",
      description: "Easy to grow with long, arching leaves; great for beginners and air purification.",
      image: "https://via.placeholder.com/300x200?text=Spider+Plant",
      amazonLink: "https://www.amazon.com/s?k=spider+plant"
    },
    {
      name: "Peace Lily",
      description: "Beautiful white flowers and excellent at removing toxins from the air.",
      image: "https://via.placeholder.com/300x200?text=Peace+Lily",
      amazonLink: "https://www.amazon.com/s?k=peace+lily"
    },
    {
      name: "Pothos",
      description: "Trailing vines that are nearly indestructible and perfect for hanging baskets.",
      image: "https://via.placeholder.com/300x200?text=Pothos",
      amazonLink: "https://www.amazon.com/s?k=pothos+plant"
    },
    {
      name: "ZZ Plant",
      description: "Drought-tolerant with glossy leaves; ideal for low-light areas.",
      image: "https://via.placeholder.com/300x200?text=ZZ+Plant",
      amazonLink: "https://www.amazon.com/s?k=zz+plant"
    },
    {
      name: "Rubber Plant",
      description: "Shiny, dark green leaves that add a tropical vibe to any room.",
      image: "https://via.placeholder.com/300x200?text=Rubber+Plant",
      amazonLink: "https://www.amazon.com/s?k=rubber+plant"
    }
  ];

  const plantsStyle = {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#e8f5e9',
    fontFamily: 'Arial, sans-serif'
  };

  const h2Style = {
    fontSize: '2em',
    color: '#1f6220ff',
    marginBottom: '20px'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px',
    maxWidth: '1200px',
    margin: 'auto'
  };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  };

  const imgStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px'
  };

  const linkStyle = {
    display: 'inline-block',
    marginTop: '10px',
    padding: '10px 15px',
    backgroundColor: '#1f6220ff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px'
  };

  return (
    <div style={plantsStyle}>
      <h2 style={h2Style}>🌿 Indoor Plants for Sale</h2>
      <div style={gridStyle}>
        {plants.map((plant, index) => (
          <div key={index} style={cardStyle}>
            <img src={plant.image} alt={plant.name} style={imgStyle} />
            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
            <a href={plant.amazonLink} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              Buy on Amazon
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plants;
