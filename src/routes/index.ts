import { Application } from "express";

const AppEndPoints = (app:Application)=>{
    app.get('/',(req,res)=>res.send("Welcome to SocketStream REST APIS v1"))
}

export {AppEndPoints}