import { Router } from "express";
import { JwtHandler } from "../../utils/handlers/jwt/jwt-handler";
import { ERole } from "../../types/enum/auth-enum";
import { ChatController } from "../../controllers/chat/chat-controller";

const router = Router();
const jwt = new JwtHandler()
const chat = new ChatController()
router.post('/message',jwt.AccessPermission(false,[ERole.USER]),(req,res)=>chat?.SendMessage(req,res))
router.get('/chats',jwt.AccessPermission(false,[ERole.USER]),(req,res)=>chat.ListChats(req,res))
router.get('/messages/:id',jwt.AccessPermission(false,[ERole.USER]),(req,res)=>chat.ListMessages(req,res))
export default router;