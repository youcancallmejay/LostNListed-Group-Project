import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import editPostImage from './images/editPostImage.jpg';

const EditPost = ({ lostNlistedForm, setLostNListedForm }) => {

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const isPriceDisabled = lostNlistedForm.type !== 'sell';
    const { id } = useParams();

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
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            });
    }, [id, setLostNListedForm]);

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

    const onSubmitHandler = (e) => {
        e.preventDefault();

        // Validate form fields
        let validationErrors = {};
        if (!lostNlistedForm.title.trim()) {
            validationErrors.title = { message: 'Title is required' };
        }
        if (!lostNlistedForm.type) {
            validationErrors.type = { message: 'Type is required' };
        }
        if (!lostNlistedForm.zipcode || isNaN(lostNlistedForm.zipcode)) {
            validationErrors.zipcode = { message: 'Please enter a valid zipcode' };
        }
        if (!lostNlistedForm.description.trim()) {
            validationErrors.description = { message: 'Description is required' };
        }
        if (!lostNlistedForm.category) {
            validationErrors.category = { message: 'Category is required' };
        }
        if (!lostNlistedForm.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lostNlistedForm.email)) {
            validationErrors.email = { message: 'Please enter a valid email address' };
        }

        // If there are validation errors, set them and prevent form submission
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // If there are no validation errors, submit the form
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

    const getBackgroundImage = () => {
        return `url(${editPostImage})`
    }

    return (
        <body style={{ backgroundImage: getBackgroundImage()}}>
            <div className="container">
            <Header />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center mb-4 border-dark rounded p-5 shadow-lg">Edit Post</h1>
                    <form onSubmit={onSubmitHandler}>
                        <div className="mb-3">
                            <label className="form-label">Title:</label>
                            <input type="text" name="title" value={lostNlistedForm.title} onChange={changeHandler} className="form-control border-dark rounded shadow" />
                            {errors.title && <div className='text-danger'>{errors.title.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Type:</label>
                            <select name="type" value={lostNlistedForm.type} onChange={changeHandler} className="form-select border-dark rounded-lg shadow-lg">
                                <option value="">Select Type</option>
                                <option value="lost">Lost</option>
                                <option value="found">Found</option>
                                <option value="sell">Sell</option>
                            </select>
                            {errors.type && <div className='text-danger'>{errors.type.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Zipcode:</label>
                            <input type="text" name="zipcode" value={lostNlistedForm.zipcode} onChange={changeHandler} className="form-control border-dark rounded-lg shadow-lg" />
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
                                    className="form-control border-dark rounded-lg shadow-lg"
                                />
                                {errors.price && <div className='text-danger'>{errors.price.message}</div>}
                            </div>
                        }
                        <div className="mb-3">
                            <label className="form-label">Description:</label>
                            <textarea name="description" value={lostNlistedForm.description} onChange={changeHandler} className="form-control border-dark rounded-lg shadow-lg"></textarea>
                            {errors.description && <div className='text-danger'>{errors.description.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Category:</label>
                            <select name="category" value={lostNlistedForm.category} onChange={changeHandler} className="form-select border-dark rounded-lg shadow-lg">
                                <option value="">Select Category</option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                                <option value="books">Animals</option>
                                <option value="Antiques">Collectibles & Instruments</option>
                                <option value="Dishware">Vehicles</option>
                                <option value="Toys">Outdoors</option>
                                <option value="Toys">Miscellaneous</option>
                            </select>
                            {errors.category && <div className='text-danger'>{errors.category.message}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input type="email" name="email" value={lostNlistedForm.email} onChange={changeHandler} className="form-control border-dark rounded-lg shadow-lg" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" />
                            {errors.email && <div className='text-danger'>{errors.email.message}</div>}
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary btn-lg border-dark rounded shadow">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </body>
        
    );
};

export default EditPost;
