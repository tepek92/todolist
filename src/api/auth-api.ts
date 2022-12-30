import {instance} from "./instance-api";
import {ResponseType} from "./todolist-api";
import {AxiosResponse} from "axios";

export type RequestPayloadType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}

export const authAPI = {
    me() {
        return instance.get<ResponseType<MeResponseType>>(`auth/me`)
    },
    login(formData: RequestPayloadType) {
        return instance.post<RequestPayloadType, AxiosResponse<ResponseType<{id: number}>>>(`auth/login`, formData)
    },
    logout() {
        return instance.delete<ResponseType>(`auth/login`)
    },
}

export type MeResponseType = {
    id: number
    email: string,
    login: string
}
