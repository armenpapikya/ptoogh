import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { BsChatDots } from 'react-icons/bs';
import '../cssComponent/MainPage.css';

const HeroSection = ({ heroImage }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const ptooghImg = heroImage || 'http://localhost:5000/images/ptoogh.png';
  
  console.log('HeroSection received heroImage:', heroImage);
  console.log('HeroSection using ptooghImg:', ptooghImg);

  const handleHowToUseClick = () => {
    navigate('/how-to-use');
  };

  return (
    <section className="heroSection">
      <div className="mainPage">
        <div className="mainPage-container">
          <div className="textContent">
            <h1>{t('join_community')}</h1>
            <p>{t('ptoogh_description')}</p>
            <button className="heroMainBtn" onClick={handleHowToUseClick}>
              {t('how_to_use')}
            </button>
          </div>
          <div className="imageContent">
            <div className="hero-image-container">
              <img 
                src={ptooghImg} 
                alt="Ptoogh" 
                onError={(e) => {
                  e.target.src = '/ptoogh.png';
                }}
              />
            </div>
          </div>
          <div className="floatingBtnWrapper">
            <button className="floatingContactBtn" title={t('feedback')}>
              <BsChatDots />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 