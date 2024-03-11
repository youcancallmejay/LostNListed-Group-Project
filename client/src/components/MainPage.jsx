import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header'; // Import the Header component
import '../main.css'; // Import your custom CSS file
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const MainPage = () => {
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState('default'); // State for sorting option

    useEffect(() => {
        fetchAllPosts();
    }); // Fetch posts when sortBy changes

    const fetchAllPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/posts');
            let sortedPosts = response.data;

            if (sortBy === 'zipcode') {
                sortedPosts = sortedPosts.sort((a, b) => a.zipcode - b.zipcode);
            } else if (sortBy === 'daysAgo') {
                sortedPosts = sortedPosts.sort((a, b) => {
                    const today = new Date();
                    const daysAgoA = Math.ceil((today - new Date(a.createdAt)) / (1000 * 3600 * 24));
                    const daysAgoB = Math.ceil((today - new Date(b.createdAt)) / (1000 * 3600 * 24));
                    return daysAgoA - daysAgoB;
                });
            }

            setPosts(sortedPosts);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    // Function to calculate how many days ago a post was created
    const daysAgo = (createdAt) => {
        const today = new Date();
        const postDate = new Date(createdAt);
        const timeDifference = today.getTime() - postDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        return `${daysDifference} day${daysDifference === 1 ? '' : 's'} ago`;
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
    };

    return (
        <div className="container">
            <Header /> {/* Include the Header component */}
            <h1 className="text-center mb-4">All Listings</h1>
            <div className='secondary'>
                <Link to="/create-post">
                    <button className="create-post-btn">Create Post</button> {/* Style this button as per your CSS */}
                </Link>
                <select value={sortBy} onChange={handleSortChange}>
                    <option value="default">Sort By</option>
                    <option value="zipcode">Zipcode</option>
                    <option value="daysAgo">Days Ago</option>
                </select>
            </div>
            <table className="bottom-content">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Zipcode</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(post => (
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

export default MainPage;
