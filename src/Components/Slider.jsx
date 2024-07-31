import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Slideshow = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className='slideshow-container'>
      <AnimatePresence initial={false}>
        {images.map((image, index) => (
          index === currentIndex && (
            <motion.img
              ref={imageRef}
              key={image}
              src={image}
              initial={{ opacity: 0, y: 200 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -200 }}
              transition={{ duration: 1 }}
              className='slideshow-image'
            />
          )
        ))}
      </AnimatePresence>
    </div>
  );
};
