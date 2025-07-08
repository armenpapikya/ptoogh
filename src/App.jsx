import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Header from "./component/hedercomponent/Header";
import Footer from "./component/footerComponent/Footer";

const MainPage = lazy(() => import("./component/mainPageComponent/mainPage"));
const BlogPage = lazy(() => import("./component/blocComponent/BlogPage"));
const AboutPage = lazy(() => import("./component/aboutComponent/AboutPage"));
const ProductsPage = lazy(() => import("./component/productListComponent/ProductsPage"));
const LoginPage = lazy(() => import("./component/LoginPage"));
const ProfilePage = lazy(() => import("./component/ProfilePage"));
const LogoutPage = lazy(() => import("./component/LogoutPage"));
const RegisterPage = lazy(() => import("./component/RegisterPage"));
const ForgotPasswordPage = lazy(() => import('./component/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./component/ResetPasswordPage'));
const HowToUsePage = lazy(() => import('./component/HowToUsePage'));

const AppContent = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  const handleLoginSuccess = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
    navigate('/profile');
  };

  const performLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profileActiveTab");
    setUser(null);
  };

  const handleLogoutRedirect = () => {
    navigate('/logout');
  };

  const handleHeaderLoginClick = () => {
    navigate('/login');
  };

  return (
    <>
      <Header user={user} onLoginClick={handleHeaderLoginClick} />
      <Suspense fallback={
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '50vh',
          fontSize: '18px',
          color: '#666'
        }}>
          Loading...
        </div>
      }>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/how-to-use" element={<HowToUsePage />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage onLogoutRedirect={handleLogoutRedirect} />} />
          <Route path="/logout" element={<LogoutPage onLogout={performLogout} />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
