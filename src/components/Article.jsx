import { Container } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArticleById } from '../utils/api';
import { Button, Title } from '@mantine/core';

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

  return (
    <main>
      <section className="article">
        <h2>{article.title}</h2>
        <p>{article.body}</p>
        <Container className="credentials" size="xs" px="xs">
          <h5>Author {article.author}</h5>
          <h5>Category {article.topic}</h5>
          <h5>Likes {article.votes}</h5>
        </Container>
        <Container className="articleComments">
          <p>comments go here</p>
        </Container>
        <Button
          type="button"
          onClick={() => {
            handleBackToArticles();
          }}
        >
          Back to Articles
        </Button>
      </section>
    </main>
  );
};
