import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/Users';
import { useState, useEffect, useContext } from 'react';

export const Nav = () => {
  // React (Global) Contexts
  const { loggedIn, setLoggedIn } = useContext(UserContext);

  // eslint-disable-next-line no-unused-vars
  const [allUsers, setAllUsers] = useState(['jessjelly', 'tickle122', 'cooljmessy']);

  useEffect(() => {
    if (loggedIn !== null) {
      alert(`Logged in as ${loggedIn}`);
      console.log(loggedIn);
    }
  }, [loggedIn]);

  const handleLogin = (event) => {
    setLoggedIn(event);
  };

  return (
    <nav>
      <Link to="/">Home</Link> | <Link to="/articles">Articles</Link> |{' '}
      <Link to="/topics">Topics</Link> |
      <select name="users" id="user-select" onChange={(event) => handleLogin(event.target.value)}>
        <option value=""></option>
        {allUsers.map((username, i) => {
          return (
            <option key={i} value={username}>
              {username}
            </option>
          );
        })}
      </select>
    </nav>
  );
};
