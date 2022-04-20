import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/articles">Articles</Link> |{' '}
      <Link to="/topics">Topics</Link>
    </nav>
  );
};
