import { ChatroomModel } from "../models/chat/chatroom";
import { IChatroom } from "../types/interfaces/chat-interface";
import { objectSanitizer } from "../utils/handlers/validations/valiators";

export class UpdateService {

    Chatroom = async(filter:Partial<IChatroom>,update:Partial<IChatroom>):Promise<IChatroom>=>{
        let query = objectSanitizer(filter)
        if (!Object.keys(query).length) {
            return null
        }
        return await ChatroomModel.findOneAndUpdate(query,update,{new:true})
    }
}