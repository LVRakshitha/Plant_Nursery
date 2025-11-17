import React, { useState, useRef } from 'react';

const recommendedPlants = [
  { id: 1, name: 'Boston Fern', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=300&q=80' },
  { id: 2, name: 'Spider Plant', image: 'https://images.unsplash.com/photo-1524594157365-5a8f6feeaede?auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Snake Plant', image: 'https://images.unsplash.com/photo-1524594157365-5a8f6feeaede?auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Calathea Orbifolia', image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=300&q=80' },
];

const initialMessages = [
  { id: 1, sender: 'expert', type: 'text', text: "Welcome to Satya Nursery! How can we help you grow today?" },
];

const fastApiBaseUrl = 'http://127.0.0.1:8000'; // Your FastAPI backend URL

const SatyaNurseryChat = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  // 🟢 Send text message to FastAPI backend
  const sendMessage = async () => {
    if (!inputValue.trim() || loading) return;

    const userMsg = { id: Date.now(), sender: 'user', type: 'text', text: inputValue.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await fetch(`${fastApiBaseUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text }),
      });
      const data = await response.json();
      const expertMsg = {
        id: Date.now() + 1,
        sender: 'expert',
        type: 'text',
        text: data.reply || 'Sorry, no response.',
      };
      setMessages(prev => [...prev, expertMsg]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'expert',
        type: 'text',
        text: 'Server error. Please try again later.',
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Handle image upload (now matches /upload backend route)
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file || loading) return;
    setLoading(true);

    const reader = new FileReader();
    reader.onload = async () => {
      const imageDataUrl = reader.result;
      const userMsg = { id: Date.now(), sender: 'user', type: 'image', image: imageDataUrl };
      setMessages(prev => [...prev, userMsg]);

      try {
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch(`${fastApiBaseUrl}/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        const expertMsg = {
          id: Date.now() + 1,
          sender: 'expert',
          type: 'text',
          text: data.analysis || 'Plant analysis complete!',
        };
        setMessages(prev => [...prev, expertMsg]);
      } catch (error) {
        console.error('Error analyzing image:', error);
        const errorMsg = {
          id: Date.now() + 1,
          sender: 'expert',
          type: 'text',
          text: 'Could not analyze image. Please try again.',
        };
        setMessages(prev => [...prev, errorMsg]);
      } finally {
        setLoading(false);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = null;
  };

  // 🟢 Start camera scanning
  const startScan = async () => {
    setIsScanning(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setTimeout(captureImage, 3000);
    } catch (error) {
      alert('Failed to access camera: ' + error.message);
      setIsScanning(false);
    }
  };

  // 🟢 Capture camera image and send to backend /upload
  const captureImage = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageDataUrl = canvas.toDataURL('image/png');

    const stream = video.srcObject;
    if (stream) stream.getTracks().forEach(track => track.stop());
    setIsScanning(false);
    setLoading(true);

    const userMsg = { id: Date.now(), sender: 'user', type: 'image', image: imageDataUrl };
    setMessages(prev => [...prev, userMsg]);

    try {
      const blob = await fetch(imageDataUrl).then(res => res.blob());
      const formData = new FormData();
      formData.append('file', blob, 'capture.png');

      const response = await fetch(`${fastApiBaseUrl}/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      const expertMsg = {
        id: Date.now() + 1,
        sender: 'expert',
        type: 'text',
        text: data.analysis || 'Plant analysis complete!',
      };
      setMessages(prev => [...prev, expertMsg]);
    } catch (error) {
      console.error('Error analyzing scanned image:', error);
      const errorMsg = {
        id: Date.now() + 1,
        sender: 'expert',
        type: 'text',
        text: 'Could not analyze scanned image. Please try again.',
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f5f6f8',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 6px rgb(0 0 0 / 0.1)',
        borderRadius: '8px',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '24px',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg height="28" width="28" viewBox="0 0 24 24" fill="#2f6b29" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C7.034 7.106 4 14 4 17c0 2.343 2.34 3 4 3s4-1.11 4-3c0-3-1.955-9.768-4-15z" />
            <path d="M17 5s2 3.961 0 7c-1.874 2.636-4 2-4 2s0-5 4-9z" />
          </svg>
          <span style={{ fontWeight: '700', fontSize: '18px', color: '#2f6b29' }}>SATYA NURSERY</span>
        </div>
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px', fontSize: '15px', color: '#4a4a4a' }}>
          <a href="#" style={{ paddingBottom: '4px', borderBottom: '2px solid #a86641', color: '#4a4a4a', textDecoration: 'none', fontWeight: '600' }}>Shop</a>
          <a href="#" style={{ color: '#4a4a4a', textDecoration: 'none' }}>Care Guides</a>
          <a href="#" style={{ color: '#4a4a4a', textDecoration: 'none' }}>Community</a>
          <a href="#" style={{ color: '#4a4a4a', textDecoration: 'none' }}>Chat</a>
          <button style={{
            backgroundColor: '#bf6e30',
            color: 'white',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 20px',
            fontWeight: '600',
            cursor: 'pointer',
          }}>Start</button>
        </nav>
      </header>

      {/* Chat + Recommendations Layout */}
      <main style={{ display: 'flex', gap: '24px', flex: 1 }}>
        {/* ✅ Chat Panel */}
        <section style={{
          backgroundColor: 'white',
          flex: 1,
          borderRadius: '14px',
          boxShadow: '0 3px 6px rgb(0 0 0 / 0.1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '20px',
          maxWidth: '800px',
          position: 'relative',
        }}>
          <div style={{ flexGrow: 1, overflowY: 'auto', paddingRight: '8px' }}>
            {messages.map(msg => (
              <div key={msg.id} style={{
                display: 'flex',
                justifyContent: msg.sender === 'user' ? 'flex-start' : 'flex-end',
                marginBottom: 16,
              }}>
                {msg.type === 'text' ? (
                  <div style={{
                    maxWidth: '75%',
                    backgroundColor: msg.sender === 'user' ? '#dff5dd' : '#bbeaff',
                    borderRadius: '16px',
                    padding: '12px 16px',
                    fontSize: 14,
                    color: '#2c3e50',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {msg.text}
                  </div>
                ) : (
                  <img
                    src={msg.image}
                    alt="Uploaded"
                    style={{
                      maxWidth: '180px',
                      maxHeight: '180px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={e => { e.preventDefault(); sendMessage(); }} style={{
            marginTop: 16,
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #ddd',
            borderRadius: '14px',
            padding: '8px 16px'
          }}>
            <input
              type="text"
              placeholder="Type your message..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              disabled={loading}
              style={{
                flexGrow: 1,
                border: 'none',
                outline: 'none',
                padding: 8,
                fontSize: 15,
              }}
            />
            <button type="submit" disabled={loading} style={{
              background: 'none',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginLeft: 8,
              fontSize: 20,
              color: loading ? '#ddd' : '#555',
            }}>➤</button>
          </form>

          {/* Upload & Scan Buttons */}
          <div style={{ marginTop: 12, display: 'flex', gap: 10 }}>
            <button
              onClick={startScan}
              disabled={loading}
              style={{
                backgroundColor: '#28a745',
                border: 'none',
                color: 'white',
                padding: '10px 16px',
                borderRadius: '20px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >Scan Image</button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <button
              onClick={() => fileInputRef.current.click()}
              disabled={loading}
              style={{
                backgroundColor: '#ffc107',
                border: 'none',
                color: 'black',
                padding: '10px 16px',
                borderRadius: '20px',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >Upload Image</button>
          </div>

          <canvas ref={canvasRef} style={{ display: 'none' }} />
        </section>

        {/* ✅ Recommended Plants */}
        <aside style={{
          backgroundColor: 'white',
          borderRadius: '14px',
          boxShadow: '0 3px 6px rgb(0 0 0 / 0.1)',
          width: '400px',
          padding: '20px',
        }}>
          <h3>Recommended Plants</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {recommendedPlants.map(p => (
              <div key={p.id} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: '#f9f9f9',
                padding: '12px',
                borderRadius: '12px',
              }}>
                <img src={p.image} alt={p.name} style={{ width: '100%', borderRadius: '12px' }} />
                <div style={{ fontWeight: '500', margin: '6px 0' }}>{p.name}</div>
                <button style={{
                  backgroundColor: '#d6eadf',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '6px 10px',
                  fontSize: 13,
                  fontWeight: '600',
                  cursor: 'pointer',
                }}>View Details</button>
              </div>
            ))}
          </div>
        </aside>
      </main>

      {/* ✅ Camera Scanning Overlay */}
      {isScanning && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, bottom: 0, right: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: 'white',
        }}>
          <video ref={videoRef} style={{ width: '100%', maxWidth: 400, borderRadius: 12 }} playsInline muted />
          <p style={{ marginTop: 12 }}>Scanning... Image will auto-capture in 3 seconds.</p>
          <button onClick={() => {
            if (videoRef.current?.srcObject) {
              videoRef.current.srcObject.getTracks().forEach(t => t.stop());
            }
            setIsScanning(false);
          }} style={{
            marginTop: 10,
            backgroundColor: '#f44336',
            border: 'none',
            borderRadius: 20,
            color: 'white',
            padding: '8px 20px',
            fontWeight: '700',
            cursor: 'pointer',
          }}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default SatyaNurseryChat;
