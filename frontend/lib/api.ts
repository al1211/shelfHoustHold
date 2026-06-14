import { api } from "./axios";

api.interceptors.request.use((config:any):any=>{
    const token=localStorage.getItem("token");
    if(token) config.headers.Authorization=`Bearer ${token}`
    return config;

})