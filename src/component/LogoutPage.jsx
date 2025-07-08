import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './cssComponent/LogoutPage.css';

const LogoutPage = ({ onLogout }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    onLogout();
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLogout, navigate]);

  return (
    <div className="logout-container">
      <div className="logout-message">
        {t('logout_message')}<br />{t('thank_you_message')}
      </div>
    </div>
  );
};

export default LogoutPage; 