import React from 'react';
import '../cssComponent/blogCss/BlogCard.css';

const BlogCard = ({ post }) => {
  // Add null checking for post prop
  if (!post) {
    return null; // or return a placeholder/loading component
  }

  return (
    <div className="news-card">
      <img src={post.image} alt={post.title || 'Blog post'} />
      <div className="news-card-content">
        <h3>{post.title || 'Untitled'}</h3>
        <p>{post.text || 'No description available'}</p>
        <a href={post.link || '#'} className="news-card-btn">Կարդալ ավելին</a>
      </div>
    </div>
  );
};

export default BlogCard; 