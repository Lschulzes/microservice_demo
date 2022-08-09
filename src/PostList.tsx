import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export type Comment = {
  id: string;
  content: string;
  status: "approved" | "pending" | "rejected";
};

type GetPosts = Array<{ id: string; title: string; comments: Array<Comment> }>;

const PostList = () => {
  const [posts, setPosts] = useState<GetPosts>([]);

  const getPosts = async () => {
    const { data } = await axios.get<GetPosts>("http://localhost:4002/posts");

    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {posts.map((post) => (
        <div
          className="card p-2"
          style={{ width: "30%", marginBottom: "1.25rem", background: "#000" }}
          key={post.id}
        >
          <div className="card-body">
            <h1>{post.title}</h1>
          </div>

          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
