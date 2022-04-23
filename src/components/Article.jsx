import { useParams } from 'react-router-dom';
// import { UserContext } from '../contexts/Users';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { getArticleById, castVote, getCommentsByArticlesId } from '../utils/api';
import { CommentForm } from './CommentForm';
import { DeleteCommentButton } from './DeleteCommentButton';
import { UpvoteButton } from './UpvoteButton';
import { DownvoteButton } from './DownvoteButton';

export const Article = () => {
  // React Global Contexts
  // const { loggedIn } = useContext(UserContext);

  const [article, setArticle] = useState([]);
  const [upvote, setUpvote] = useState(null);
  const [likeState, setLikeState] = useState('Like 💫');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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
          setIsLoading(false);
        });
      });
  }, [article_id]);

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

  if (isLoading) {
    return <p>loading...</p>;
  }

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
                <React.Fragment key={comment.comment_id ?? comments.length * 13}>
                  <div className="comment-card-head">
                    <h3>{comment.author}</h3>
                    <DeleteCommentButton
                      comment={comment}
                      comments={comments}
                      setComments={setComments}
                      setUpvote={setUpvote}
                    />
                    <div>
                      <UpvoteButton
                        comment={comment}
                        comments={comments}
                        setComments={setComments}
                      />
                      <small>upvotes {comment.votes}</small>
                      <DownvoteButton
                        comment={comment}
                        comments={comments}
                        setComments={setComments}
                      />
                    </div>
                  </div>
                  <p className="comment-card-body">{comment.body}</p>
                </React.Fragment>
              );
            })}
          </div>
          <CommentForm
            newComment={newComment}
            setNewComment={setNewComment}
            comments={comments}
            setComments={setComments}
          />
        </div>
      </section>
    </main>
  );
};
