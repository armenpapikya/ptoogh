import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { FaUser, FaHeart, FaChartBar, FaStar, FaSignOutAlt } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import "./cssComponent/ProfilePage.css";

const ProfilePage = ({ onLogoutRedirect }) => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('profileActiveTab') || "profile");
  const [loggedOut, setLoggedOut] = useState(false);
  const navigate = useNavigate();

  const menu = [
    { icon: <FaUser />, label: t('personal_data'), key: "profile" },
    { icon: <FaHeart />, label: t('favorite_products'), key: "favorites" },
    { icon: <FaChartBar />, label: t('my_orders'), key: "orders" },
    { icon: <FaStar />, label: t('coupons'), key: "coupons" },
    { icon: <FaSignOutAlt />, label: t('logout'), key: "logout" },
  ];

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authorized");
        return res.json();
      })
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <div>{t('loading')}</div>;
  if (!token || !user || loggedOut) return <Navigate to="/login" />;

  let content = null;
  if (activeTab === "profile") {
    content = (
      <div className="profile3-fields">
        <div className="profile3-field-group">
          <label>{t('name')}</label>
          <input type="text" value={user.name} readOnly />
        </div>
        <div className="profile3-field-group">
          <label>{t('email_address')}</label>
          <input type="text" value={user.email} readOnly />
        </div>
        <div className="profile3-field-group">
          <label>{t('phone_number')}</label>
          <input type="text" value={user.phone || "—"} readOnly />
        </div>
      </div>
    );
  } else if (activeTab === "favorites") {
    content = (
      <div className="profile3-empty-block">
        <div className="profile3-empty-title">{t('no_favorites')}</div>
        <div className="profile3-empty-desc">{t('add_favorites_desc')}</div>
        <button className="profile3-empty-btn">{t('add')}</button>
      </div>
    );
  } else if (activeTab === "orders") {
    content = (
      <div className="profile3-empty-block">
        <div className="profile3-empty-title">{t('no_orders')}</div>
        <div className="profile3-empty-desc">{t('no_orders_desc')}</div>
        <button className="profile3-empty-btn">{t('see_offers')}</button>
      </div>
    );
  } else if (activeTab === "coupons") {
    content = (
      <div className="profile3-empty-block">
        <div className="profile3-empty-title">{t('no_coupons')}</div>
        <div className="profile3-empty-desc">{t('no_coupons_desc')}</div>
      </div>
    );
  }

  const handleMenuClick = (key) => {
    if (key === "logout") {
      onLogoutRedirect();
      return;
    }
    setActiveTab(key);
    localStorage.setItem('profileActiveTab', key);
  };

  return (
    <div className="profile3-page">
      <div className="profile3-container">
        <div className="profile3-sidebar">
          {menu.map((item) => (
            <button
              key={item.key}
              className={`profile3-menu-item ${activeTab === item.key ? "active" : ""}`}
              onClick={() => handleMenuClick(item.key)}
            >
              <span className="profile3-menu-icon">{item.icon}</span>
              <span className="profile3-menu-label">{item.label}</span>
              <FiChevronRight className="profile3-menu-arrow" />
            </button>
          ))}
        </div>
        <div className="profile3-content">
          <div className="profile3-content-header">
            <h1>{menu.find(item => item.key === activeTab)?.label}</h1>
          </div>
          <div className="profile3-content-body">
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 