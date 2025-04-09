import "./login.scss";
import { Link, useNavigate  } from "react-router-dom";
import { useContext, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
function Login() {
  const [error, setError]=useState("");
  const [isLoading, setIsLoading]=useState(false)
  const { updateUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleSubmit= async (e) =>{
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(e.target);

    const username = formData.get("username")
    const password = formData.get("password")

    try{
      const res = await apiRequest.post("/auth/login",{
        username, password
      })
      updateUser(res.data)

      navigate("/profile")
      
    }catch(err){
      console.log(err)
      setError(err.response.data.message);
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <p>
          Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>
      </div>
      <div className="imgContainer"> 
      <img src="/bg.png" alt="" />
        </div>
    </div>
  );
}

export default Login;