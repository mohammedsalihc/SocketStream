import mongoose, { Schema } from "mongoose";
import { getCurrentDateAndTime } from "../../utils/handlers/moment/moment-handler";
import { IMessage } from "../../types/interfaces/chat-interface";

const schema = new mongoose.Schema({
    chatroom:{type:Schema.Types.ObjectId,ref:"chatroom",required:true},
    user:{type:Schema.Types.ObjectId,ref:"user"},
    message:{type:String},
    seen_by:{type:[Schema.Types.ObjectId],ref:"user",default:[]},
    created_at:{type:Date,default:getCurrentDateAndTime()}
})

export const MessageModel = mongoose.model<IMessage&mongoose.Document>('message',schema)