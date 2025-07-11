import { CreateService } from "../../services/create-services";
import { DetailService } from "../../services/detail-service";
import { ErrorMessages } from "../../types/constants/error-message";
import { ERole } from "../../types/enum/auth-enum";
import { IAuth, IToken, IUser } from "../../types/interfaces/auth-interface";
import { ExpressRequest, ExpressResponse } from "../../types/interfaces/server-interface";
import { BcryptHandler } from "../../utils/handlers/bcrypt/bcrypt";
import { ControllerHandler } from "../../utils/handlers/controller/controller";
import { JwtHandler } from "../../utils/handlers/jwt/jwt-handler";
import { bodyRequiredValidator } from "../../utils/handlers/validations/valiators";

export class AuthController extends ControllerHandler{
    private bcrypt = new BcryptHandler()
    private create_service = new CreateService()
    private detail_service = new DetailService()
    private jwt_service = new JwtHandler()
    Register  = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            let body:Partial<IAuth & IUser> = request?.body
            const required = ['name','email','password'];
            const body_validation_error = bodyRequiredValidator(body,required);
            if(body_validation_error){
                return this.error(response,400,ErrorMessages.body_validation_error,body_validation_error)
            }
            body.password = await this.bcrypt.getPasswordHash(body?.password)
            body.name = body?.name.toLowerCase()
            body.email = body?.email.toLowerCase()
            const exist_email = await this.detail_service.Auth({email:body?.email})
            if(exist_email){
                return this.error(response,400,ErrorMessages.email_already_exist)
            }
            let user:IUser={
                email:body?.email,
                name:body?.name,
                role:ERole.USER
            }
            user = await this.create_service.User(user)
            let auth:IAuth={
                email:user?.email,
                role:user?.role,
                user:user?._id,
                password:body?.password
            }
            auth = await this.create_service.Auth(auth)
            let token:IToken = await this.jwt_service.CreateToken(auth)
            this.jsonResponse(response,token)
        } catch (e) {
            this.error(response, 500, null, e);
        }
    };

    Login  = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            let body:IAuth = request?.body;
            const required = ['email','password'];
            const body_validation_error = bodyRequiredValidator(body,required);
            if(body_validation_error){
                return this.error(response,400,ErrorMessages.body_validation_error,body_validation_error)
            }
            body.email = body?.email.toLowerCase();
            const auth = await this.detail_service.Auth({email:body?.email});
            if(!auth){
                return this.error(response,404,ErrorMessages.user_not_found)
            }
            const compare_password = await this.bcrypt.verifyPasswordHash(body?.password,auth?.password)
            if(!compare_password){
                return this.error(response,400,ErrorMessages.incorrect_password)
            }
            let token:IToken = await this.jwt_service.CreateToken(auth);
            this.jsonResponse(response,token)
        } catch (e) {
            this.error(response, 500, null, e);
        }
    };
}