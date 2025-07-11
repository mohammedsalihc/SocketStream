import mongoose from "mongoose";
import { getCurrentDateAndTime } from "../../utils/handlers/moment/moment-handler";
import { ERole } from "../../types/enum/auth-enum";
import { IUser } from "../../types/interfaces/auth-interface";

const schema = new mongoose.Schema({
    name:{type:String,required:true,index:true},
    email:{type:String,required:true,unique:true,index:true},
    disabled:{type:Boolean,default:false},
    created_at:{type:Date,default:getCurrentDateAndTime()},
    role:{type:String,enum:[ERole.ADMIN,ERole.USER],required:true}
})


export const UserModel =  mongoose.model<IUser&mongoose.Document>('user',schema)