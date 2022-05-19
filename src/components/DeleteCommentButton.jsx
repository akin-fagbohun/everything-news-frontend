import { UserContext } from '../contexts/Users';
import { useContext } from 'react';
import { deleteCommentById } from '../utils/api';

export const DeleteCommentButton = (props) => {
  // React Global Contexts
  const { loggedIn } = useContext(UserContext);
  console.log(loggedIn);

  const { comment, comments, setComments } = props;
  console.log(comment.username);

  const handleDeleteComment = () => {
    console.log(comments, '<< comments inside handler');
    setTimeout(() => {
      setComments(
        comments.filter((comm) => {
          if (comm.comment_id !== comment.comment_id) {
            return comm;
          }
        })
      );
    }, 1200);
    deleteCommentById(comment.comment_id).catch((err) => {
      console.log(err);
      setComments(comments);
    });
  };

  if (!loggedIn) {
    return;
  }

  if (comment.username === loggedIn) {
    return (
      <button className="mod-comment-btn" onClick={handleDeleteComment}>
        Delete Comment
      </button>
    );
  }
};
