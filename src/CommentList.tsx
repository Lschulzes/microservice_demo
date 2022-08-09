import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentCreate from "./CommentCreate";

type GetComments = Array<{ id: string; content: string }>;

const CommentList = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<GetComments>([]);

  const getComments = async () => {
    const { data } = await axios.get<GetComments>(
      `http://localhost:4001/posts/${postId}/comments`
    );
    setComments(data);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentList;
