import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArticleById } from '../utils/api';
import { Button } from '@mantine/core';

export const Article = () => {
  const [article, setArticle] = useState([]);

  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id).then(({ data }) => {
      setArticle(data.article);
    });
  }, [article_id]);

  const handleBackToArticles = () => {
    console.log('inside button click');
  };

  const handleLikes = () => {
    console.log('inside button click');
  };

  return (
    <main>
      <section className="article">
        <div className="articleTitle">
          <h2>{article.title}</h2>
        </div>
        <div className="articleBody">
          <p>{article.body}</p>
        </div>
        <div className="credentials">
          <small>Article written by {article.author}</small>
          <p>Category {article.topic}</p>
          <p>Likes {article.votes}</p>
        </div>
        <button
          className="btn"
          type="button"
          onClick={() => {
            handleLikes();
          }}
        >
          Like 💫
        </button>

        <button
          className="btn"
          type="button"
          onClick={() => {
            handleBackToArticles();
          }}
        >
          Back to Articles
        </button>
      </section>
      <section>
        <div className="articleComments">
          <p>comments go here</p>
        </div>
      </section>
    </main>
  );
};
