import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Nav } from './components/Nav';
import { Home } from './components/Home';
import { Articles } from './components/Articles';
import { Article } from './components/Article';
import { Topics } from './components/Topics';

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/articles" element={<Articles />}></Route>
        <Route path="/articles/topics/:topic" element={<Articles />}></Route>
        <Route path="/articles/:article_id" element={<Article />}></Route>
        <Route path="/articles/:article_id/:article_title" element={<Article />}></Route>
        <Route path="/topics" element={<Topics />}></Route>
      </Routes>
    </div>
  );
}

export default App;
