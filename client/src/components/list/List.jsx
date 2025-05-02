import { useState, useEffect } from "react";
import Card from "../card/card";
import "./list.scss";
import { AuthContext } from "../../context/AuthContext";


function List({ posts }) {
  const [postList, setPostList] = useState(posts);


  useEffect(() => {
    console.log("Received posts in List:", posts);
    setPostList(posts);
  }, [posts]);

  const handleDeletePost = (postId) => {
    const updatedPosts = postList.filter((post) => post.id !== postId);
    setPostList(updatedPosts);
  };

  return (
    <div className="list">
      {postList.map((item) => (
        <Card key={item.id} item={item} onDelete={handleDeletePost} />
      ))}
    </div>
  );
}

export default List;