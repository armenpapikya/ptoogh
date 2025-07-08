import React from 'react';
import '../cssComponent/aboutCss/AboutSection.css';

export default function AboutSection({ text, image, reverse }) {
  return (
    <div className={`about-section${reverse ? ' about-section--reverse' : ''}`}>
      <div className="about-section__text">
        <p>{text}</p>
      </div>
      <div className="about-section__img">
        <img src={image} alt="about" />
      </div>
    </div>
  );
} 