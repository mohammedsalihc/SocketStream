import { AuthModel } from "../models/auth/auth-model";
import { UserModel } from "../models/auth/user-model";
import { ChatroomModel } from "../models/chat/chatroom";
import { MessageModel } from "../models/chat/message";
import { IAuth, IUser } from "../types/interfaces/auth-interface";
import { IChatroom, IMessage } from "../types/interfaces/chat-interface";

export class CreateService {

    User = async(body:IUser):Promise<IUser>=>{
        return await UserModel.create(body);
    }

    Auth = async(body:IAuth):Promise<IAuth>=>{
        return await AuthModel.create(body);
    }

    Message = async(body:IMessage):Promise<IMessage>=>{
        return await MessageModel.create(body);
    }

    ChatRoom = async(body:IChatroom):Promise<IChatroom>=>{
        return await ChatroomModel.create(body)
    }
}