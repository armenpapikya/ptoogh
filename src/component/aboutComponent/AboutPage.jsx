import React from 'react';
import '../cssComponent/aboutCss/AboutPage.css';

const AboutPage = () => {

  return (
    <div className="about-page">
      {/* Header Section */}
      <div className="about-header">
        <h1 className="about-title">Մեր մասին</h1>
        <button className="about-more-btn">Իմանալ ավելին</button>
      </div>

      {/* Content Section */}
      <div className="about-content">
        {/* First Block - Text Left, Image Right */}
        <div className="about-block">
          <div className="about-text-block">
            <p>
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words even slightly believable. If you are going to use a passage of rassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined ch ecessary, making this the first true generator on the ILorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>
          <div className="about-image-block">
            <img 
              src="http://localhost:5000/images/team_1.jpg" 
              alt="Team 1" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="image-placeholder" style={{display: 'none'}}>
              <p>Team Image 1</p>
            </div>
          </div>
        </div>

        {/* Second Block - Image Left, Text Right */}
        <div className="about-block about-block--reverse">
          <div className="about-image-block">
            <img 
              src="http://localhost:5000/images/team_2.jpg" 
              alt="Team 2" 
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="image-placeholder" style={{display: 'none'}}>
              <p>Team Image 2</p>
            </div>
          </div>
          <div className="about-text-block">
            <p>
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words even slightly believable. If you are going to use a passage of rassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined ch ecessary, making this the first true generator on the ILorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 