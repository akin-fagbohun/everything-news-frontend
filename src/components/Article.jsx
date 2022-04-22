import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getArticleById, castVote, getCommentsByArticlesId } from '../utils/api';

export const Article = () => {
  const [article, setArticle] = useState([]);
  const [upvote, setUpvote] = useState(null);
  const [likeState, setLikeState] = useState('Like 💫');
  const [comments, setComments] = useState([]);

  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id)
      .then(({ data }) => {
        setArticle(data.article);
        setUpvote(data.votes);
      })
      .then(() => {
        getCommentsByArticlesId(article_id).then(({ data }) => {
          setComments(data.comments);
        });
      });
  }, [article_id]);

  useEffect(() => {}, [upvote]);

  const handleBackToArticles = () => {
    console.log('inside button click');
  };

  const handleLikes = (vote) => {
    if (likeState === 'Like 💫') {
      setUpvote((currVotes) => {
        currVotes + vote;
      });
      setLikeState('Liked ❤️');
      castVote(article_id, vote).then(({ data }) => {
        setArticle(data.article);
        setUpvote(data.votes);
      });
    } else {
      setUpvote((currVotes) => {
        currVotes + vote;
      });
      setLikeState('Like 💫');
      castVote(article_id, vote).then(({ data }) => {
        setArticle(data.article);
        setUpvote(data.votes);
      });
    }
  };

  const handlePostComment = (comment) => {
    console.log(comment);
  };

  return (
    <main>
      <section className="article">
        <div className="articleTitle">
          <h2>{article.title}</h2>
        </div>
        <div className="articleBody">
          <p>{article.body}</p>
        </div>
        <div className="credentials">
          <small>Article written by {article.author}</small>
          <p>Category {article.topic}</p>
          <p>Likes {upvote ?? article.votes}</p>
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
        <div className="commentsHeader">
          <p>💬 {comments.length} Comments</p>
        </div>
        <div className="commentsBody">
          <div id="project-carousel">
            {comments.map((comment) => {
              return (
                <div key={comment.comment_id} className="project-card">
                  {comment.body}
                </div>
              );
            })}
            <div className="project-card">
              <img src="" alt="" />
            </div>
            <div className="project-card">
              <img src="" alt="" />
            </div>
            <div className="project-card">
              <img src="" alt="" />
            </div>
            <div className="project-card">
              <img src="" alt="" />
            </div>
            <div className="project-card">
              <img src="" alt="" />
            </div>
          </div>
          <form onSubmit={handlePostComment}>
            <label htmlFor="newComment" className="textarea-label">
              <textarea
                id="newComment"
                className="textarea-label"
                type="text"
                name="newComment"
                rows="4"
                cols="70"
                maxLength="220"
              />
            </label>
            <button
              className="btn"
              type="button"
              onClick={() => {
                handleBackToArticles();
              }}
            >
              Post Comment
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};
