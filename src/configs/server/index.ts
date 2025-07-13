import express,{ Application } from "express"
import middlewares from "../middlewares";
import { AppEndPoints } from "../../routes";
import AddSocketConnection from "../socket-io/socket";

const app:Application = express()

const startServer = ()=>{
    let port = process.env.PORT;
    middlewares(app)
    AppEndPoints(app)
    const server = app.listen(port, () => console.log("SERVER CONNECTED"));
    const socket_connection = AddSocketConnection(server)
    app.set('socketConnection',socket_connection)
}


export  {startServer,app}