import { Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import NewPost from "./components/NewPost";
import PostsPage from "./components/PostsPage";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/create-post" element={<NewPost />} />
        <Route path="/posts/type/:type" element={<PostsPage />} />{" "}
      </Routes>
    </div>
  );
}

export default App;
