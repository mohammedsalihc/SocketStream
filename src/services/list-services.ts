import { UserModel } from "../models/auth/user-model";
import { ChatroomModel } from "../models/chat/chatroom";
import { MessageModel } from "../models/chat/message";
import { IUser } from "../types/interfaces/auth-interface";
import { IChatroom, IMessage } from "../types/interfaces/chat-interface";
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
       return await UserModel.find(query).sort({created_at:"desc"}).skip((10 * PageNumberSanitizer(page)) - 10).limit(10).lean()
    }

    Chats = async(filter:Partial<IChatroom>,count?:boolean,page?:any):Promise<IChatroom[]|number>=>{
        let query = objectSanitizer(filter)
        if(query.member){
            query['members.user'] = { $in:query.member};
            delete query?.member
        }
        if(count){
            return await ChatroomModel.countDocuments(query)
        }
        return await ChatroomModel.find(query).sort({created_at:"desc"}).skip((10 * PageNumberSanitizer(page)) - 10).limit(10).populate('last_message').lean()
    }

    Messages = async(filter:Partial<IMessage>,count?:Boolean,page?:any):Promise<IMessage[]|number>=>{
        let query = objectSanitizer(filter)
        if(count){
            return await MessageModel.countDocuments(query)
        }
        return await MessageModel.find(query).sort({created_at:"desc"}).skip((10 * PageNumberSanitizer(page)) - 10).limit(10).lean()
    }
}