import express,{ Application } from "express"
import middlewares from "../middlewares";
import { AppEndPoints } from "../../routes";

const app:Application = express()
const startServer = ()=>{
    let port = process.env.PORT;
    middlewares(app)
    AppEndPoints(app)
    const server = app.listen(port, () => console.log("SERVER CONNECTED"));
}


export  {startServer,app}