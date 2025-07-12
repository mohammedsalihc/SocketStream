import { OAuth2Client } from "google-auth-library";

export class GoogleHandler {

    ValidateSignupToken = async(token:string):Promise<any>=>{
        try{
            const client_id = process.env.GOOGLE_CLIENTID
            const client = new OAuth2Client(client_id)
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: client_id
            })
            return  ticket.getPayload();
        }catch(e){
            console.log("ERROR IN GOOGLE SIGNUP",e)
        }
    }
}