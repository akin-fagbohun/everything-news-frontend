import { Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import { getArticles } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';

export const Articles = () => {
  const [articles, setArticles] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getArticles().then(({ data }) => {
      setArticles(data.articles);
    });
  }, []); // eslint-disable-line

  useEffect(() => {}, [articles]);

  const handleReadArticle = (article_id) => {
    navigate(`/articles/${article_id}`);
  };

  return (
    <main>
      <h1>Articles</h1>
      <section className="cards">
        <ul>
          {articles.map((article) => {
            return (
              <li key={article.article_id} className="card">
                <h5>
                  <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
                </h5>
                <small>Author {article.author}</small>
                <p>Category {article.topic}</p>
                <p>Likes {article.votes}</p>
                <Button
                  type="button"
                  onClick={() => {
                    handleReadArticle(article.article_id);
                  }}
                  value={article.title}
                >
                  Read Article
                </Button>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};
