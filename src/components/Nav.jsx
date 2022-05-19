import { Link } from 'react-router-dom';
import { UserContext } from '../contexts/Users';
import { useState, useEffect, useContext } from 'react';

export const Nav = () => {
  // React (Global) Contexts
  const { loggedIn, setLoggedIn } = useContext(UserContext);

  // eslint-disable-next-line no-unused-vars
  const [allUsers, setAllUsers] = useState(['jessjelly', 'tickle122', 'cooljmessy', 'grumpy19']);

  useEffect(() => {
    if (loggedIn !== null) {
      alert(`Logged in as ${loggedIn}`);
      console.log(loggedIn);
    }
  }, [loggedIn]);

  const handleLogin = (user) => {
    setLoggedIn(user);
  };

  return (
    <nav>
      <div className="nav-group">
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/articles">Articles</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>
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
      </div>
    </nav>
  );
};
