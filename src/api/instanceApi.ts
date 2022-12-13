import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '20e7389f-479c-4b8d-a9f1-c09cf3d4ffb9'
    }
});
