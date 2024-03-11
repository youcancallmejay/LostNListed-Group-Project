import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Header from "./Header";

const ViewPost = () => {
    const [post, setPost] = useState({});
    const { id } = useParams(); // Capture the 'id' parameter from the URL

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/posts/id/${id}`);
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
        return `${hoursDifference} hour${hoursDifference !== 1 ? 's' : ''} ago`;
    };


    return (
        <div className="container">
            <Header />
            <div className="mt-4">
                <h1>{post.title}</h1>
                <p><strong>Type:</strong> {post.type}</p>
                <p><strong>Zipcode:</strong> {post.zipcode}</p>
                <p><strong>Price:</strong> {post.price}</p>
                <p><strong>Description:</strong> {post.description}</p>
                <p><strong>Category:</strong> {post.category}</p>
                <p><strong>Email:</strong> {post.email}</p>
                <p><strong>Created:</strong> {hoursAgo(post.createdAt)}</p>
            </div>
            <Link to="/" className="btn btn-primary mt-3">Go Back</Link>
        </div>
    );
};

export default ViewPost;
