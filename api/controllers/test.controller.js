import jwt from "jsonwebtoken"

export const shouldBeLoggedIn= async(req, res)=>{
    console.log(req.userId)
    res.status(200).json({message: "You are Authenticated"})

}

export const shouldBeAdmin= async(req, res)=>{
    console.log(req.userId)
  
    if(!payload.isAdmin) 
        return res.status(403).json({ message: "Unauthorized!" })
    
  res.status(200).json({ message: "You are logged in!" });
};