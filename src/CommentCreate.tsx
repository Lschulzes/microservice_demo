import axios from "axios";
import { FormEvent, useState } from "react";

type Props = {
  postId: string;
};

const CommentCreate = ({ postId }: Props) => {
  const [content, setContent] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await axios.post(`http://localhost:4001/posts/${postId}/comments`, {
      content,
    });

    setContent("");
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label> New Comments</label>
          <input
            value={content}
            onChange={({ target }) => setContent(target.value)}
            type="text"
            className="form-control my-3"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentCreate;
