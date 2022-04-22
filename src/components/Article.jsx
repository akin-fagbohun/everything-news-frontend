import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as React from 'react';
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
        <h2 className="articleTitle">{article.title}</h2>
        <p className="articleBody">{article.body}</p>
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
        <p className="commentsHeader">💬 {comments.length} Comments</p>
        <div className="commentsBody">
          <div id="project-carousel">
            {comments.map((comment) => {
              return (
                <React.Fragment key={comment.comment_id}>
                  <div className="comment-card-head">
                    <h3>{comment.author}</h3>
                    <small>upvotes {comment.votes}</small>
                  </div>
                  <p className="comment-card-body">{comment.body}</p>
                </React.Fragment>
              );
            })}
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
