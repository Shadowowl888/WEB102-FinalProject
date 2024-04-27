import { Link } from "react-router-dom";
import AugustaImg from "../assets/augusta.jpeg";

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to GolfGather Hub! ⛳</h1>
            <h3>Join the ultimate community of golf enthusiasts!</h3>
            <img className="home-img" src={AugustaImg}/>
            <Link to="/gallery"><button className="explore-btn">Explore Now</button></Link>
        </div>
    );
};

export default Home;