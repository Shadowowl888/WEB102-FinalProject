import { Link, useRoutes } from "react-router-dom";
import PostInfo from './pages/PostInfo';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Home from './pages/Home';
import ReadPosts from "./pages/ReadPosts";
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/gallery",
      element: <ReadPosts />
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
        <Link to="/"><button className="header-button">Home</button></Link>
        <Link to="/gallery"><button className="header-button">Post Gallery</button></Link>
        <Link to="/new"><button className="header-button">Create New Post</button></Link>
      </div>
      <div className="content">
        {element}
      </div>
    </div>
  );
};

export default App;