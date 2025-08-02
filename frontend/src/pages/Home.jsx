import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to EatUp Burger</h1>
      <p>Crave it, grab it, love it!</p>
      <Link to="/menu" className="home-btn">Order Now</Link>
    </div>
  );
};

export default Home;
