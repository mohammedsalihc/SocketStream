import mongoose, { mongo, Schema } from "mongoose";
import { ERole } from "../../types/enum/auth-enum";
import { getCurrentDateAndTime } from "../../utils/handlers/moment/moment-handler";
import { IAuth } from "../../types/interfaces/auth-interface";

const schema = new mongoose.Schema({
    user:{type:Schema.Types.ObjectId,ref:"user",required:true},
    email:{type:String,index:true,unique:true,required:true},
    password:{type:String,required:true},
    disabled:{type:Boolean,default:false},
    role:{type:String,enum:[ERole.USER,ERole.ADMIN],required:true},
    created_at:{type:Date,default:getCurrentDateAndTime()}
})

export const AuthModel = mongoose.model<IAuth&mongoose.Document>('auth',schema)