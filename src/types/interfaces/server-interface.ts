import { Request, Response } from "express"
import { ITokenPayload, IUser } from "./auth-interface"

export interface IServerError{
    status: number,
    message: string,
    error?: any
}
export interface ExpressResponse extends Response {}

export interface ExpressRequest extends Request {
    payload?: ITokenPayload,
    user?:IUser
}