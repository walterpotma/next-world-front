"use client"
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://localhost:7295/api/",
  headers: {
    "Content-Type": "application/json",
  }
});

export class HqService {
    static GetAllHqs(){
        return axiosInstance.get(`/Hq/ListAllHqs/`);
    }
}