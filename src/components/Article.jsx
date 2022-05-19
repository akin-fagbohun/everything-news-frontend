import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as React from 'react';
import {
  getArticleById,
  castArticleVote,
  /* castCommentVote,*/
  getCommentsByArticlesId,
} from '../utils/api';
import { CommentForm } from './CommentForm';
import { DeleteCommentButton } from './DeleteCommentButton';

export const Article = () => {
  const [article, setArticle] = useState([]);
  const [upvote, setUpvote] = useState(null);
  const [likeState, setLikeState] = useState('Like 💫');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // const [upvoted, setUpvoted] = useState('Up 🔥');
  // const [downvoted, setDownvoted] = useState('Down ❄️');

  const { article_id } = useParams();
  const navigate = useNavigate();

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
        navigate('/404');
        setIsLoading(false);
      });
  }, [article_id, navigate]);

  const handleLikes = (vote) => {
    if (likeState === 'Like 💫') {
      setUpvote((currentVotes) => currentVotes + vote);
      setLikeState('Liked ❤️');
      castArticleVote(article_id, vote).catch((err) => {
        if (err) {
          setTimeout(() => {
            setLikeState('Try Again');
          }, 500);

          setTimeout(() => {
            setUpvote((currentVotes) => currentVotes - vote);
            setLikeState(likeState);
          }, 2000);
        }
      });
    } else {
      setUpvote((currentVotes) => currentVotes + vote);
      setLikeState('Like 💫');
      castArticleVote(article_id, vote).catch((err) => {
        if (err) {
          setLikeState('Try Again');
          setTimeout(() => {
            setLikeState(likeState);
          }, 1000);
        }
      });
    }
  };

  // const handleUpvote = (event, comment_id /*,currentVotes*/) => {
  //   event.preventDefault();
  //   if (upvoted === 'Up 🔥' && downvoted === 'Down ❄️') {
  //     // cast an upvote
  //     setUpvoted('upvoted!');

  //     castCommentVote(comment_id, 1).catch((err) => {
  //       console.log(err);
  //     });
  //   } else if (upvoted !== 'Up 🔥' && downvoted === 'Down ❄️') {
  //     // recind an upvote
  //     setUpvoted('Up 🔥');

  //     castCommentVote(comment_id, -1).catch((err) => {
  //       console.log(err);
  //     });
  //   } else if (upvoted === 'Up 🔥' && downvoted !== 'Down ❄️') {
  //     // reset downvote.. i.e. recind downvote by clicking upvote
  //     setDownvoted('Down ❄️');
  //   }
  // };

  // const handleDownvote = (event, comment_id /*,currentVotes*/) => {
  //   event.preventDefault();
  //   if (downvoted === 'Down ❄️' && upvoted === 'Up 🔥') {
  //     // cast a downvote
  //     setDownvoted('downvoted!');
  //     castCommentVote(comment_id, -1).catch((err) => {
  //       console.log(err);
  //     });
  //   } else if (downvoted !== 'Down ❄️' && upvoted === 'Up 🔥') {
  //     // recind a downvote
  //     setDownvoted('Down ❄️');
  //     castCommentVote(comment_id, +1).catch((err) => {
  //       console.log(err);
  //     });
  //   } else if (downvoted === 'Down ❄️' && upvoted !== 'Up 🔥') {
  //     // reset upvote.. i.e. recind upvote by clicking downvote
  //     setUpvoted('Up 🔥');
  //   }
  // };

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
            navigate('/articles');
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
              console.log(comment.username);
              return (
                <React.Fragment key={comment.comment_id ?? comments.length * 13}>
                  <div className="comment-card-head">
                    <h3>{comment.username}</h3>
                    <DeleteCommentButton
                      comment={comment}
                      comments={comments}
                      setComments={setComments}
                      setUpvote={setUpvote}
                    />
                    {/* <>
                      <button
                        className="mod-comment-btn"
                        onClick={(event) => handleUpvote(event, comment.comment_id, comment.votes)}
                      >
                        {upvoted}
                      </button>
                      <small>upvotes {comment.votes}</small>
                      <button className="mod-comment-btn" onClick={handleDownvote}>
                        {downvoted}
                      </button>
                    </> */}
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
