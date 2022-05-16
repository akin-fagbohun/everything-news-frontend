import { useState, useEffect } from 'react';
import { getTopics } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';

export const Topics = () => {
  const [topics, setTopics] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getTopics()
      .then(({ data }) => {
        setTopics(data.topics);
      })
      .catch((err) => {
        console.log(err);
        navigate('/404');
      });
  }, [navigate]);

  const handleViewTopic = (topic) => {
    navigate(`/articles/topics/${topic}`);
  };

  return (
    <main>
      <h1 className="articlesTitle">Browse by Topic</h1>
      <section className="articlesBody">
        <section className="cards">
          <ul className="topicsCards">
            {topics.map((topic) => {
              return (
                <li key={topic.slug} className="card">
                  <h5 className="title">
                    <Link to={`/articles/topics/${topic.slug}`}>{topic.slug}</Link>
                  </h5>
                  <p>{topic.description}</p>
                  <button
                    className="btn"
                    type="button"
                    onClick={() => {
                      handleViewTopic(topic.slug);
                    }}
                    value={topic.slug}
                  >
                    View Articles
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    </main>
  );
};
