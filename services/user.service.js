import AxiosConfig from "../axiosConfig";


export const getCurrentUser = async () => {
    const result = await AxiosConfig.axiosUserInstance.get('/me');
    if (result) return result.data;
    return null;
}
export const getUserProfile = async(firstName) => await AxiosConfig.axiosUserInstance.get('/profile', {
    params: {
        validate: firstName
    }});