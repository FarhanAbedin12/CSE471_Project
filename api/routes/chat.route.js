import express from 'express';
import {getChats, getChat, readChat, addChat} from "../controllers/chat.controller.js";
import {verifyToken} from "../middleWare/verifyToken.js"
const router = express.Router();

router.get('/', verifyToken, getChats);
router.get('/:id', verifyToken, getChat);
router.post('/', verifyToken, addChat);
router.put('/read/:id', verifyToken, readChat);


export default router;