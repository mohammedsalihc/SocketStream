import { Router } from "express";
import { AuthController } from "../../controllers/auth/auth-controller";
import { JwtHandler } from "../../utils/handlers/jwt/jwt-handler";

const router = Router()
const auth = new AuthController()
const jwt = new JwtHandler()
router.post('/register',(req,res)=>auth.Register(req,res))
router.post('/login',(req,res)=>auth.Login(req,res))
router.post('/google-signin',(req,res)=>auth.GoogleSignIN(req,res))
router.get('/profile',jwt.AccessPermission(false,[]),(req,res)=>auth.ProfileDetails(req,res))
export default router;