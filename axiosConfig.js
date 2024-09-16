import axios from "axios";

axios.defaults.withCredentials=true;
axios.defaults.headers.common['Content-Type'] = 'application/json';


const AUTH_SERVICE_BASEURL = "http://192.168.92.133:8080/api/auth";
const POSTS_SERVICE_BASEURL = "http://192.168.92.133:8080/api/posts";
const CHATS_SERVICE_BASEURL = "http://192.168.92.133:8080/api/chats";
const MESSAGE_SERVICE_BASEURL = "http://192.168.92.133:8080/api/messages";
const USER_SERVICE_BASEURL = "http://192.168.92.133:8080/api/users";


const axiosAuthInstance = axios.create({
    baseURL: AUTH_SERVICE_BASEURL,
});

const axiosPostsInstance = axios.create({
    baseURL: POSTS_SERVICE_BASEURL,
});

export const axiosChatInstance = axios.create({
    baseURL: CHATS_SERVICE_BASEURL,
});


const axiosMessageInstance = axios.create({
    baseURL: MESSAGE_SERVICE_BASEURL,
});

const axiosUserInstance = axios.create({
    baseURL: USER_SERVICE_BASEURL,
});

const AxiosConfig = {
    axiosAuthInstance,
    axiosPostsInstance,
    axiosChatInstance,
    axiosMessageInstance,
    axiosUserInstance,
};

export default AxiosConfig;