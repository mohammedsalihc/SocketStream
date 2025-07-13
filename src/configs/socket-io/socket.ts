import { StartSocketIO } from "../../utils/handlers/socket.io/socket"

const AddSocketConnection = (server)=>{
    const io = require('socket.io')(server,{path:'/socket'})
    return StartSocketIO(io)
}

export default AddSocketConnection