/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import HeroSection from './HeroSection';
import ProductList from './ProductList';
import '../cssComponent/MainPage.css';

const MainPage = () => {
  const [ptooghImg, setPtooghImg] = useState('');
  const [teamImages, setTeamImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   
  const { t } = useTranslation();

  const fetchImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [logoResponse, teamResponse] = await Promise.all([
        fetch('http://localhost:5000/api/images/logo'),
        fetch('http://localhost:5000/api/images/team')
      ]);
      
      if (!logoResponse.ok) {
        throw new Error('Failed to fetch logo');
      }
      
      const logoData = await logoResponse.json();
      const teamData = teamResponse.ok ? await teamResponse.json() : [];
      
      const ptooghLogo = logoData.find(img => img.name === 'Logo');
      
      if (ptooghLogo) {
        setPtooghImg(`http://localhost:5000/api/image-blob/${ptooghLogo.id}`);
      }
      
      setTeamImages(teamData.slice(0, 2));
    } catch (error) {
      console.error('Error fetching images:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const aboutSectionContent = useMemo(() => {
    if (loading) {
      return (
        <div className="about-images">
          <div className="loading-spinner">Բեռնվում է...</div>
        </div>
      );
    }
    
    if (teamImages.length > 0) {
      return (
        <div className="about-images">
          {teamImages.map((image, index) => (
            <div key={image.id} className="about-image">
              <img 
                src={`http://localhost:5000/api/image-blob/${image.id}`} 
                alt={`Team member ${index + 1}`}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="image-placeholder" style={{display: 'none'}}>
                <p>Team {index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      );
    }
    
    return (
      <div className="about-images">
        <div className="about-image">
          <div className="image-placeholder" style={{display: 'flex'}}>
            <p>Team 1</p>
          </div>
        </div>
        <div className="about-image">
          <div className="image-placeholder" style={{display: 'flex'}}>
            <p>Team 2</p>
          </div>
        </div>
      </div>
    );
  }, [loading, teamImages]);

  return (
    <div className="main-page">
      <HeroSection heroImage={ptooghImg} />
      
      <section className="about-section">
        <div className="about-container">
          <div className="about-header">
            <h2>Մեր մասին</h2>
            <button className="view-all-btn">Դիտել բոլորը</button>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>
            {aboutSectionContent}
          </div>
        </div>
      </section>
      
      <ProductList />
    </div>
  );
};

export default React.memo(MainPage);
