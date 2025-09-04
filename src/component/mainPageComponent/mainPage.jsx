
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
      
      console.log('Logo data:', logoData);
      console.log('Looking for ptoogh.png filename...');
      const ptooghByFilename = logoData.find(img => img.filename === 'ptoogh.png');
      console.log('Found by filename:', ptooghByFilename);
      
      const ptooghLogo = ptooghByFilename || logoData.find(img => img.name === 'Ptoogh Logo') || logoData.find(img => img.name === 'Logo');
      console.log('Final ptoogh logo:', ptooghLogo);
      
      if (ptooghLogo) {
        const imageUrl = `http://localhost:5000/api/image-blob/${ptooghLogo.id}`;
        console.log('Setting ptoogh image URL:', imageUrl);
        setPtooghImg(imageUrl);
      } else {
        console.log('No ptoogh logo found, using fallback');
        setPtooghImg('http://localhost:5000/images/ptoogh.png');
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
                      <div className="loading-spinner">
              <div className="spinner"></div>
              <p>{t('loading')}</p>
            </div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="about-images">
          <div className="error-state">
            <p>Սխալ: {error}</p>
            <button onClick={fetchImages} className="retry-btn">
              Կրկին փորձել
            </button>
          </div>
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
                <p>{t('team')} {index + 1}</p>
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
            <p>{t('team')} 1</p>
          </div>
        </div>
        <div className="about-image">
          <div className="image-placeholder" style={{display: 'flex'}}>
            <p>{t('team')} 2</p>
          </div>
        </div>
      </div>
    );
  }, [loading, teamImages, error, fetchImages, t]);

  return (
    <div className="main-page">
      <HeroSection heroImage={ptooghImg} />
      
      <section className="about-section">
        <div className="about-container">
          <div className="about-header">
            <h2>{t('about_us')}</h2>
            <button className="view-all-btn">{t('see_more')}</button>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>
                {t('about_text_1')}
              </p>
              <p>
                {t('about_text_2')}
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
