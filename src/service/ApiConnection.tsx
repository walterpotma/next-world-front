"use client"
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://next-world-api.onrender.com/api/",
  //baseURL: "https://localhost:7295/api/",
  headers: {
    "Content-Type": "application/json",
  }
});

export class HqService {
    static GetAllHqs(){
        return axiosInstance.get(`/Hq/ListAllHqs/`);
    }
    static GetHqById(id: number){
        return axiosInstance.get(`/Hq/ListHqById?id=${id}`);
    }
    static GetHqFinalizado(){
        return axiosInstance.get(`/Hq/ListHqByStatus?status=finalizado`)
    }
}
export class CapService {
    static GetRecentsCaps(){
        return axiosInstance.get(`/Capitulos/listRecentsCaps/`);
    }
    static GetViewCaps(){
        return axiosInstance.get(`/Capitulos/ListViewCaps`)
    }
    static GetCapByHqId(id: number){
        return axiosInstance.get(`/Capitulos/ListCapByIdHq?hq_id=${id}`)
    }
}