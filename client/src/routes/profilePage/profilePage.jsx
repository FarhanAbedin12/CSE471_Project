import List from "../../components/list/List";
import { Suspense, useContext, useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate, Await } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import "./profilePage.scss";
import Chat from "../../components/chat/chat"


function ProfilePage() {
  const { updateUser, currentUser } = useContext(AuthContext);
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate()
  const data = useLoaderData();

  const handleAdmin = () => {
    navigate("/admin");
  };

  useEffect(() => {
    const handlePosts = async () => {
      try {
        const response = await apiRequest.get("/prop/");
        const filteredData = response.data.filter(
          (item) => item.userId === currentUser.id
        );
        setUserPosts(filteredData); 
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    handlePosts();
  }, [currentUser.id]);

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
          <Suspense fallback={<p>Loading...</p>}>
            <Await
              resolve={data.chatResponse}
              errorElement={<p>Error loading chats!</p>}
            >
              {(chatResponse) => <Chat chats={chatResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
