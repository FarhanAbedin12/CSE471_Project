import express from 'express';
import {getUser,getUsers,updateUser, deleteUser, getNotificationNumber } from "../controllers/user.controller.js";
import { verifyToken } from "../middleWare/verifyToken.js"
const router = express.Router();

router.get('/', getUsers);
router.get('/:id', verifyToken, getUser);
router.put('/:id', verifyToken, updateUser);
router.delete('/:id', verifyToken, deleteUser);
router.get('/notification', verifyToken, getNotificationNumber);

export default router;