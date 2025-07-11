import { Application } from "express";
import auth_routes from './auth/auth-routes'
const AppEndPoints = (app:Application)=>{
    app.get('/',(req,res)=>res.send("Welcome to SocketStream REST APIS v1"))
    app.use('/auth',auth_routes)
}

export {AppEndPoints}