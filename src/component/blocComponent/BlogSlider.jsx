import React from "react";
import { useTranslation } from 'react-i18next';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../cssComponent/blogCss/BlogSlider.css';

const BlogSlider = ({ slides }) => {
  const { t } = useTranslation();
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    customPaging: () => <div className="custom-dot" />,
    dotsClass: "slick-dots custom-dots",
    adaptiveHeight: false,
  };

  return (
    <section style={{ background: "#F6F7FA", padding: "60px 0", width: "100vw", position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw" }}>
      <div className="sectionHeader">
        <h2>{t('news')}</h2>
      </div>
      <div className="news-slider">
        <div className="news-slider-inner">
          <Slider {...settings}>
            {slides.map((slide, idx) => (
              <div className="news-slide" key={idx}>
                <div className="news-slide-content">
                  <h2>{slide.title}</h2>
                  <p>{slide.text}</p>
                  <a href={slide.link} className="news-slide-btn">{t('see_more')}</a>
                </div>
                <img src={slide.image} alt={slide.title} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default BlogSlider;
