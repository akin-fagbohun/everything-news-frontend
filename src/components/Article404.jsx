const handleBackToArticles = () => {
  console.log('inside 404 error');
};

export const Article404 = () => {
  return (
    <main>
      <section>
        <h2>Page Not Found</h2>
        <p>We&sposre sorry, the page that you are looking for is not available.</p>
        <button
          className="btn"
          type="button"
          onClick={() => {
            handleBackToArticles();
          }}
        >
          Back to Articles
        </button>
      </section>
    </main>
  );
};
