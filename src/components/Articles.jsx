import { useState, useEffect } from 'react';
import { getArticles } from '../utils/api';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorySelect, setCategorySelect] = useState(null);
  const [sortBySelect, setSortBySelect] = useState(null);
  const [status, setStatus] = useState('idle');
  const [sortDirection, setSortDirection] = useState('desc');

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({});

  useEffect(() => {
    getArticles()
      .then(({ data }) => {
        console.log(searchParams);
        const categories = data.articles.map((article) => article.topic);
        setArticles(data.articles);
        setCategories([...new Set(categories)]);
        setStatus('resolved');
      })
      .catch((err) => {
        console.log(err);
        navigate('/404');
      });
  }, [navigate]); // eslint-disable-line

  useEffect(() => {}, [articles]);

  const handleReadArticle = (article_id, article_title) => {
    const url_title = article_title
      .toLowerCase()
      .replace(/[’',.]/g, '') // removes apostrophes, commas and periods
      .replace(/\s/g, '-'); // replaces whitespaces

    navigate(`/articles/${article_id}/${url_title}`);
  };

  const handleSortDirection = (event) => {
    event.target.value === '' ? setSortBySelect(null) : setSortDirection(event.target.value);
  };

  const handleSortByFilter = (event) => {
    event.target.value === '' ? setSortBySelect(null) : setSortBySelect(event.target.value);
  };

  const handleCategoryFilter = (event) => {
    event.target.value === '' ? setCategorySelect(null) : setCategorySelect(event.target.value);
  };

  const handleFiltering = (event) => {
    event.preventDefault();
    getArticles(categorySelect, sortBySelect, sortDirection).then(({ data }) => {
      if (categorySelect && sortBySelect) {
        setSearchParams({
          topic: categorySelect,
          sort_by: sortBySelect,
          order: sortDirection,
        });
      }
      if (categorySelect && !sortBySelect) {
        setSearchParams({ topic: categorySelect, order: sortDirection });
      }
      if (!categorySelect && sortBySelect) {
        setSearchParams({ sort_by: sortBySelect, order: sortDirection });
      }
      setArticles(data.articles);
    });
  };

  if (status === 'idle') {
    return (
      <main>
        <p>loading...</p>
      </main>
    );
  }

  return (
    <main>
      <h1 className="articlesTitle">Articles</h1>
      <form
        className="articlesBody"
        onSubmit={(e) => {
          handleFiltering(e);
        }}
      >
        <select
          name="categories"
          id="categorySelect"
          onChange={(event) => handleCategoryFilter(event)}
        >
          <option value=""></option>
          {categories.map((category, i) => {
            return (
              <option key={i} value={category}>
                {category}
              </option>
            );
          })}
        </select>
        <select name="sort_by" id="sortBy" onChange={(event) => handleSortByFilter(event)}>
          <option value=""></option>
          <option value="votes">Likes</option>
          <option value="created_at">Article Date</option>
        </select>
        <select name="order" id="orderBy" onChange={(event) => handleSortDirection(event)}>
          <option value=""></option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
        <button className="filterComment-btn" type="submit">
          filter
        </button>
      </form>
      <section className="articlesBody">
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
                    onClick={() => {
                      handleReadArticle(article.article_id, article.title);
                    }}
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
};
