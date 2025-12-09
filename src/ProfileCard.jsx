import { useState, useEffect } from 'react';
import vanshImage from './assets/vansh png 2.png';

export default function ProfileCard({
  name = "Vansh Sharma",
  title = "Video Editor & Graphic Designer",
  status = "Available for Projects",
  onContactClick = () => {},
  onFlipChange = () => {}
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);
  const [showWarningCard, setShowWarningCard] = useState(false);
  const [showWarningText, setShowWarningText] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);

  useEffect(() => {
    onFlipChange(isFlipped);
  }, [isFlipped, onFlipChange]);

  useEffect(() => {
    if (isFlipped) {
      const timer = setTimeout(() => {
        setShowCTA(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowCTA(false);
    }
  }, [isFlipped]);

  const handleButtonClick = () => {
    setIsFlipped(true);
    // Show warning card - 1 second after card disappears
    setTimeout(() => {
      setShowWarningCard(true);
      // Show subtext - 0.5s after warning text appears
      setTimeout(() => {
        setShowSubtext(true);
        // Show CTA button - 5s after subtext
        setTimeout(() => {
          setShowCTA(true);
        }, 2000);
      }, 1000);
    }, 0);
  };

  const handleCTAClick = () => {
    onContactClick();
    setShowWarningCard(false);
    setShowWarningText(false);
    setShowSubtext(false);
    setShowCTA(false);
    setIsFlipped(false);
  };

  const handleBackClick = () => {
    setShowWarningCard(false);
    setShowWarningText(false);
    setShowSubtext(false);
    setShowCTA(false);
    setIsFlipped(false);
  };

  return (
    <div
      style={{
        width: '380px',
        height: '500px',
        perspective: '1000px',
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s ease-out',
        filter: isFlipped ? 'drop-shadow(0 0 20px rgba(147, 51, 234, 0.6)) blur(8px)' : 'drop-shadow(0 8px 32px rgba(0, 0, 0, 0.3))',
        opacity: isFlipped ? 0 : 1
      }}>
        {/* Front Side */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          MozBackfaceVisibility: 'hidden',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          overflow: 'hidden'
        }}>
          <img 
            src={vanshImage} 
            alt="Vansh Sharma"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top'
            }}
          />

          <button
            onClick={handleButtonClick}
            onMouseEnter={() => setButtonHovered(true)}
            onMouseLeave={() => setButtonHovered(false)}
            style={{
              position: 'relative',
              zIndex: 10,
              width: 'calc(100% - 64px)',
              margin: '32px',
              background: buttonHovered 
                ? 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)'
                : 'linear-gradient(135deg, #5227FF 0%, #9333ea 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 24px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: buttonHovered
                ? '0 8px 24px rgba(147, 51, 234, 0.5)'
                : '0 4px 16px rgba(147, 51, 234, 0.3)',
              transform: buttonHovered ? 'translateY(-2px)' : 'translateY(0)'
            }}
          >
            Do Not Click This
          </button>
        </div>

        {/* Back Side */}
        <div 
          onClick={handleBackClick}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            MozBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(145deg, rgba(30, 30, 40, 0.95), rgba(20, 20, 30, 0.95))',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(147, 51, 234, 0.3)',
            borderRadius: '24px',
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            cursor: 'pointer'
          }}>
          <div style={{
            textAlign: 'center',
            animation: 'fadeIn 0.4s ease-out'
          }}>
            <h2 style={{
              color: 'white',
              fontSize: '36px',
              fontWeight: '700',
              margin: 0,
              lineHeight: '1.2'
            }}>
              ⚠️ You were warned.
            </h2>
          </div>

          <div style={{
            textAlign: 'center',
            animation: 'fadeIn 0.4s ease-out 0.2s both'
          }}>
            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '16px',
              fontWeight: '400',
              margin: 0,
              lineHeight: '1.5'
            }}>
              Since you're already here…
            </p>
          </div>

          <div style={{ width: '100%', minHeight: '50px', textAlign: 'center' }}>
            {showCTA && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCTAClick();
                }}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #5227FF 0%, #9333ea 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '14px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(147, 51, 234, 0.4)',
                  animation: 'fadeSlideUp 0.5s ease-out',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(147, 51, 234, 0.6)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 16px rgba(147, 51, 234, 0.4)';
                }}
              >
                Okay, Book a Call
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Warning Card - appears after original card disappears */}
      {showWarningCard && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          borderRadius: '24px',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          animation: 'cardZoomIn 1s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}>
          <div style={{
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px'
          }}>
            <div style={{ 
              fontSize: '64px',
              animation: 'iconPulse 0.6s ease-out'
            }}>⚠️</div>
            <h2 style={{
              color: 'white',
              fontSize: '42px',
              fontWeight: '700',
              margin: 0,
              lineHeight: '1.2',
              whiteSpace: 'nowrap',
              animation: 'textSlideIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.3s both'
            }}>
              You were warned!
            </h2>
          </div>
            
          {showSubtext && (
            <p style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '18px',
              fontWeight: '400',
              margin: 0,
              lineHeight: '1.5',
              textAlign: 'center',
              animation: 'fadeSlideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}>
              Since you're already here…
            </p>
          )}

          {showCTA && (
            <button
              onClick={handleCTAClick}
              style={{
                width: '100%',
                maxWidth: '280px',
                background: 'linear-gradient(135deg, #5227FF 0%, #9333ea 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 32px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(147, 51, 234, 0.4)',
                animation: 'buttonBounceIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transition: 'all 0.3s ease',
                marginTop: '8px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 8px 24px rgba(147, 51, 234, 0.6)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 4px 16px rgba(147, 51, 234, 0.4)';
              }}
            >
              Okay, Book a Call
            </button>
          )}
        </div>
      )}

      <style>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes cardZoomIn {
          0% {
            opacity: 0;
            transform: scale(0.5);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes iconPulse {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        @keyframes textSlideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes buttonBounceIn {
          0% {
            opacity: 0;
            transform: translateX(-100px);
          }
          60% {
            transform: translateX(10px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
