import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuthTranslation, changeAuthPageLanguage } from '../i18n';
import './cssComponent/LoginDialog.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [logo, setLogo] = useState('');
  const [veggies, setVeggies] = useState('');
  const { t, language } = useAuthTranslation();

  const fetchImages = useCallback(async () => {
    try {
      const [logoResponse, productResponse] = await Promise.all([
        fetch('http://localhost:5000/api/images/logo'),
        fetch('http://localhost:5000/api/images/product')
      ]);
      
      const logoData = await logoResponse.json();
      const productData = await productResponse.json();
      
      const ptooghLogo = logoData.find(img => img.name.includes('Ptoogh'));
      const banjarexen = productData.find(img => img.name.includes('Banjarexen'));
      
      if (ptooghLogo) {
        setLogo(`http://localhost:5000/api/image-blob/${ptooghLogo.id}`);
      }
      if (banjarexen) {
        setVeggies(`http://localhost:5000/api/image-blob/${banjarexen.id}`);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }, []);

  React.useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!email.trim()) {
      setError(t('required_fields'));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ? t(data.error) : t('server_error'));
      } else {
        setSuccess(t('reset_link_sent'));
      }
    } catch {
      setError(t('server_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="login-split left">
          <img src={veggies} alt={t('image')} />
        </div>
        <div className="login-split right">
          <div className="login-form-container">
            <img src={logo} alt={t('ptoogh_logo')} className="login-logo" />
            <div style={{ marginBottom: 16 }}>
              <Link to="/login" className="back-link" style={{ color: '#2e5d3a', textDecoration: 'none', fontSize: 16 }}>
                &#8592; {t('back')}
              </Link>
            </div>
            <h2 className="login-title" style={{ fontWeight: 700, fontSize: 28, marginBottom: 24 }}>{t('password_recovery')}</h2>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className={`input-group${error ? ' error' : ''}`}>
                <input
                  type="email"
                  className="login-input"
                  placeholder={t('email_placeholder')}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                {error && <small className="error-text">{error}</small>}
              </div>
              <button type="submit" className="login-submit-btn always-gray" disabled={loading}>
                {loading ? t('sending') : t('recover')}
              </button>
              {success && <div className="success-msg">{success}</div>}
            </form>
            <div style={{ marginTop: 32, textAlign: 'center' }}>
              <div className="login-lang-btns">
                <button 
                  className={`lang-btn${language === 'hy' ? ' active' : ''}`}
                  onClick={() => changeAuthPageLanguage('hy')}
                  type="button"
                >
                  ՀԱՅ
                </button>
                <button 
                  className={`lang-btn${language === 'en' ? ' active' : ''}`}
                  onClick={() => changeAuthPageLanguage('en')}
                  type="button"
                >
                  ENG
                </button>
                <button 
                  className={`lang-btn${language === 'ru' ? ' active' : ''}`}
                  onClick={() => changeAuthPageLanguage('ru')}
                  type="button"
                >
                  РУС
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 