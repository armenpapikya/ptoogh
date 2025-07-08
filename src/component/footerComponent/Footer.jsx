import React from 'react';
import './../cssComponent/Footer.css';
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";
import { IoLocationOutline } from "react-icons/io5";
import { IoCallOutline } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-contact">
          <h4>Մեր մասին</h4>
          <a href="#">Հիմնադրամ</a>
          <a href="#">Աշխատանք</a>
          <a href="#">Գործընկերներ</a>
        </div>
        <div className="footer-links">
          <h4>Առաքում</h4>
          <a href="#">Մրգեր</a>
          <a href="#">Բանջարեղեն</a>
        </div>
        <div className="footer-links">
          <h4>Բլոգ</h4>
          <a href="#">Մրգեր</a>
          <a href="#">Բանջարեղեն</a>
        </div>
        <div className="footer-social">
          <h4>Կապ</h4>
          <div className="contact-info">
            <div className="contact-item">
              <IoMailOutline className="contact-icon" />
              <span>info@ptooghmarket.com</span>
            </div>
            <div className="contact-item">
              <IoLocationOutline className="contact-icon" />
              <span>ք. Երևան, Նալբանդյան 10</span>
            </div>
            <div className="contact-item">
              <IoCallOutline className="contact-icon" />
              <span>+374 43 000 000</span>
            </div>
          </div>
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 