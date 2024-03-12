import React, { useState } from 'react';
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import NewPost from "./components/NewPost";
import PostsPage from "./components/PostsPage";
import EditPost from "./components/EditPost";

function App() {

  const [lostNlistedForm, setLostNListedForm] = useState({
    title: '',
    type: '',
    zipcode: '',
    price: '',
    description: '',
    category: '',
    email: ''
});

  return (
    <div className="App">
      <Routes>
        <Route path="/posts/:id" element={<EditPost lostNlistedForm={lostNlistedForm} setLostNListedForm={setLostNListedForm} />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/create-post" element={<NewPost lostNlistedForm={lostNlistedForm} setLostNListedForm={setLostNListedForm}/>} />
        <Route path="/posts/type/:type" element={<PostsPage />} />{" "}
      </Routes>
    </div>
  );
}

export default App;
