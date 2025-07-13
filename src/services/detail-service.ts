import { isBigIntObject } from "util/types";
import { AuthModel } from "../models/auth/auth-model";
import { ChatroomModel } from "../models/chat/chatroom";
import { IAuth, IUser } from "../types/interfaces/auth-interface";
import { IChatroom } from "../types/interfaces/chat-interface";
import { objectSanitizer } from "../utils/handlers/validations/valiators";
import { UserModel } from "../models/auth/user-model";

export class DetailService {

    Auth = async(filter:Partial<IAuth>):Promise<IAuth>=>{
        let query = objectSanitizer(filter)
        if (!Object.keys(query).length) {
            return null
        }
        return await AuthModel.findOne(query).lean()
    }

    User = async(filter:Partial<IUser>):Promise<IUser>=>{
        let query = objectSanitizer(filter)
        if (!Object.keys(query).length) {
            return null
        }
        return await UserModel.findOne(query).lean()
    }

    Chatroom = async(filter:Partial<IChatroom>):Promise<IChatroom>=>{
        let query = objectSanitizer(filter)
        if (!Object.keys(query).length) {
            return null
        }
        if(query.member){
            query['members.user'] = { $in:query.member};
            delete query?.member
        }
        return await ChatroomModel.findOne(query).lean()
    }

}