import React, { useState, useCallback } from 'react';
import '../component/cssComponent/LoginDialog.css';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useAuthTranslation, changeAuthPageLanguage } from '../i18n';

const initialState = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
};

const LANGS = [
  { code: 'hy', label: 'ՀԱՅ' },
  { code: 'en', label: 'ENG' },
  { code: 'ru', label: 'РУС' },
];

const RegisterPage = () => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'required_fields';
    if (!form.email.trim()) {
      newErrors.email = 'required_fields';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'email_invalid';
    }
    if (!form.phone.trim()) newErrors.phone = 'required_fields';
    if (!form.password) newErrors.password = 'required_fields';
    if (!form.confirmPassword) newErrors.confirmPassword = 'required_fields';
    if (form.password && form.confirmPassword && form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'passwords_not_match';
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
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password
        })
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ server: data.error });
        return;
      }
      navigate('/login');
    } catch (err) {
      console.error('Registration error:', err);
      setErrors({ server: t('server_error') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <div className="login-split left">
          <img src={ptooghImg} alt="Fresh vegetables" />
        </div>
        <div className="login-split right">
          <div className="login-form-container">
            <div style={{ width: '100%', marginBottom: 10 }}>
              <button
                type="button"
                className="back-link"
                style={{ background: 'none', border: 'none', color: '#222', fontSize: 15, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                onClick={() => navigate('/login')}
              >
                <span style={{ fontSize: 18, lineHeight: 1, display: 'inline-block', transform: 'translateY(1px)' }}>&larr;</span>
                <span>{t('back_to_login')}</span>
              </button>
            </div>
            <div className="login-header">
              <img src={logo} alt="Ptoogh Logo" className="login-logo" />
              <h1 className="login-title">{t('register')}</h1>
            </div>
            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className={`input-group ${errors.name ? 'error' : ''}`}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder=" "
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="login-input"
                />
                <label htmlFor="name" className="login-label">{t('name_label')}</label>
                {errors.name && <small className="error-text">{t(errors.name)}</small>}
              </div>
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
              </div>
              <div className={`input-group ${errors.phone ? 'error' : ''}`}>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder=" "
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="login-input"
                />
                <label htmlFor="phone" className="login-label">{t('phone_label')}</label>
                {errors.phone && <small className="error-text">{t(errors.phone)}</small>}
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
              <div className={`input-group password-group ${errors.confirmPassword ? 'error' : ''}`}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder=" "
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="login-input"
                />
                <label htmlFor="confirmPassword" className="login-label">{t('confirm_password_label')}</label>
                {errors.confirmPassword && <small className="error-text">{t(errors.confirmPassword)}</small>}
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
              {errors.server && <div className="error-msg server-error">{t(errors.server)}</div>}
              <button type="submit" disabled={loading} className="login-submit-btn">
                {loading ? t('please_wait') : t('register')}
              </button>
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

export default RegisterPage; 