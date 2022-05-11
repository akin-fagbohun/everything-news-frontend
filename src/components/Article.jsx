import { useParams } from 'react-router-dom';
// import { UserContext } from '../contexts/Users';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { getArticleById, castVote, getCommentsByArticlesId } from '../utils/api';
import { CommentForm } from './CommentForm';
import { DeleteCommentButton } from './DeleteCommentButton';
import { UpvoteButton } from './UpvoteButton';
import { DownvoteButton } from './DownvoteButton';
import { Article404 } from './Article404';

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
      .then((res) => {
        const { data } = res;
        setArticle(data.article);
        setUpvote(data.article.votes);
      })
      .then(() => {
        getCommentsByArticlesId(article_id).then(({ data }) => {
          setComments(data.comments);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        return <Article404></Article404>;
      });
  }, [article_id]);

  // const handleError = () => {
  //   return;
  // };

  const handleBackToArticles = () => {
    console.log('inside button click');
  };

  const handleLikes = (vote) => {
    if (likeState === 'Like 💫') {
      setUpvote((currentVotes) => currentVotes + vote);
      setLikeState('Liked ❤️');
      castVote(article_id, vote).catch((err) => {
        if (err) {
          setLikeState('Try Again');
          setTimeout(() => {
            setLikeState(likeState);
          }, 1000);
        }
      });
    } else {
      setUpvote((currentVotes) => currentVotes + vote);
      setLikeState('Like 💫');
      castVote(article_id, vote).catch((err) => {
        if (err) {
          setLikeState('Try Again');
          setTimeout(() => {
            setLikeState(likeState);
          }, 1000);
        }
      });
    }
  };

  if (isLoading) {
    return <p>loading...</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <section>
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
