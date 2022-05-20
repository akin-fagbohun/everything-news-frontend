import { UserContext } from '../contexts/Users';
import { useContext, useState } from 'react';
import { castVote } from '../utils/api';

export const DownvoteButton = (props) => {
  // React Global Contexts
  const { loggedIn } = useContext(UserContext);

  const { comment, comments, setComments } = props;

  const [downvoted, setDownvoted] = useState('Down ❄️');

  const handleDownvote = () => {
    if (downvoted === 'Down ❄️') {
      setDownvoted('downvoted!');
      setComments(
        comments.map((comm) => {
          comm.comment_id === comment.comment_id ? { ...comm, votes: comm.votes - 1 } : comm;
        })
      );
      castVote(comment.comment_id, -1).catch((err) => {
        console.log(err);
      });
    } else if (downvoted !== 'Down ❄️') {
      setDownvoted('Down ❄️');
      setComments(
        comments.map((comm) => {
          comm.comment_id === comment.comment_id ? { ...comm, votes: comm.votes + 1 } : comm;
        })
      );
      castVote(comment.comment_id, +1).catch((err) => {
        console.log(err);
      });
    }
  };

  if (!loggedIn) {
    return;
  } else if (comment.author !== loggedIn) {
    return (
      <button className="mod-comment-btn" onClick={handleDownvote}>
        {downvoted}
      </button>
    );
  }
};
