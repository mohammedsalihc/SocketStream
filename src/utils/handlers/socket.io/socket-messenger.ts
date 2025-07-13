import { Application } from "express";
import { IMessage } from "../../../types/interfaces/chat-interface";
import { ConnectedUsersViaSocket } from "./socket";
import { ESocketIOEvent } from "../../../types/enum/auth-enum";

export class SocketMessenger {
    
    sendMessageToClient = (app:Application,message:IMessage,reciever:string)=>{
        const io = app.get('socketConnection');
        const reciver_sockets = (ConnectedUsersViaSocket && ConnectedUsersViaSocket[reciever].sockets) ||[]
        reciver_sockets?.forEach((socket: string) => io.to(socket).emit(ESocketIOEvent.MESSAGE,message))
    }
}