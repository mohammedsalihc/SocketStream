import express,{ Application } from "express"

const app:Application = express()
const startServer = ()=>{
    let port = process.env.PORT;
    const server = app.listen(port, () => console.log("SERVER CONNECTED"));
}


export  {startServer,app}