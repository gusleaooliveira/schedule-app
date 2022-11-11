import axios from "axios";

let port = 5000
export const api = axios.create({
    baseURL: `http://localhost:${port}`
})