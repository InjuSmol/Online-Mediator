import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://18.188.75.118:5001",//"http://localhost:5001/api",
    withCredentials: true // send the cookies in every request
})
