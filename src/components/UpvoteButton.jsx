import { UserContext } from '../contexts/Users';
import { useContext, useState } from 'react';
import { castVote } from '../utils/api';

export const UpvoteButton = (props) => {
  // React Global Contexts
  const { loggedIn } = useContext(UserContext);

  const { comment, comments, setComments, event } = props;

  const [upvoted, setUpvoted] = useState('Up 🔥');

  const handleUpvote = () => {
    event.preventDefault();
    if (upvoted === 'Up 🔥') {
      setUpvoted('upvoted!');
      setComments(
        comments.map((comm) => {
          comm.comment_id === comment.comment_id ? { ...comm, votes: comm.votes + 1 } : comm;
        })
      );
      castVote(comment.comment_id, 1)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
          // maybe a nice button transition here.
        });
    } else if (upvoted !== 'Up 🔥') {
      setUpvoted('Up 🔥');
      setComments(
        comments.map((comm) => {
          comm.comment_id === comment.comment_id ? { ...comm, votes: comm.votes - 1 } : comm;
        })
      );
      castVote(comment.comment_id, -1)
        .then(({ data }) => {
          console.log({ data });
        })
        .catch((err) => {
          console.log(err);
          // maybe a nice button transition here.
        });
    }
  };

  if (!loggedIn) {
    return;
  } else if (comment.author !== loggedIn) {
    return (
      <button className="mod-comment-btn" onClick={handleUpvote}>
        {upvoted}
      </button>
    );
  }
};
