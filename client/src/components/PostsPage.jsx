// PostsPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To access the URL parameter
import Header from "./Header";

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

  const daysAgo = (createdAt) => {
    const today = new Date();
    const postDate = new Date(createdAt);
    const timeDifference = today.getTime() - postDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return `${daysDifference} day${daysDifference === 1 ? "" : "s"} ago`;
  };

  return (
    <div className="container">
      <Header />
      <h1 className="text-center mb-4">Recent {type} posts</h1>

      <table className="bottom-content">
        <thead>
          <tr>
            <th>Title</th>
            <th>Zipcode</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              <td>{post.title}</td>
              <td>{post.zipcode}</td>
              <td>{daysAgo(post.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsPage;
