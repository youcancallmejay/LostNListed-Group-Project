import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header"; // Import the Header component
import "../main.css"; // Import your custom CSS file
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import mainImage from "./images/stonegray.jpg";

const MainPage = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("default"); // State for sorting option

  useEffect(() => {
    fetchAllPosts();
  }); // Fetch posts when sortBy changes

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
          const hoursAgoA = Math.floor(
            (currentTime - postTimeA) / (1000 * 60 * 60)
          );
          const hoursAgoB = Math.floor(
            (currentTime - postTimeB) / (1000 * 60 * 60)
          );
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
    return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
  };

  const getBackgroundImage = () => {
    return `url(${mainImage})`;
  }

  const getTypeStyle = (type) => {
    switch (type) {
      case "lost":
        return { color: "#ff0000" }; // Custom red color for "lost"
      case "sell":
        return { color: "#0000ff" }; // Custom blue color for "sell"
      case "found":
        return { color: "#00ff00" }; // Custom green color for "found"
      default:
        return {}; // Default style for other types
    }
  };
  
  

  return (
    <body style={{ backgroundImage: getBackgroundImage()}}>
      <div className="container" style={{ backgroundImage: getBackgroundImage()}}>
      <Header /> {/* Include the Header component */}
      <div className="subheaderContainer">
        <Link to="/create-post">
          <button className="create-post-btn">Create Post</button>{" "}
          {/* Style this button as per your CSS */}
        </Link>
        <h1>All Listings</h1>
        <select value={sortBy} onChange={handleSortChange}>
          <option value="default">Sort By</option>
          <option value="zipcode">Zipcode</option>
          <option value="hoursAgo">Date Posted</option>
        </select>
      </div >
      <div className="table-responsive">
      <table className="table-striped">
        <thead >
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Zipcode</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post._id} >
              <td>
                {/* Link to ViewPost page with post ID as parameter */}
                <Link to={`/view-post/${post._id}`} >{post.title}</Link>
              </td>
              <td style={getTypeStyle(post.type)}>{post.type}</td>
              <td>{post.zipcode}</td>
              <td>{hoursAgo(post.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
    </body>
  );
};

export default MainPage;
