import List from "../../components/list/List";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";

function ProfilePage() {
  const { updateUser, currentUser } = useContext(AuthContext);

  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

  const handleAdmin = () => {
    navigate("/admin");
  };

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/home");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(userPosts)
  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "noavatar.jpg"} alt="" />
            </span>
            <span>
              Username: <b>{currentUser.username}</b>
            </span>
            <span>
              E-mail: <b>{currentUser.email}</b>
            </span>
            <br />
            <button onClick={handleLogout}>Logout</button>
            {currentUser.email === "admin@gmail.com" && (
              <button onClick={handleAdmin}>Admin</button>
            )}
          </div>
          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>
          <List posts={userPosts} />
        </div>
      </div>
      <div className="chatContainer">
        <div className="wrapper">
          <h3>Your Dream Property, Just a Tap Away</h3>
          <h6>Discover, buy, and sell properties effortlessly with our app!</h6>
          <h6>🏡 Find Your Perfect Home: Browse a curated collection of properties tailored to your preferences.</h6>
          <h6>💼 Hassle-Free Selling: List your property and reach thousands of potential buyers.</h6>
          <h6>📍 Stay Local, Go Global: Access properties in your neighborhood or explore international opportunities.</h6>
          <h6>⚡ Instant Updates: Get real-time alerts on new listings and market trends.</h6>
          <h6>Transform the way you deal with property—start your journey with us today!</h6>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
