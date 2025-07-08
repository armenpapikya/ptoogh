import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import './cssComponent/LoginDialog.css';

const LoginDialog = ({ isOpen, onClose, onLoginSuccess }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [ptooghImg, setPtooghImg] = useState('');
  const { t } = useTranslation();

  const fetchImages = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/images/logo');
      const data = await response.json();
      
      const ptooghLogo = data.find(img => img.name.includes('Ptoogh'));
      
      if (ptooghLogo) {
        setPtooghImg(`http://localhost:5000/api/image-blob/${ptooghLogo.id}`);
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
      const res = await fetch(`http://localhost:5000${url}`, {
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
      onClose();
    } catch {
      setErrors({ server: t('server_error') });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-dialog-overlay" onClick={onClose}>
      <div className="login-dialog" onClick={e => e.stopPropagation()}>
        <div className="login-dialog-header">
          <img src={ptooghImg} alt="Ptoogh Logo" className="login-dialog-logo" />
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>
        <form className="login-dialog-form" onSubmit={handleSubmit}>
          <div className={`input-group ${errors.email ? 'error' : ''}`}>
            <input
              type="email"
              name="email"
              placeholder={t('email_label')}
              value={form.email}
              onChange={handleChange}
              required
              className="login-dialog-input"
            />
            {errors.email && <small className="error-text">{t(errors.email)}</small>}
          </div>
          <div className={`input-group ${errors.password ? 'error' : ''}`}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder={t('password_label')}
              value={form.password}
              onChange={handleChange}
              required
              className="login-dialog-input"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
            </button>
            {errors.password && <small className="error-text">{t(errors.password)}</small>}
          </div>
          {errors.server && <div className="error-msg">{t(errors.server)}</div>}
          <button
            type="submit"
            disabled={loading}
            className="login-dialog-submit"
          >
            {loading ? t('please_wait') : t('login')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginDialog; 