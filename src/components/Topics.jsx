import { Button } from '@mantine/core';
import { useState, useEffect } from 'react';
import { getTopics } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';

export const Topics = () => {
  const [topics, setTopics] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getTopics().then(({ data }) => {
      setTopics(data.topics);
    });
  }, []);

  const handleViewTopic = (topic) => {
    navigate(`/articles/topics/${topic}`);
  };

  return (
    <main>
      <h1>Browse by Topic</h1>
      <section className="cards">
        <ul>
          {topics.map((topic) => {
            return (
              <li key={topic.slug} className="card">
                <h5 className="title">
                  <Link to={`/articles/topics/${topic.slug}`}>{topic.slug}</Link>
                </h5>
                <p>{topic.description}</p>
                <Button
                  type="button"
                  onClick={() => {
                    handleViewTopic(topic.slug);
                  }}
                  value={topic.slug}
                >
                  View Articles
                </Button>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
};
