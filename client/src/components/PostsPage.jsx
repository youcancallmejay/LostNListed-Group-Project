import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom"; // To access the URL parameter and Link component
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

  const hoursAgo = (createdAt) => {
    const currentTime = new Date();
    const postTime = new Date(createdAt);
    const timeDifference = currentTime.getTime() - postTime.getTime();
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
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
              <td>
                {/* Link to ViewPost page with post ID as parameter */}
                <Link to={`/view-post/${post._id}`}>{post.title}</Link>
              </td>
              <td>{post.zipcode}</td>
              <td>{hoursAgo(post.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsPage;
