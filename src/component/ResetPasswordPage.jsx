import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthTranslation, changeAuthPageLanguage } from '../i18n';
import './cssComponent/LoginDialog.css';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [logo, setLogo] = useState('');
  const [veggies, setVeggies] = useState('');

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const token = params.get('token');

  const navigate = useNavigate();
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
    if (!password || !confirm) {
      setError(t('required_fields'));
      return;
    }
    if (password !== confirm) {
      setError(t('passwords_do_not_match'));
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, token })
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ? t(data.error) : t('server_error'));
      } else {
        setSuccess(t('password_changed'));
      }
    } catch {
      setError(t('server_error'));
    } finally {
      setLoading(false);
    }
  };

  const getErrorText = (err) => {
    if (!err) return '';
    if (err === 'invalid_token') return t('invalid_token');
    if (err === 'required_fields') return t('required_fields');
    if (err === 'server_error') return t('server_error');
    if (err === 'user_not_found') return t('user_not_found');
    if (err === 'passwords_do_not_match') return t('passwords_do_not_match');
    return err;
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="login-split left">
          <img src={veggies} alt={t('image')} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="login-split right">
          <div className="login-form-container">
            <img src={logo} alt={t('ptoogh_logo')} className="login-logo" />
            <div style={{ marginBottom: 16 }}>
              <Link to="/login" className="back-link" style={{ color: '#2e5d3a', textDecoration: 'none', fontSize: 16 }}>
                &#8592; {t('back')}
              </Link>
            </div>
            <h2 className="login-title" style={{ fontWeight: 700, fontSize: 28, marginBottom: 8 }}>{t('password_recovery')}</h2>
            <div style={{ fontSize: 20, fontWeight: 500, marginBottom: 24 }}>{t('new_password')}</div>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className={`input-group${error ? ' error' : ''}`} style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="login-input"
                  placeholder={t('new_password')}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="eye-btn"
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? t('hide') : t('show')}
                >
                  {showPassword ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2e5d3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.61 3.31-4.77 6-6.11" /><path d="M1 1l22 22" /><path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c1.38 0 2.63-.83 3.16-2.03" /><path d="M14.47 14.47A3.5 3.5 0 0 1 12 8.5c-.62 0-1.2.18-1.69.49" /></svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2e5d3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3.5" /></svg>
                  )}
                </button>
              </div>
              <div className={`input-group${error ? ' error' : ''}`} style={{ position: 'relative' }}>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  className="login-input"
                  placeholder={t('confirm_new_password')}
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="eye-btn"
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0
                  }}
                  onClick={() => setShowConfirm(v => !v)}
                  aria-label={showConfirm ? t('hide') : t('show')}
                >
                  {showConfirm ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2e5d3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-5 0-9.27-3.11-11-7 1.21-2.61 3.31-4.77 6-6.11" /><path d="M1 1l22 22" /><path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c1.38 0 2.63-.83 3.16-2.03" /><path d="M14.47 14.47A3.5 3.5 0 0 1 12 8.5c-.62 0-1.2.18-1.69.49" /></svg>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2e5d3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12S5 5 12 5s11 7 11 7-4 7-11 7S1 12 1 12z" /><circle cx="12" cy="12" r="3.5" /></svg>
                  )}
                </button>
                {error && <small className="error-text">{getErrorText(error)}</small>}
              </div>
              <button type="submit" className="login-submit-btn always-gray" disabled={loading}>
                {loading ? t('sending') : t('recover')}
              </button>
              {success && <div className="success-msg">{success}</div>}
            </form>
            <div style={{ marginTop: 32, textAlign: 'center' }}>
              <div className="login-lang-btns">
                <button className={`lang-btn${language === 'hy' ? ' active' : ''}`} onClick={() => changeAuthPageLanguage('hy')}>ՀԱՅ</button>
                <button className={`lang-btn${language === 'en' ? ' active' : ''}`} onClick={() => changeAuthPageLanguage('en')}>ENG</button>
                <button className={`lang-btn${language === 'ru' ? ' active' : ''}`} onClick={() => changeAuthPageLanguage('ru')}>РУС</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage; 