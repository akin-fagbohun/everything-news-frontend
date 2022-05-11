import { useState, useEffect } from 'react';
import { getArticles } from '../utils/api';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categorySelect, setCategorySelect] = useState(null);
  const [sortBySelect, setSortBySelect] = useState(null);
  // const [sortDirection, setSortDirection] = useState(null);

  // navigate to endpoint
  const navigate = useNavigate();

  const { topic, sort_by } = useParams();

  useEffect(() => {
    getArticles(topic, sort_by).then(({ data }) => {
      const categories = data.articles.map((article) => article.topic);
      setArticles(data.articles);
      setCategories([...new Set(categories)]);
    });
  }, []); // eslint-disable-line

  useEffect(() => {}, [articles]);

  const handleReadArticle = (article_id, article_title) => {
    const url_title = article_title
      .toLowerCase()
      .replace(/[’',.]/g, '') // removes apostrophes, commas and periods
      .replace(/\s/g, '-'); // replaces whitespaces

    navigate(`/articles/${article_id}/${url_title}`);
  };

  const handleSortByFilter = (event) => {
    event.target.value === '' ? setSortBySelect(null) : setSortBySelect(event.target.value);
  };

  const handleCategoryFilter = (event) => {
    event.target.value === '' ? setCategorySelect(null) : setCategorySelect(event.target.value);
  };

  const handleFiltering = (event) => {
    event.preventDefault();
    getArticles(categorySelect, sortBySelect).then(({ data }) => {
      setArticles(data.articles);

      if (categorySelect && sortBySelect) {
        navigate(`/articles?topic=${categorySelect}&sort_by=${sortBySelect}`);
      } else if (categorySelect) {
        navigate(`/articles?topic=${categorySelect}`);
      } else if (sortBySelect) {
        navigate(`/articles?sort_by=${sortBySelect}`);
      }
    });
  };

  return (
    <main>
      <h1 className="articlesTitle">Articles</h1>
      <section className="articlesBody">
        <form
          className="formFilter"
          onSubmit={(e) => {
            handleFiltering(e);
          }}
        >
          <select
            className="selectLabel"
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
          <select
            className="selectLabel"
            name="sort_by"
            id="sortBy"
            onChange={(event) => handleSortByFilter(event)}
          >
            <option value=""></option>
            <option value="votes">Likes</option>
            <option value="comment_count">Comments</option>
            <option value="created_at">Article Date</option>
          </select>
          {/* <select
          name="order"
          id="orderBy"
          onChange={(event) => setSortDirection(event.target.value)}
          >
          <option value=""></option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select> */}
          <button className="filterComment-btn" type="submit">
            filter
          </button>
        </form>
        <section id="articlesScroll" className="cards">
          <ul>
            {articles.map((article) => {
              return (
                <li key={article.article_id} className="card">
                  <h5 add>
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
