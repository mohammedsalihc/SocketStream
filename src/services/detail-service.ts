import { AuthModel } from "../models/auth/auth-model";
import { IAuth } from "../types/interfaces/auth-interface";
import { objectSanitizer } from "../utils/handlers/validations/valiators";

export class DetailService {

    Auth = async(filter:Partial<IAuth>):Promise<IAuth>=>{
        let query = objectSanitizer(filter)
        if (!Object.keys(query).length) {
            return null
        }
        return await AuthModel.findOne(query)
    }

}