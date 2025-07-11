import { AuthModel } from "../models/auth/auth-model";
import { UserModel } from "../models/auth/user-model";
import { IAuth, IUser } from "../types/interfaces/auth-interface";

export class CreateService {

    User = async(body:IUser):Promise<IUser>=>{
        return await UserModel.create(body);
    }

    Auth = async(body:IAuth):Promise<IAuth>=>{
        return await AuthModel.create(body);
    }
}