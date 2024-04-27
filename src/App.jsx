import { useState } from "react";
import { Link, useRoutes } from "react-router-dom";
import PostInfo from './pages/PostInfo';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Home from './pages/Home';
import ReadPosts from "./pages/ReadPosts";
import './App.css'

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  let element = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/gallery",
      element: <ReadPosts searchQuery={searchQuery} />
    },
    {
      path: "/edit/:id",
      element: <EditPost />
    },
    {
      path: "/new",
      element: <CreatePost />
    },
    {
      path: "/info/:id",
      element: <PostInfo />
    }
  ]);

  return (
    <div className="App">
      <div className="header">
        <div className="header-name">
          <h2>GolfGather Hub 🏌️</h2>
        </div>
        <div className="header-buttons">
          <Link to="/"><button className="header-button">Home</button></Link>
          <Link to="/gallery"><button className="header-button">Post Gallery</button></Link>
          <Link to="/new"><button className="header-button">Create New Post</button></Link>
        </div>
        <div className="header-search">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by title"
            className="search-bar"
          />
        </div>
      </div>
      <div className="content">
        {element}
      </div>
    </div>
  );
};

export default App;