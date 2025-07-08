import React, { useState, useCallback } from 'react';
import './cssComponent/LoginDialog.css';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthTranslation, changeAuthPageLanguage } from '../i18n';

const initialState = { email: '', password: '' };

const LANGS = [
  { code: 'hy', label: 'ՀԱՅ' },
  { code: 'en', label: 'ENG' },
  { code: 'ru', label: 'РУС' },
];

const LoginPage = ({ onLoginSuccess }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ptooghImg, setPtooghImg] = useState('');
  const [logo, setLogo] = useState('');
  const navigate = useNavigate();
  const { t, language } = useAuthTranslation();

  const fetchImages = useCallback(async () => {
    try {
      const [backgroundResponse, logoResponse] = await Promise.all([
        fetch('http://localhost:5000/api/images/background'),
        fetch('http://localhost:5000/api/images/logo')
      ]);
      
      const backgroundData = await backgroundResponse.json();
      const logoData = await logoResponse.json();
      
      const loginBg = backgroundData.find(img => img.name.includes('Login'));
      const mainLogo = logoData.find(img => img.name === 'Logo');
      
      if (loginBg) {
        setPtooghImg(`http://localhost:5000/api/image-blob/${loginBg.id}`);
      }
      if (mainLogo) {
        setLogo(`http://localhost:5000/api/image-blob/${mainLogo.id}`);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }, []);

  React.useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name] || errors.server) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        delete newErrors.server;
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = 'required_fields';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'email_invalid';
    }
    if (!form.password) {
      newErrors.password = 'required_fields';
    }
    return newErrors;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password })
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ server: data.error });
        return;
      }
      onLoginSuccess(data);
    } catch {
      setErrors({ server: t('server_error') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="login-split left">
          <img src={ptooghImg} alt={t('fresh_vegetables')} />
        </div>
        <div className="login-split right">
          <div className="login-form-container">
            <div className="login-header">
              <img src={logo} alt="Ptoogh Logo" className="login-logo" />
              <h1 className="login-title">{t('login')}</h1>
            </div>
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className={`input-group ${errors.email ? 'error' : ''}`}>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder=" "
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="login-input"
                />
                <label htmlFor="email" className="login-label">{t('email_label')}</label>
                {errors.email && <small className="error-text">{t(errors.email)}</small>}
                {errors.server && <small className="error-text">{t(errors.server)}</small>}
              </div>
              <div className={`input-group password-group ${errors.password ? 'error' : ''}`}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder=" "
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="login-input"
                />
                <label htmlFor="password" className="login-label">{t('password_label')}</label>
                {errors.password && <small className="error-text">{t(errors.password)}</small>}
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="login-submit-btn always-gray"
              >
                {loading ? t('please_wait') : t('login')}
              </button>
              <div className="login-divider">
                <span>{t('or')}</span>
              </div>
              <button
                type="button"
                className="register-btn"
                onClick={() => navigate('/register')}
              >
                {t('register')}
              </button>
              <div className="forgot-password">
                <Link to="/forgot-password" className="forgot-link">
                  {t('forgot_password')}
                </Link>
              </div>
            </form>
            <div className="login-lang-btns">
              {LANGS.map(l => (
                <button
                  key={l.code}
                  className={`lang-btn${language === l.code ? ' active' : ''}`}
                  onClick={() => changeAuthPageLanguage(l.code)}
                  type="button"
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage; 