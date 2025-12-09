'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';

import './Dock.css';

function DockItem({ children, className = '', onClick, mouseX, spring, distance, magnification, baseItemSize }) {
  const ref = useRef(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      width: baseItemSize
    };
    return val - rect.x - baseItemSize / 2;
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, {
    mass: 0.1,
    stiffness: 200,
    damping: 15
  });

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size,
        minWidth: baseItemSize,
        minHeight: baseItemSize
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={`dock-item ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, child => cloneElement(child, { isHovered }))}
    </motion.div>
  );
}

function DockLabel({ children, className = '', ...rest }) {
  const { isHovered } = rest;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, x: -10 }}
          exit={{ opacity: 0, x: 0 }}
          transition={{ duration: 0.2 }}
          className={`dock-label ${className}`}
          role="tooltip"
          style={{ y: '-50%' }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function DockIcon({ children, className = '' }) {
  return <div className={`dock-icon ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 68,
  dockHeight = 256,
  baseItemSize = 50
}) {
  const mouseX = useMotionValue(Infinity);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div className="dock-outer">
      <motion.div
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => {
          setIsExpanded(false);
          mouseX.set(Infinity);
        }}
        onMouseMove={({ pageX }) => {
          mouseX.set(pageX);
        }}
        className={`dock-panel ${className}`}
        role="toolbar"
        aria-label="Application dock"
        style={{
          gap: isExpanded ? '8px' : '0px'
        }}
      >
        <AnimatePresence>
          {isExpanded && items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.04,
                ease: [0.4, 0, 0.2, 1]
              }}
            >
              <DockItem
                onClick={item.onClick}
                className={item.className}
                mouseX={mouseX}
                spring={spring}
                distance={distance}
                magnification={magnification}
                baseItemSize={baseItemSize}
              >
                <DockIcon>{item.icon}</DockIcon>
                <DockLabel>{item.label}</DockLabel>
              </DockItem>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
