import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header"; // Import the Header component
import "../main.css"; // Import your custom CSS file
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("default"); // State for sorting option

  useEffect(() => {
    fetchAllPosts();
  }, [sortBy]); // Fetch posts when sortBy changes

  const fetchAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/posts");
      let sortedPosts = response.data;

      if (sortBy === "zipcode") {
        sortedPosts = sortedPosts.sort((a, b) => a.zipcode - b.zipcode);
      } else if (sortBy === "hoursAgo") {
        sortedPosts = sortedPosts.sort((a, b) => {
          const currentTime = new Date();
          const postTimeA = new Date(a.createdAt);
          const postTimeB = new Date(b.createdAt);
          const hoursAgoA = Math.floor((currentTime - postTimeA) / (1000 * 60 * 60));
          const hoursAgoB = Math.floor((currentTime - postTimeB) / (1000 * 60 * 60));
          return hoursAgoA - hoursAgoB;
        });
      }

      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };


      // Function to calculate how many hours ago a post was created
    const hoursAgo = (createdAt) => {
        const currentTime = new Date();
        const postTime = new Date(createdAt);
        const timeDifference = currentTime.getTime() - postTime.getTime();
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
    };

  return (
    <div className="container">
      <Header /> {/* Include the Header component */}
      <h1 className="text-center mb-4">All Listings</h1>
      <div className="secondary">
        <Link to="/create-post">
          <button className="create-post-btn">Create Post</button>{" "}
          {/* Style this button as per your CSS */}
        </Link>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="default">Sort By</option>
          <option value="zipcode">Zipcode</option>
          <option value="daysAgo">Hours Ago</option>
        </select>
      </div>
      <table className="bottom-content">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
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
              <td>{post.type}</td>
              <td>{post.zipcode}</td>
              <td>{hoursAgo(post.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainPage;
