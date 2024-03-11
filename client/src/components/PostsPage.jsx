// PostsPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To access the URL parameter
import Header from "./Header"; // Assuming you have a Header component

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const { type } = useParams(); // Capture the 'type' parameter from the URL

  useEffect(() => {
    const fetchPostsByType = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/posts/type/${type}`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPostsByType();
  }, [type]);

  return (
    <div className="container">
      <Header />
      <h1 className="text-center mb-4">Recent {type} posts</h1>
      <div className="posts-list">
        {posts.map((post) => (
          <div key={post._id} className="post">
            <h2>{post.title}</h2>
            <p>{post.zipcode}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
