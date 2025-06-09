"use client";

import { useState, useEffect } from 'react';

const Slideshow = () => {
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      caption: "Mountain Wilderness Adventure",
      alt: "Beautiful mountain landscape with snow-capped peaks"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      caption: "Forest Path Discovery", 
      alt: "Sunlit forest path through tall trees"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      caption: "Ocean Serenity",
      alt: "Tropical beach with crystal clear water"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      caption: "Desert Sunset Magic",
      alt: "Golden desert landscape at sunset"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="slideshow-container">
      <div className="slide-wrapper">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
          >
            <img 
              src={slide.image} 
              alt={slide.alt}
              className="slide-image"
            />
            <div className="slide-caption">
              {slide.caption}
            </div>
          </div>
        ))}
      </div>

      <button 
        className="nav-arrow prev-arrow" 
        onClick={prevSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        &#10094;
      </button>
      <button 
        className="nav-arrow next-arrow" 
        onClick={nextSlide}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        &#10095;
      </button>
    </div>
  );
};

export default Slideshow;