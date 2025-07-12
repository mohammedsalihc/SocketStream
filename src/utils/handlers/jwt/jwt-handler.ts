import { UserModel } from "../../../models/auth/user-model";
import { ErrorMessages, status_code } from "../../../types/constants/error-message";
import { ERole } from "../../../types/enum/auth-enum";
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

    AccessPermission = (access_for_disable?:boolean,roles?:ERole[])=>{
        return async (req: any, res: any, next: any) => {
            const token = req.headers['Authorization'] || req.headers['authorization'];
            if (!token) {
                return res.status(401).send(status_code[401])
            }
            jwt.verify(token,process.env.JWT_SUPERKEY,async(err:any,decoded:any)=>{
                if(err){
                    return res.status(401).send(status_code[401])
                }
                const payload :ITokenPayload = decoded;
                req.payload = payload;
                if(!roles || !roles?.length|| !roles.includes(payload.role as ERole)){
                    const user = await UserModel.findOne({_id:payload?.user_id});
                    if(!user){
                        return res.status(401).send(status_code[401])
                    }
                    if(!access_for_disable && user?.disabled){
                        return res.status(403).send(ErrorMessages?.account_disabled)
                    }
                    req.user = user;
                    next()
                }else{
                    return res.status(401).send(status_code[401])
                }
            })
        }
    }
}