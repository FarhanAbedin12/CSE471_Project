import express from 'express';
import {verifyToken} from "../middleware/verifyToken.js";
import {addPost, deletePost, getPost, getPosts, updatePost} from "../controllers/prop.controller.js";

const router = express.Router();


router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", verifyToken, addPost); //used token because only LOGGED IN used can update posts
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;