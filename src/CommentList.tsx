import { Comment } from "./PostList";

const CommentList = ({ comments }: { comments: Array<Comment> }) => {
  return (
    <ul>
      {comments.map(({ id, content, status }) => (
        <li key={id}>
          {status === "approved"
            ? content
            : status === "pending"
            ? "Comment awaiting moderation"
            : "Comment rejected"}
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
