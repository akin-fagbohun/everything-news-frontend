import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArticleById, castVote } from '../utils/api';

export const Article = () => {
  const [article, setArticle] = useState([]);
  const [upvote, setUpvote] = useState(null);
  const [likeState, setLikeState] = useState('Like 💫');
  const [isLoading, setIsLoading] = useState(true);

  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id).then(({ data }) => {
      setArticle(data.article);
      setUpvote(data.article.votes);
      setIsLoading(false);
    });
  }, [article_id]);

  const handleBackToArticles = () => {
    console.log('inside button click');
  };

  const handleLikes = (vote) => {
    if (likeState === 'Like 💫') {
      setUpvote((currentVotes) => currentVotes + vote);
      setLikeState('Liked ❤️');
      castVote(article_id, vote);
    } else {
      setUpvote((currentVotes) => currentVotes + vote);
      setLikeState('Like 💫');
      castVote(article_id, vote);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <section className="article">
        <h2 className="articleTitle">{article.title}</h2>
        <p className="articleBody">{article.body}</p>
        <div className="credentials">
          <small>Article written by {article.author}</small>
          <p>Category {article.topic}</p>
          <p>Likes {upvote}</p>
        </div>
        <button
          className="btn"
          type="button"
          onClick={() => {
            if (likeState === 'Like 💫') {
              handleLikes(1);
            } else {
              handleLikes(-1);
            }
          }}
        >
          {likeState}
        </button>

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
      <section>
        <div className="articleComments">
          <p>
            Show Number of Comments here <br></br>make it modal, tiktok style!{' '}
          </p>
        </div>
      </section>
    </main>
  );
};
