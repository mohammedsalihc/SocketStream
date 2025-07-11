import { Response } from "express";
import { IServerError } from "../../../types/interfaces/server-interface";
import { status_code } from "../../../types/constants/error-message";

export class ControllerHandler{
    public jsonResponse<T>(response: Response, result?: T | null) {
        if (result) {
            response.type('application/json');
            return response.status(200).json(result);
        } else {
            return response.status(200).json({ "status": "success" });
        }
    }

    public error(response: Response, code: number, error_message:string, error?: any) {
        let error_response: IServerError = {
            "status": code,
            "message": error_message || status_code[code],
            "error": [error]
        }
        response.status(code).json(error_response)
    }
}