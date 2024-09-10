import AxiosConfig from "../axiosConfig";


export const getCurrentUser = async () => await AxiosConfig.axiosUserInstance.get('/me');
export const getUserProfile = async(firstName) => await AxiosConfig.axiosUserInstance.get('/profile', {
    params: {
        validate: firstName
    }});