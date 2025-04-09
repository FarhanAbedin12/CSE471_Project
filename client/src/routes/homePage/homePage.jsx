import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import { AuthContext } from "../../context/AuthContext";
import "./homePage.scss";

function HomePage() {
  const { currentUser } = useContext(AuthContext)
  
  return (
    <div className="homePage">
      <div className="textContainer"> 
        <div className="wrapper"> 
          <h1 className="title">Find Your Perfect Place To Call Home And Thrive</h1>
          <p>
            Find your dream home with our easy-to-use Real Estate App! Explore a variety of 
            properties with detailed descriptions and high-quality images. Use advanced 
            search filters and connect directly with agents or sellers for seamless 
            communication. Start your property search today!
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>10+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>50</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;

