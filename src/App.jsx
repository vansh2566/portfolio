import './App.css'
import LightPillar from './LightPillar'
import Dock from './Dock'
import ProfileCard from './ProfileCard'
import { VscHome, VscProject, VscComment, VscMail, VscNote, VscAccount, VscSymbolColor, VscBriefcase, VscMenu } from 'react-icons/vsc'
import { ClipboardList } from 'lucide-react'
import { useState, useEffect } from 'react'

function App() {
  const [currentRole, setCurrentRole] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [fallingImages, setFallingImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonialAnimate, setTestimonialAnimate] = useState(false);
  const [showDock, setShowDock] = useState(false);
  const [activePage, setActivePage] = useState('Home');
  const roles = ['Video Editor', 'Graphic Designer'];

  const testimonials = [
    {
      text: "Vansh transformed our brand with stunning visuals. His attention to detail and creative vision exceeded all expectations!",
      name: "John Doe",
      title: "CEO, TechCorp",
      initials: "JD",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      text: "Working with Vansh was a game-changer for our marketing campaigns. His designs are fresh, modern, and incredibly effective!",
      name: "Sarah Miller",
      title: "Marketing Director, CreativeCo",
      initials: "SM",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      text: "The video editing skills are top-notch! Vansh delivered beyond our expectations and helped us create content that truly resonates.",
      name: "Michael Chen",
      title: "Founder, VideoHub",
      initials: "MC",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    },
    {
      text: "Professional, creative, and efficient. Vansh's work elevated our social media presence to a whole new level!",
      name: "Emily Rodriguez",
      title: "Social Media Manager, BrandWorks",
      initials: "ER",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
      gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleViewWorkClick = () => {
    const randomImages = [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=300',
      'https://images.unsplash.com/photo-1551817958-20e1d8e9f4c5?w=300',
      'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=300',
      'https://images.unsplash.com/photo-1534670007418-fbb7f6cf32c3?w=300'
    ];
    
    const newImage = {
      id: Date.now(),
      src: randomImages[Math.floor(Math.random() * randomImages.length)],
      left: Math.random() * (window.innerWidth - 200),
      rotation: Math.random() * 360 - 180
    };
    
    setFallingImages(prev => [...prev, newImage]);
    
    setTimeout(() => {
      setFallingImages(prev => prev.filter(img => img.id !== newImage.id));
    }, 3000);
  };
  
  const items = [
    { icon: <div style={{ fontSize: '18px', fontWeight: '700', color: 'white' }}>VS</div>, label: 'Logo', onClick: () => alert('Vansh Sharma!') },
    { icon: <VscHome size={20} />, label: 'Home', onClick: () => setActivePage('Home') },
    { icon: <VscAccount size={20} />, label: 'About', onClick: () => setActivePage('About') },
    { icon: <VscProject size={20} />, label: 'Projects', onClick: () => setActivePage('Projects') },
    { icon: <VscSymbolColor size={20} />, label: 'Skills', onClick: () => setActivePage('Skills') },
    { icon: <VscBriefcase size={20} />, label: 'Experience', onClick: () => setActivePage('Experience') },
    { icon: <VscComment size={20} />, label: 'Testimonials', onClick: () => setActivePage('Testimonials') },
    { icon: <VscMail size={20} />, label: 'Contact', onClick: () => setActivePage('Contact') },
  ];

  const getActiveIcon = () => {
    const activeItem = items.find(item => item.label === activePage);
    return activeItem ? activeItem.icon : <VscHome size={20} />;
  };

  return (
    <div className="App">
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        zIndex: -1, 
        backgroundColor: '#000',
        transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px)`,
        transition: 'transform 0.3s ease-out'
      }}>
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={1.0}
          rotationSpeed={0.3}
          glowAmount={0.005}
          pillarWidth={3.0}
          pillarHeight={0.4}
          noiseIntensity={0.5}
          pillarRotation={0}
          interactive={false}
          mixBlendMode="normal"
        />
      </div>
      
      <div style={{ position: 'fixed', top: '15%', left: '8%', zIndex: 50, maxWidth: '600px' }}>
        <h1 style={{ 
          color: 'white', 
          fontSize: '20px', 
          fontWeight: '400',
          margin: 0,
          lineHeight: '1.4'
        }}>
          Hey, I am <span style={{ color: '#FF9FFC' }}>Vansh</span>
        </h1>
        <div style={{
          height: '80px',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div style={{ 
            transform: `translateY(-${currentRole * 80}px)`,
            transition: 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)'
          }}>
            {roles.map((role, index) => (
              <h2 key={index} style={{ 
                color: 'white', 
                fontSize: '64px', 
                fontWeight: '900',
                fontFamily: "'Playfair Display', serif",
                margin: 0,
                padding: 0,
                lineHeight: '80px',
                height: '80px'
              }}>
                {role}
              </h2>
            ))}
          </div>
        </div>
        <p style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '16px',
          fontWeight: '400',
          margin: '20px 0 0 0',
          lineHeight: '1.6',
          maxWidth: '500px'
        }}>
          Creating stunning visual stories through expert video editing and graphic design. 
          Bringing your ideas to life with professional quality and creative excellence.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', marginTop: '30px', alignItems: 'center' }}>
          <button style={{
            background: 'rgba(255, 159, 252, 0.2)',
            backdropFilter: 'blur(10px)',
            color: 'white',
            border: '1px solid rgba(255, 159, 252, 0.4)',
            borderRadius: '30px',
            padding: '14px 32px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 159, 252, 0.35)';
            e.target.style.borderColor = 'rgba(255, 159, 252, 0.6)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 159, 252, 0.2)';
            e.target.style.borderColor = 'rgba(255, 159, 252, 0.4)';
          }}
          onClick={handleViewWorkClick}
          >
            View Work
          </button>
          
          <button style={{
            background: 'transparent',
            backdropFilter: 'blur(10px)',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          }}
          >
            <VscNote size={28} />
          </button>
        </div>
        
        <div style={{
          width: '100%',
          height: '1px',
          background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0.1) 100%)',
          marginTop: '50px'
        }}></div>
        
        <div 
          onClick={() => {
            setTestimonialAnimate(true);
            setTimeout(() => {
              setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
              setTestimonialAnimate(false);
            }, 300);
          }}
          style={{
          marginTop: '40px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          position: 'relative',
          opacity: testimonialAnimate ? 0 : 1,
          transform: testimonialAnimate ? 'translateX(-30px)' : 'translateX(0)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          e.currentTarget.style.transform = 'translateY(-5px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
        }}
        >
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '15px',
            fontStyle: 'italic',
            margin: '0 0 16px 0',
            lineHeight: '1.6'
          }}>
            "{testimonials[currentTestimonial].text}"
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              overflow: 'hidden',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
            }}>
              <img 
                src={testimonials[currentTestimonial].image}
                alt={testimonials[currentTestimonial].name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <div>
              <p style={{ color: 'white', fontSize: '14px', fontWeight: '600', margin: 0 }}>{testimonials[currentTestimonial].name}</p>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px', margin: 0 }}>{testimonials[currentTestimonial].title}</p>
            </div>
          </div>
          <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '15px',
            color: 'rgba(255, 255, 255, 0.3)',
            fontSize: '11px',
            fontWeight: '500'
          }}>
            Click to see more
          </div>
        </div>
      </div>
      
      {/* Right Side - Profile Card */}
      <div style={{ position: 'fixed', top: '50%', right: '200px', transform: 'translateY(-50%)', zIndex: 50, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <ProfileCard
          name="Vansh Sharma"
          title="Video Editor & Graphic Designer"
          status="Available for Projects"
          onContactClick={() => alert('Contact clicked!')}
          onFlipChange={setIsCardFlipped}
        />
      </div>
      
      {/* Active Page Indicator */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          right: '76px',
          transform: 'translateY(-50%)',
          zIndex: 101,
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '10px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          color: 'white'
        }}
      >
        {getActiveIcon()}
      </div>

      {/* Navbar - Always Visible */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          right: '20px',
          transform: 'translateY(-50%)',
          zIndex: 101,
          background: 'rgba(0, 0, 0, 0.4)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '8px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
        }}
      >
        <Dock 
          items={items}
          panelHeight={36}
          baseItemSize={28}
          magnification={40}
        />
      </div>

      {/* Falling Images */}
      {fallingImages.map(image => (
        <div
          key={image.id}
          onClick={() => setSelectedImage(image.src)}
          style={{
            position: 'fixed',
            left: image.left,
            top: -200,
            width: '200px',
            height: '200px',
            zIndex: 1000,
            pointerEvents: 'auto',
            cursor: 'pointer',
            animation: 'fall 3s ease-in forwards',
            transform: `rotate(${image.rotation}deg)`
          }}
        >
          <img
            src={image.src}
            alt="Work sample"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          />
        </div>
      ))}

      {/* Image Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              position: 'relative'
            }}
          >
            <img
              src={selectedImage}
              alt="Work sample enlarged"
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                objectFit: 'contain',
                borderRadius: '16px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.8)'
              }}
            />
            <button
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid white',
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fall {
          0% {
            top: -200px;
            opacity: 1;
          }
          100% {
            top: 100vh;
            opacity: 0.3;
          }
        }
      `}</style>
    </div>
  )
}

export default App
