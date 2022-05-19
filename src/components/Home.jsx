export const Home = () => {
  return (
    <main className="home-section">
      <h1>Welcome to Everything News</h1>
      <h2>A news article web app, built with React, styled with vanilla CSS.</h2>
      <p>Select a user story in the Navigation bar to browse as if logged in.</p>
      <h3>Features you can explore include</h3>
      <ul className="no-bullets">
        <li>Browse database of articles</li>
        <li>See listings by topic</li>
        <li>Filter listings by topic/engagment</li>
        <li>Like an article</li>
        <li>Post a comment</li>
        <li>Delete an comment</li>
      </ul>
    </main>
  );
};
