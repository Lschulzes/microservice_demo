import axios from "axios";
import { FormEvent, useState } from "react";

const PostCreate = () => {
  const [title, setTitle] = useState("");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await axios.post("http://posts.com/posts", { title });

    setTitle("");
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label> Title</label>
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
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

export default PostCreate;
