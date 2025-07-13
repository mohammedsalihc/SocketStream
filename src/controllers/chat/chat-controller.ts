import { CreateService } from "../../services/create-services";
import { DetailService } from "../../services/detail-service";
import { ListServices } from "../../services/list-services";
import { UpdateService } from "../../services/update-service";
import { ErrorMessages } from "../../types/constants/error-message";
import { IUser } from "../../types/interfaces/auth-interface";
import { IChatroom, IMessage } from "../../types/interfaces/chat-interface";
import { IPagination, IQeury } from "../../types/interfaces/query-interface";
import { ExpressRequest, ExpressResponse } from "../../types/interfaces/server-interface";
import { ControllerHandler } from "../../utils/handlers/controller/controller";
import { bodyRequiredValidator, PageNumberSanitizer } from "../../utils/handlers/validations/valiators";

export class ChatController extends ControllerHandler{
    private detail_service = new DetailService()
    private create_service = new CreateService()
    private update_service = new UpdateService()
    private list_service = new ListServices()


    ListChats =   async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            const {search,page}:IQeury = request?.query;
            const user = request?.user;
            let query:IChatroom = {member:user?._id.toString()}
            const chats = await this.list_service.Chats(query,false,page)as IChatroom[]
            const total_doc = await this.list_service.Chats(query,true) as number
            let total_page = Math.ceil(total_doc / 10)
            let data: IPagination = {
                total_doc,
                doc_per_page: 10,
                current_page: PageNumberSanitizer(page),
                data: chats,
                total_page
            }
            this.jsonResponse(response,data)
        } catch (e) {
            this.error(response, 500, null, e);
        }
    };

    SendMessage  = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            const user = request?.user;
            const body:Partial<IMessage> = request?.body;
            const required = ['message','reciever'];
            const validation_error = bodyRequiredValidator(body,required);
            if(validation_error){
                return this.error(response,400,ErrorMessages.body_validation_error,validation_error)
            }
            if(user?._id == body?.reciever){
                return this.error(response,400,ErrorMessages.action_not_allowed)
            }
            const reciever = await this.detail_service.User({_id:body?.reciever})
            if(!reciever){
                return this.error(response,400,ErrorMessages.chat_reciever_not_found)
            }
            //first check if there is any previos chat;
            let members = [user?._id,reciever?._id]
            let query = {"members.user":{ $all:members}} as any
            let chatroom = await this.detail_service.Chatroom(query)
            if(!chatroom){
                 chatroom ={
                    members:members.map((id)=>({
                        user:id,
                    })),
                    created_by:user?._id
                }
                chatroom = await this.create_service.ChatRoom(chatroom)
            }
            let message:IMessage={
                user:user?._id,
                chatroom:chatroom?._id,
                message:body?.message,
            }
            message = await this.create_service.Message(message)
            this.jsonResponse(response,message)
            //implement socket:
            this.update_service.Chatroom({_id:chatroom?._id},{last_message:message?._id})
        } catch (e) {
            this.error(response, 500, null, e);
        }
    };

    ListMessages  = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            const user = request?.user;
            const {page}:IQeury = request?.query;
            const chatroom_id = request?.params?.id;
            let query:IChatroom={_id:chatroom_id,member:user?._id}
            const chatroom = await this.detail_service.Chatroom(query)
            if(!chatroom){
                return this.error(response,404,ErrorMessages.chatroom_not_found)
            }
            const messages = await this.list_service.Messages({chatroom:chatroom?._id},false,page)as IMessage[];
            const total_doc = await this.list_service.Messages({chatroom:chatroom?._id},true)as number;
            let total_page = Math.ceil(total_doc / 10)
            let data: IPagination = {
                total_doc,
                doc_per_page: 10,
                current_page: PageNumberSanitizer(page),
                data: messages,
                total_page
            }
            this.jsonResponse(response,data)
        } catch (e) {
            this.error(response, 500, null, e);
        }
    };
}