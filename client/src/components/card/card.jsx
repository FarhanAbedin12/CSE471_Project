import apiRequest from "../../lib/apiRequest";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "./card.scss";

function Card({ item}) {
  const { currentUser } = useContext(AuthContext);

  const handlePostDelete = async (id) => {
    try {
      const response = await axios.delete(`/api/prop/${id}`);
      if (response.status === 200) {
        console.log("successfully deleted post");
        window.location.reload();
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  const handleChatClick = async () => {
    try {
      const res = await apiRequest.post("/chats", {
        receiverId: item.userId,
      });
  
      const chatId = res.data?.id;
      if (!chatId) {
        console.error("chatId not returned from server");
        return;
      }
  
      await apiRequest.post(`/messages/${chatId}`, {
        text: `I am Interested to buy ${item.title}`,
      });
  
    } catch (error) {
      console.error("Failed to initiate chat:", error);
    }
  };
  

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.address}</span>
        </p>
        <p className="price">BDT {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/bed.png" alt="" />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <img src="/bath.png" alt="" />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            {currentUser.id !== item.userId && (
              <Link to={`/${item.id}`} className="icon">
                <img src="/calender.png" alt="View post details" />
              </Link>
            )}
          <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            {(currentUser.id != item.userId) && (
            <div className="icon" onClick={() => handleChatClick(item.userId)}>
              <img src="/chat.png" alt="" />
            </div>
            )}
            {(currentUser.email === "admin@gmail.com" ||
              currentUser.id === item.userId) && (
              <div className="icon" onClick={() => handlePostDelete(item.id)}>
                <p>🗑️</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
