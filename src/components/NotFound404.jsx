import { useNavigate } from 'react-router-dom';

export const NotFound404 = () => {
  const navigate = useNavigate();

  return (
    <main>
      <section>
        <h2>Page Not Found</h2>
        <p>Sorry, the page that you are looking for is not available.</p>
        <button
          className="btn"
          type="button"
          onClick={() => {
            navigate('/');
          }}
        >
          Back to Homepage
        </button>
      </section>
    </main>
  );
};
