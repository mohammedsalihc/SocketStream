import mongoose, { Schema } from "mongoose";
import { getCurrentDateAndTime } from "../../utils/handlers/moment/moment-handler";
import { IChatroom } from "../../types/interfaces/chat-interface";

const chatroomMembers = new mongoose.Schema({
    user:{type:Schema.Types.ObjectId,ref:"user",required:true},
    created_at:{type:Date,default:getCurrentDateAndTime()}
})

const schema = new mongoose.Schema({
    members:{type:[chatroomMembers],default:[]},
    created_by:{type:Schema.Types.ObjectId,ref:"user",required:true},
    last_message:{type:Schema.Types.ObjectId,ref:"message"},
    created_at:{type:Date,default:getCurrentDateAndTime()}
})

export const ChatroomModel = mongoose.model<IChatroom&mongoose.Document>('chatroom',schema)