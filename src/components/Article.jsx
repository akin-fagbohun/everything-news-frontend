import { Container } from '@mantine/core';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArticleById } from '../utils/api';
import { Button, Title } from '@mantine/core';

export const Article = () => {
  const [article, setArticle] = useState([]);

  const { article_id } = useParams();
  console.log(article_id, 'article ID in Article');

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
      <Container className="article">
        <Title order={2}>{article.title}</Title>
        <p>{article.body}</p>
        <Container className="credentials" size="xs" px="xs">
          <Title order={5}>Author {article.author}</Title>
          <Title order={5}>Category {article.topic}</Title>
          <Title order={5}>Likes {article.votes}</Title>
        </Container>
        <Container className="articleComments">
          <p>comments go here</p>
        </Container>
        <Button
          type="button"
          onClick={() => {
            handleBackToArticles();
          }}
          value={article.title}
        >
          Back to Articles
        </Button>
      </Container>
    </main>
  );
};
