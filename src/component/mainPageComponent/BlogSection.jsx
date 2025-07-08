import React, { useState, useEffect, useCallback } from 'react';
import BlogCard from '../blocComponent/BlogCard';
import BlogPagination from '../blocComponent/BlogPagination';
import '../cssComponent/MainPage.css';

const BlogSection = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:5000/api/images/region');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data || data.length === 0) {
        throw new Error('No blog posts found');
      }
      
      const posts = data.map(img => ({
        id: img.id,
        title: img.name,
        text: 'Blog description text',
        image: `http://localhost:5000/api/image-blob/${img.id}`,
        link: '#'
      }));
      
      setBlogPosts(posts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogPosts();
  }, [fetchBlogPosts]);

  const postsPerPage = 6;
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = blogPosts.slice(startIndex, endIndex);

  if (loading) {
    return (
      <section className="blog-section">
        <div className="blog-container">
          <div className="blog-header">
            <h2>Նորություններ</h2>
          </div>
          <div className="blog-grid">
            <div className="loading-spinner">Բեռնվում է...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="blog-section">
        <div className="blog-container">
          <div className="blog-header">
            <h2>Նորություններ</h2>
          </div>
          <div className="blog-grid">
            <div className="error-message">
              <p>Սխալ: {error}</p>
              <button onClick={fetchBlogPosts} className="retry-btn">
                Կրկին փորձել
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-section">
      <div className="blog-container">
        <div className="blog-header">
          <h2>Նորություններ</h2>
          <button className="see-more-btn">Իմանալ ավելին</button>
        </div>
        <div className="blog-grid">
          {currentPosts.length > 0 ? (
            currentPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))
          ) : (
            <div className="no-posts">
              <p>Նորություններ չկան</p>
            </div>
          )}
        </div>
        {totalPages > 1 && (
          <BlogPagination 
            current={currentPage} 
            total={totalPages} 
            onPageChange={setCurrentPage} 
          />
        )}
      </div>
    </section>
  );
};

export default BlogSection;
