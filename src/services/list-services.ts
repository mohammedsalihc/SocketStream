import { UserModel } from "../models/auth/user-model";
import { IUser } from "../types/interfaces/auth-interface";
import { objectSanitizer, PageNumberSanitizer } from "../utils/handlers/validations/valiators";

export class ListServices{

    User = async(filter:Partial<IUser>,count?:boolean,search?:string,page?:any):Promise<IUser[]|number>=>{
        let query = objectSanitizer(filter)
        if(search){
            query.name = { $regex: search, $options: 'i'}
        }
        if(count){
            return await UserModel.countDocuments(query)
        }
       return await UserModel.find(query).sort({created_at:"desc"}).skip((10 * PageNumberSanitizer(page)) - 10).limit(10)
    }
}