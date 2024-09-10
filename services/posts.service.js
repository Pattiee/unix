import AxiosConfig from "../axiosConfig";


const createPost = async (postData) => await AxiosConfig.axiosPostsInstance.post('/', postData);
const getAllPosts = async () => await AxiosConfig.axiosPostsInstance.get('/');
const getLatestPosts = async () => await AxiosConfig.axiosPostsInstance.get('/latestPosts');
const getPostById = async (postId) => await AxiosConfig.axiosPostsInstance.get(`/?=${postId}`);
const searchPostByTitle = async (title) => await AxiosConfig.axiosPostsInstance.get('/post', title);
const updatePost = async (postId, requestBody) => await AxiosConfig.axiosPostsInstance.put(`/?=${postId}`, requestBody);
const deleteAllPosts = async () => await AxiosConfig.axiosPostsInstance.delete('/');
const deletePostById = async (postId) => await AxiosConfig.axiosPostsInstance.delete(`/?=${postId}`);

const PostService = {
    createPost,
    getAllPosts,
    getLatestPosts,
    getPostById,
    searchPostByTitle,
    updatePost,
    deleteAllPosts,
    deletePostById
}

export default PostService;