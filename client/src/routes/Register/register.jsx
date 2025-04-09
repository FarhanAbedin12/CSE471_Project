import "./register.scss";
import { Link, useNavigate  } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";

function Register() {
  const [error, setError]=useState("");
  const [isLoading, setIsLoading]=useState(false)
  const navigate = useNavigate()

  const handleSubmit= async (e) =>{
    e.preventDefault()
    setIsLoading(true)
    setError("")
    const formData = new FormData(e.target);

    const username = formData.get("username")
    const email = formData.get("email")
    const password = formData.get("password")

    try{
      const res = await apiRequest.post("/auth/register",{
        username, email, password
      })
      navigate("/login")
      
    }catch(err){
      console.log(err)
      setError(err.response.data.message);
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div className="register">
      <div className="formContainers">
        <form on onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Enter your Username" />
          <input name="email" type="text" placeholder="Enter your Email" />
          <input name="password" type="password" placeholder="Enter your Password" />
          <button disabled= {isLoading}>Sign Up</button>
          {error && <span>{error}</span>}
          <p>
          Do you have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
      <div className="imgContainer"> 
      <img src="/bg.png" alt="" />
        </div>
    </div>
  );
}

export default Register;