import { METHODS } from "http";
import { ControllerHandler } from "../../utils/handlers/controller/controller";
import { ExpressRequest, ExpressResponse } from "../../types/interfaces/server-interface";
import { IPagination, IQeury } from "../../types/interfaces/query-interface";
import { ListServices } from "../../services/list-services";
import { IUser } from "../../types/interfaces/auth-interface";
import { PageNumberSanitizer } from "../../utils/handlers/validations/valiators";

export class UserController extends ControllerHandler{
    private list_service = new ListServices()
    
    PlatformUsers  = async (request: ExpressRequest, response: ExpressResponse) => {
        try {
            const user = request?.user;
            const {search,page}:IQeury = request?.query;
            let query:Partial<IUser> = {disabled:false,_id:{$nin:user?._id}as any}
            const users = await this.list_service.User(query,false,search,page)as IUser[];
            const total_doc = await this.list_service.User(query,true)as number;
            let total_page = Math.ceil(total_doc / 10)
            let data: IPagination = {
                total_doc,
                doc_per_page: 10,
                current_page: PageNumberSanitizer(page),
                data: users,
                total_page
            }
            this.jsonResponse(response,data)
        } catch (e) {
            this.error(response, 500, null, e);
        }
    };
}