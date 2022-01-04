import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://the-superstore-app.herokuapp.com/"
});