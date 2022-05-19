import { useState, useEffect } from 'react';
import { getFilteredArticles, getTopics } from '../utils/api';
import { Link, useNavigate } from 'react-router-dom';

export const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [status, setStatus] = useState('idle');
  const [chosen, setChosen] = useState(null);
  const [articles, setArticles] = useState([]);
  // const [setCategorySelect] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getTopics()
      .then(({ data }) => {
        console.log(data.topics, '<<< data.topics');
        setTopics(data.topics);
        setStatus('resolved');
      })
      .catch((err) => {
        console.log(err);
        navigate('/404');
      });
  }, [navigate, chosen]);

  const handleViewTopic = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setChosen(e.target.value);
    getFilteredArticles(e.target.value).then(({ data }) => {
      setArticles(data.articles);
    });
  };

  const handleReadArticle = (article_id, article_title) => {
    const url_title = article_title
      .toLowerCase()
      .replace(/[’',.]/g, '') // removes apostrophes, commas and periods
      .replace(/\s/g, '-'); // replaces whitespaces

    navigate(`/articles/${article_id}/${url_title}`);
  };

  // const handleCategoryFilter = (event) => {
  //   event.target.value === '' ? setCategorySelect(null) : setCategorySelect(event.target.value);
  // };

  if (status === 'idle') {
    return (
      <main>
        <p>loading...</p>
      </main>
    );
  }

  if (status === 'resolved' && !chosen) {
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
                      onClick={(e) => handleViewTopic(e)}
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
  } else if (status === 'resolved' && chosen) {
    return (
      <main>
        <h1>Showing {chosen}</h1>
        <button className="btn" type="button" onClick={() => window.location.reload()}>
          Back to Topics
        </button>
        <section>
          <section id="articlesScroll" className="cards">
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
                    <button
                      className="btn"
                      type="button"
                      onClick={() => handleReadArticle(article.article_id, article.title)}
                    >
                      Read Article
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        </section>
      </main>
    );
  }
};
