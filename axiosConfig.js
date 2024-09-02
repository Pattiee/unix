import axios from "axios";

axios.defaults.withCredentials=true;

const AUTH_SERVICE_BASEURL = "http://localhost:8080/api/v1/auth";
const POSTS_SERVICE_BASEURL = "http://localhost:8080/api/v1/posts";

export const axiosAuthInstance = axios.create({
    baseURL: AUTH_SERVICE_BASEURL,
});

export const axiosPostsInstance = axios.create({
    baseURL: POSTS_SERVICE_BASEURL,
});