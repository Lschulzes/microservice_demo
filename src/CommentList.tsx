import { Comment } from "./PostList";

type GetComments = Array<{ id: string; content: string }>;

const CommentList = ({ comments }: { comments: Array<Comment> }) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentList;
