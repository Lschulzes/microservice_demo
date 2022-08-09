import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

type GetPosts = {
  [postId: string]: { id: string; title: string };
};

const PostList = () => {
  const [posts, setPosts] = useState<GetPosts>({});

  const getPosts = async () => {
    const { data } = await axios.get<GetPosts>("http://localhost:4000/posts");

    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {Object.values(posts).map((post) => (
        <div
          className="card p-2"
          style={{ width: "30%", marginBottom: "1.25rem", background: "#000" }}
          key={post.id}
        >
          <div className="card-body">
            <h1>{post.title}</h1>
          </div>

          <CommentList postId={post.id} />
          <CommentCreate postId={post.id} />
        </div>
      ))}
    </div>
  );
};

export default PostList;
