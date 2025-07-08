import React from 'react';
import BlogCard from './BlogCard';
import '../cssComponent/blogCss/BlogList.css';

const BlogList = ({ news }) => (
  <div className="news-list">
    {news.map((item, idx) => (
      <BlogCard key={idx} post={item} />
    ))}
  </div>
);

export default BlogList; 