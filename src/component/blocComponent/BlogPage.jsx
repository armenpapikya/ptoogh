import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import BlogSlider from './BlogSlider';
import BlogList from './BlogList';
import BlogPagination from './BlogPagination';
import '../cssComponent/blogCss/BlogPage.css';

const BlogPage = () => {
  const [slides, setSlides] = useState([]);
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useTranslation();

  const fetchBlogData = useCallback(async () => {
    try {
      const [productResponse, regionResponse] = await Promise.all([
        fetch('http://localhost:5000/api/images/product'),
        fetch('http://localhost:5000/api/images/region')
      ]);
      
      const productData = await productResponse.json();
      const regionData = await regionResponse.json();
      
      const pomidor = productData.find(img => img.name.includes('Pomidor'));
      const suynik = regionData.find(img => img.name.includes('Suynik'));
      const lori = regionData.find(img => img.name.includes('Lori'));
      const gegharkunik = regionData.find(img => img.name.includes('Gegharkunik'));
      
      const slidesData = [
        {
          id: 1,
          image: pomidor ? `http://localhost:5000/api/image-blob/${pomidor.id}` : '',
          title: t('pomegranate'),
          text: t('blog_description'),
          link: '#'
        },
        {
          id: 2,
          image: pomidor ? `http://localhost:5000/api/image-blob/${pomidor.id}` : '',
          title: t('peach'),
          text: t('blog_description'),
          link: '#'
        }
      ];
      
      const newsData = [
        { image: suynik ? `http://localhost:5000/api/image-blob/${suynik.id}` : '', title: t('syunik_region'), text: t('blog_description'), link: '#' },
        { image: lori ? `http://localhost:5000/api/image-blob/${lori.id}` : '', title: t('lori_region'), text: t('blog_description'), link: '#' },
        { image: suynik ? `http://localhost:5000/api/image-blob/${suynik.id}` : '', title: t('syunik_region'), text: t('blog_description'), link: '#' },
        { image: gegharkunik ? `http://localhost:5000/api/image-blob/${gegharkunik.id}` : '', title: t('gegharkunik_region'), text: t('blog_description'), link: '#' },
        { image: lori ? `http://localhost:5000/api/image-blob/${lori.id}` : '', title: t('lori_region'), text: 'Extra news 1', link: '#' },
        { image: suynik ? `http://localhost:5000/api/image-blob/${suynik.id}` : '', title: t('syunik_region'), text: 'Extra news 2', link: '#' },
        { image: gegharkunik ? `http://localhost:5000/api/image-blob/${gegharkunik.id}` : '', title: t('gegharkunik_region'), text: 'Extra news 3', link: '#' },
        { image: lori ? `http://localhost:5000/api/image-blob/${lori.id}` : '', title: t('lori_region'), text: 'Extra news 4', link: '#' },
        { image: suynik ? `http://localhost:5000/api/image-blob/${suynik.id}` : '', title: t('syunik_region'), text: 'Extra news 5', link: '#' },
        { image: gegharkunik ? `http://localhost:5000/api/image-blob/${gegharkunik.id}` : '', title: t('gegharkunik_region'), text: 'Extra news 6', link: '#' },
        { image: lori ? `http://localhost:5000/api/image-blob/${lori.id}` : '', title: t('lori_region'), text: 'Extra news 7', link: '#' },
        { image: suynik ? `http://localhost:5000/api/image-blob/${suynik.id}` : '', title: t('syunik_region'), text: 'Extra news 8', link: '#' },
        { image: gegharkunik ? `http://localhost:5000/api/image-blob/${gegharkunik.id}` : '', title: t('gegharkunik_region'), text: 'Extra news 9', link: '#' },
        { image: lori ? `http://localhost:5000/api/image-blob/${lori.id}` : '', title: t('lori_region'), text: 'Extra news 10', link: '#' },
        { image: suynik ? `http://localhost:5000/api/image-blob/${suynik.id}` : '', title: t('syunik_region'), text: 'Extra news 11', link: '#' },
        { image: gegharkunik ? `http://localhost:5000/api/image-blob/${gegharkunik.id}` : '', title: t('gegharkunik_region'), text: 'Extra news 12', link: '#' },
        { image: lori ? `http://localhost:5000/api/image-blob/${lori.id}` : '', title: t('lori_region'), text: 'Extra news 13', link: '#' },
        { image: suynik ? `http://localhost:5000/api/image-blob/${suynik.id}` : '', title: t('syunik_region'), text: 'Extra news 14', link: '#' },
        { image: gegharkunik ? `http://localhost:5000/api/image-blob/${gegharkunik.id}` : '', title: t('gegharkunik_region'), text: 'Extra news 15', link: '#' },
        { image: lori ? `http://localhost:5000/api/image-blob/${lori.id}` : '', title: t('lori_region'), text: 'Extra news 16', link: '#' }
      ];
      
      setSlides(slidesData);
      setNews(newsData);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  }, [t]);

  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);

  const postsPerPage = 6;
  const totalPages = Math.ceil(news.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentNews = news.slice(startIndex, endIndex);

  return (
    <div className="blog-page">
      <div className="blog-container">
        <BlogSlider slides={slides} />
        <div className="blog-content">
          <div className="blog-header">
            <h1>{t('news')}</h1>
          </div>
          <BlogList news={currentNews} />
          {totalPages > 1 && (
            <BlogPagination 
              current={currentPage} 
              total={totalPages} 
              onPageChange={setCurrentPage} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;