import AxiosConfig from '../axiosConfig'

export const login = async (loginRequestBody) => await AxiosConfig.axiosAuthInstance.post('/login', loginRequestBody);
export const register = async (regRequestBody) => await AxiosConfig.axiosAuthInstance.post('/sign-up', regRequestBody);
export const logout = async () => {
    const result = await AxiosConfig.axiosAuthInstance.post('/logout');
    return result;
}