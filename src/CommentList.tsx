import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentCreate from "./CommentCreate";
import { Comment } from "./PostList";

type GetComments = Array<{ id: string; content: string }>;

const CommentList = ({
  postId,
  comments,
}: {
  postId: string;
  comments: Array<Comment>;
}) => {
  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>{comment.content}</li>
      ))}
    </ul>
  );
};

export default CommentList;
