import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';

const EditPost = ({ lostNlistedForm, setLostNListedForm }) => {

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    const isPriceDisabled = lostNlistedForm.type !== 'sell';
    const { id } = useParams();

    // Function to fetch post data and populate form fields
    useEffect(() => {
        axios.get(`http://localhost:8000/api/posts/id/${id}`)
            .then(res => {
                const postData = res.data;
                setLostNListedForm({
                    title: postData.title,
                    type: postData.type,
                    zipcode: postData.zipcode,
                    price: postData.price,
                    description: postData.description,
                    category: postData.category,
                    email: postData.email
                });
            })
            .catch(err => {
                console.log(err);
                // Handle error
            });
    }, [id]);

    // Function to handle form changes
    const changeHandler = (e) => {
        const { name, value } = e.target;
        let errorMessage = '';
        if (name === 'zipcode' && isNaN(value)) {
            errorMessage = 'Please enter only numeric values for the zipcode.';
            setErrors({ ...errors, [name]: { message: errorMessage } });
        } else {
            setLostNListedForm({ ...lostNlistedForm, [name]: value });
            setErrors({ ...errors, [name]: '' });
        }
    };

    // Function to handle form submission
    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/posts/${id}`, lostNlistedForm)
            .then(res => {
                console.log(res.data);
                setLostNListedForm({
                    title: '',
                    type: '',
                    zipcode: '',
                    price: '',
                    description: '',
                    category: '',
                    email: ''
                });
                navigate('/');
            })
            .catch(err => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            });
    };

    return (
        <div className="container">
            <Header />
            <hr className="border-top border-3 border-dark" />
            <button className="btn btn-success position-absolute top-0 end-10 m-3 border-dark rounded shadow" onClick={() => navigate('/')}>Home</button>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center mb-4 border-dark rounded shadow">Edit Post</h1>
                    <form onSubmit={onSubmitHandler}>
                        {/* Input fields for editing post details */}
                        <div className="mb-3">
                            <label className="form-label">Title:</label>
                            <input type="text" name="title" value={lostNlistedForm.title} onChange={changeHandler} className="form-control border-dark rounded shadow" />
                            {errors.title && <div className='text-danger'>{errors.title.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Type:</label>
                            <select name="type" value={lostNlistedForm.type} onChange={changeHandler} className="form-select border-dark rounded shadow">
                                <option value="">Select Type</option>
                                <option value="lost">Lost</option>
                                <option value="found">Found</option>
                                <option value="sell">Sell</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Zipcode:</label>
                            <input type="text" name="zipcode" value={lostNlistedForm.zipcode} onChange={changeHandler} className="form-control border-dark rounded shadow" />
                            {errors.zipcode && <div className='text-danger'>{errors.zipcode.message}</div>}
                        </div>
                        {!isPriceDisabled &&
                            <div className="mb-3">
                                <label className="form-label">Price:</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={lostNlistedForm.price}
                                    onChange={changeHandler}
                                    className="form-control border-dark rounded shadow"
                                />
                                {errors.price && <div className='text-danger'>{errors.price.message}</div>}
                            </div>
                        }
                        <div className="mb-3">
                            <label className="form-label">Description:</label>
                            <textarea name="description" value={lostNlistedForm.description} onChange={changeHandler} className="form-control border-dark rounded shadow"></textarea>
                            {errors.description && <div className='text-danger'>{errors.description.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Category:</label>
                            <select name="category" value={lostNlistedForm.category} onChange={changeHandler} className="form-select border-dark rounded shadow">
                                <option value="">Select Category</option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                                <option value="books">Animals</option>
                                <option value="Antiques">Collectibles & Instruments</option>
                                <option value="Dishware">Vehicles</option>
                                <option value="Toys">Outdoors</option>
                                <option value="Toys">Miscellaneous</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input type="email" name="email" value={lostNlistedForm.email} onChange={changeHandler} className="form-control border-dark rounded shadow" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" />
                            {errors.email && <div className='text-danger'>{errors.email.message}</div>}
                        </div>
                        {/* Button to submit the edited post */}
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-lg border-dark rounded shadow">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditPost;
