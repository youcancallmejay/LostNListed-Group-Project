import { Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import NewPost from './components/NewPost';

function App() {

  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/create-post" element={<NewPost/>}/>
      </Routes>
    </div>
  );
}

export default App;
