import { axiosPostsInstance } from "../axiosConfig";


const createPost = async (postData) => await axiosPostsInstance.post('/', postData);
const getAllPosts = async () => await axiosPostsInstance.get('/');
const getLatestPosts = async () => await axiosPostsInstance.get('/latestPosts');
const getPostById = async (postId) => await axiosPostsInstance.get(`/?=${postId}`);
const updatePost = async (postId, requestBody) => await axiosPostsInstance.put(`/?=${postId}`, requestBody);
const deleteAllPosts = async () => await axiosPostsInstance.delete('/');
const deletePostById = async (postId) => await axiosPostsInstance.delete(`/?=${postId}`);

const PostService = {
    createPost,
    getAllPosts,
    getLatestPosts,
    getPostById,
    updatePost,
    deleteAllPosts,
    deletePostById
}

export default PostService;