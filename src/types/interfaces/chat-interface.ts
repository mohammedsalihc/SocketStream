import { Moment } from "moment"
import { IUser } from "./auth-interface"

export interface IChatroomMember{
    user?:string | IUser,
    created_at?:Moment
}
export interface IChatroom{
    _id?:string
    members?: IChatroomMember[]|[],
    created_by?:string|IUser,
    created_at?:Moment
    last_message?:string|IMessage,
    member?:string //for type purpose only
}

export interface IMessage{
    _id?:string
    chatroom?:string|IChatroom,
    user?:string|IUser,
    message?:string,
    seen_by?:string[]|IUser[],
    created_at?:Moment
    reciever?:string //for type purpose only ont show in db
}