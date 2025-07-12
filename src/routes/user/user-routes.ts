import { Router } from "express";
import { JwtHandler } from "../../utils/handlers/jwt/jwt-handler";
import { ERole } from "../../types/enum/auth-enum";
import { UserController } from "../../controllers/user/user-controller";

const router = Router()
const jwt = new JwtHandler()
const user = new UserController()
router.get('/platform-users',jwt.AccessPermission(false,[]),(req,res)=>user.PlatformUsers(req,res))
export default router