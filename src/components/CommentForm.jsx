import { UserContext } from '../contexts/Users';
import { useContext, useState } from 'react';
import { postCommentToArticle } from '../utils/api';
import { useParams } from 'react-router-dom';

export const CommentForm = (props) => {
  // React Global Contexts
  const { loggedIn } = useContext(UserContext);
  const [postState, setPostState] = useState('Post Comment');

  const { article_id } = useParams();

  const { newComment, setNewComment, comments, setComments } = props;

  const handleChange = (event) => {
    console.log(event.target.value);
    setNewComment(event.target.value);
  };

  const handlePostComment = (event) => {
    event.preventDefault();
    console.log(comments);

    if (postState === 'Post Comment' && loggedIn && newComment.length > 0) {
      setComments([...comments, { body: newComment, author: loggedIn, votes: 0, article_id }]);
      setPostState('Posted 🎉');
      setTimeout(() => {
        setPostState('Post Comment');
      }, 2500);

      postCommentToArticle(article_id, loggedIn, newComment)
        .then(({ data }) => {
          console.log(data.comment);
        })
        .catch((err) => {
          console.log(err);
          setComments(comments);
          setPostState('Try again ‼️');
          setTimeout(() => {
            setPostState('Post Comment');
          }, 2500);
        });
    } else if (!loggedIn) {
      setPostState('Please Log In');
      setTimeout(() => {
        setPostState('Post Comment');
      }, 2500);
    } else {
      setPostState('Enter a comment');
      setTimeout(() => {
        setPostState('Post Comment');
      }, 3000);
    }
  };

  return (
    <form onSubmit={handlePostComment}>
      <label htmlFor="newComment" className="textarea-label">
        <textarea
          id="newComment"
          className="textarea-label"
          name="newComment"
          rows="4"
          cols="70"
          maxLength="220"
          value={newComment}
          onChange={(event) => handleChange(event)}
        />
      </label>
      <button className="comment-btn">{postState}</button>
    </form>
  );
};
