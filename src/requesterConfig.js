import axios from "axios";

const requester = axios.create({
    baseURL: process.env.BASE_URL,
});

export default requester;