import { IAuth, IToken, ITokenPayload } from "../../../types/interfaces/auth-interface";
import jwt from 'jsonwebtoken'
export class JwtHandler {

    CreateToken = async(auth:IAuth):Promise<IToken>=>{
        let payload:ITokenPayload={
            user_id:auth?.user as string,
            auth_id:auth?._id as string,
            role:auth?.role
        }
        let token =  jwt.sign(payload,process.env.JWT_SUPERKEY)
        return {token}
    }
}