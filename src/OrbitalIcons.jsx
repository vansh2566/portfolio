import { 
  SiAdobephotoshop, 
  SiAdobeillustrator, 
  SiAdobepremierepro, 
  SiAdobeaftereffects
} from 'react-icons/si';
import { useState, useEffect, useRef } from 'react';
import './OrbitalIcons.css';

export default function OrbitalIcons() {
  const icons = [
    { Icon: SiAdobephotoshop, color: '#31A8FF', name: 'Photoshop', radius: 80, baseSpeed: 15 },
    { Icon: SiAdobeillustrator, color: '#FF9A00', name: 'Illustrator', radius: 110, baseSpeed: 17 },
    { Icon: SiAdobepremierepro, color: '#9999FF', name: 'Premiere Pro', radius: 140, baseSpeed: 19 },
    { Icon: SiAdobeaftereffects, color: '#9999FF', name: 'After Effects', radius: 170, baseSpeed: 21 }
  ];

  const [angles, setAngles] = useState([45, 120, 210, 300]);
  const velocitiesRef = useRef([1, 1, 1, 1]);
  const lastTimeRef = useRef(Date.now());

  useEffect(() => {
    const animate = () => {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      setAngles(prevAngles => {
        const newAngles = [...prevAngles];
        const newVelocities = [...velocitiesRef.current];
        
        // Update angles
        for (let i = 0; i < icons.length; i++) {
          newAngles[i] += (360 / icons[i].baseSpeed) * deltaTime * newVelocities[i];
          if (newAngles[i] >= 360) newAngles[i] -= 360;
          if (newAngles[i] < 0) newAngles[i] += 360;
        }

        // Check collisions
        for (let i = 0; i < icons.length; i++) {
          for (let j = i + 1; j < icons.length; j++) {
            const angle1 = (newAngles[i] * Math.PI) / 180;
            const angle2 = (newAngles[j] * Math.PI) / 180;
            
            const x1 = Math.cos(angle1) * icons[i].radius;
            const y1 = Math.sin(angle1) * icons[i].radius;
            const x2 = Math.cos(angle2) * icons[j].radius;
            const y2 = Math.sin(angle2) * icons[j].radius;
            
            const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
            const minDistance = 70; // Minimum distance before bounce
            
            if (distance < minDistance) {
              // Reverse velocities on collision
              newVelocities[i] *= -1;
              newVelocities[j] *= -1;
            }
          }
        }
        
        velocitiesRef.current = newVelocities;
        return newAngles;
      });
    };

    const intervalId = setInterval(animate, 16); // ~60fps
    return () => clearInterval(intervalId);
  }, [icons]);

  return (
    <div className="orbital-container">
      {icons.map((_, index) => (
        <div key={`ring-${index}`} className={`orbital-ring orbital-ring-${index + 1}`}></div>
      ))}
      
      <div className="orbital-center">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="8" stroke="rgba(255,255,255,0.6)" strokeWidth="2"/>
          <circle cx="12" cy="12" r="3" fill="rgba(255,255,255,0.8)"/>
        </svg>
      </div>

      {icons.map(({ Icon, color, name, radius }, index) => {
        const angle = (angles[index] * Math.PI) / 180;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        return (
          <div 
            key={name} 
            className="orbital-item-dynamic"
            style={{
              transform: `translate(${x}px, ${y}px)`
            }}
          >
            <Icon style={{ color, fontSize: '36px' }} />
          </div>
        );
      })}
    </div>
  );
}
