import { ESocketIOEvent } from "../../../types/enum/auth-enum";
import { IConnectedUser, ITokenPayload } from "../../../types/interfaces/auth-interface";
import { JwtHandler } from "../jwt/jwt-handler";


export let ConnectedUsersViaSocket ={};
const jwt_handler = new JwtHandler()
export const StartSocketIO = (io)=>{
    io.use((socket,next)=>{
        let token = socket.handshake.query.token;
        if(token){
            jwt_handler.VerifyToken(token).then((payload:ITokenPayload)=>{
                socket.handshake.query.client_id = payload.user_id;
                socket.handshake.query.client_auth_id = payload.auth_id;
                return next()
            }).catch((err)=>{
                socket.disconnect()
                return next(new Error("authentication error"))
            })
        }else{
            socket.disconnect()
            return next(new Error("authentication error"))
        }
    })

    io.on(ESocketIOEvent.CONNECTION,socket=>{
        let client_id = socket?.handshake?.query?.client_id?.toString()
        let client_auth_id = socket?.handshake?.query?.client_auth_id?.toString()
        join(client_id,socket)
        socket.on(ESocketIOEvent.DISCONNECT, (data) => {
            leave(client_id, socket.id)
        })

    })
    return io;
}

const join = (client: string, socket: string) => {
    if (!(client in ConnectedUsersViaSocket)) {
        const connection: IConnectedUser = { _id: client, sockets: [socket] }
        ConnectedUsersViaSocket[client] = connection
    } else if (!ConnectedUsersViaSocket[client].sockets.includes(socket)) {
        ConnectedUsersViaSocket[client].sockets.push(socket)
    }
}

const leave = (client: string, socket: string) => {
    if ((client in ConnectedUsersViaSocket)) {
        if (ConnectedUsersViaSocket[client].sockets.includes(socket)) {
            ConnectedUsersViaSocket[client].sockets = Array.from(ConnectedUsersViaSocket[client].sockets.filter((s: string) => s !== socket))
        }
        if (!ConnectedUsersViaSocket[client].sockets.length) {
            delete ConnectedUsersViaSocket[client]
        }
    }
}