import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import viewPostImage from './images/viewPostImage.jpg';

const ViewPost = () => {
  const [post, setPost] = useState({});
  const { id } = useParams(); // Capture the 'id' parameter from the URL
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/posts/id/${id}`
        );
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  // Function to calculate how many hours ago a post was created
  const hoursAgo = (createdAt) => {
    const currentTime = new Date();
    const postTime = new Date(createdAt);
    const timeDifference = currentTime.getTime() - postTime.getTime();
    const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    return `${hoursDifference} hour${hoursDifference !== 1 ? "s" : ""} ago`;
  };

  const handleDelete = () => {
    console.log(`Attempting to delete post with id: ${id}`);
    axios
      .delete(`http://localhost:8000/api/posts/${id}`)
      .then(() => {
        console.log("Post deleted:", id);
        navigate("/"); // Redirect to root after delete
      })
      .catch((err) => console.error("Error deleting post:", err));
  };

  const getBackgroundImage = () => {
    return `url(${viewPostImage})`;
  }

  return (
    <body style={{ backgroundImage: getBackgroundImage()}}>
      <div className="container">
      <Header />
      <div className="mt-4">
        <h1>{post.title}</h1>
        <p>
          <strong>Type:</strong> {post.type}
        </p>
        <p>
          <strong>Zipcode:</strong> {post.zipcode}
        </p>
        <p>
          <strong>Price:</strong> {post.price}
        </p>
        <p>
          <strong>Description:</strong> {post.description}
        </p>
        <p>
          <strong>Category:</strong> {post.category}
        </p>
        <p>
          <strong>Email:</strong> {post.email}
        </p>
        <p>
          <strong>Created:</strong> {hoursAgo(post.createdAt)}
        </p>
      </div>
      
      <div className="mt-4">
        {/* Add Go Back button */}
        <Link to="/" className="btn btn-primary btn-lg border-dark rounded shadow me-2">
        Go Back
      </Link>
        {/* Add Edit button */}
      <Link to={`/posts/${post._id}`}>
        <button className="btn btn-warning btn-lg border-dark rounded shadow me-2">Edit</button>
      </Link>
      <button className="btn btn-danger btn-lg border-dark rounded shadow me-2" onClick={handleDelete}>Delete</button>
      </div>
      
    </div>
    </body>
    
  );
};

export default ViewPost;
