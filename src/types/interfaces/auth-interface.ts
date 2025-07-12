import { Moment } from "moment";
import { ELoginProvider, ERole } from "../enum/auth-enum";

export interface IAuth {
    _id?: string
    user?: string | IUser,
    email?: string,
    password?: string,
    disabled?: Boolean,
    created_at?: Moment
    role: ERole,
    provider?:ELoginProvider
}

export interface IUser {
    _id?: string
    name?: string,
    email?: string,
    disabled?: Boolean,
    created_at?: Moment
    role?: ERole
}

export interface IToken {
    token: string
}

export interface ITokenPayload {
    user_id: string,
    role?: string,
    auth_id?: string
}

