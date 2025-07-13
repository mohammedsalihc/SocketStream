import { Application } from "express";
import auth_routes from './auth/auth-routes'
import user_routes from './user/user-routes'
import chat_routes from './chat/chat-routes'
const AppEndPoints = (app:Application)=>{
    app.get('/',(req,res)=>res.send("Welcome to SocketStream REST APIS v1"))
    app.use('/auth',auth_routes)
    app.use('/user',user_routes)
    app.use('/chat',chat_routes)
}

export {AppEndPoints}