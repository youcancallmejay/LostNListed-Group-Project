import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../main.css'

const MainPage = () => {
    const [posts, setPosts] = useState([]);
    const [filterZip, setFilterZip] = useState('');
    const [uniqueZipCodes, setUniqueZipCodes] = useState([]);


    // Function to fetch all posts
    const fetchPosts = async () => {
        try {
            const response = await fetch('/api/posts');
            const data = await response.json();
            setPosts(data);
            extractUniqueZipCodes(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    // Extract zipcodes from posts. 
    const extractUniqueZipCodes = (posts) => {
        const uniqueCodes = [...new Set(posts.map(post => post.zipcode))];
        setUniqueZipCodes(uniqueCodes);
    }

    // Fetch all posts when the component mounts
    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    // Function to handle zip code filter change
    const handleFilterChange = (event) => {
        setFilterZip(event.target.value);
    };

    // Filter posts by zip code
    const filteredPosts = posts.filter(post =>
        post.zipcode.toString().startsWith(filterZip)
    );

    // Function to calculate the number of days ago a post was created
    const daysAgo = (date) => {
        const today = new Date();
        const createdAt = new Date(date);
        const diffTime = Math.abs(today - createdAt);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className='container'>
            <div className='header'>
                <h1>Main Page</h1>
            </div>
            <div className='secondary'>
                <Link to="/create-post">
                    <button>Create Post</button>
                </Link>
                <br />
                <select id="zip-filter" value={filterZip} onChange={handleFilterChange}>
                    <option value="">Zip Code</option>
                    {uniqueZipCodes.map(zip => (
                        <option key={zip} value={zip}>{zip}</option>
                    ))}
                </select>
            </div>
            <div className='bottom-content'>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Zip Code</th>
                            <th>Days Ago</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPosts.map(post => (
                            <tr key={post._id}>
                                <td>{post.title}</td>
                                <td>{post.zipcode}</td>
                                <td>{daysAgo(post.createdAt)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MainPage;
