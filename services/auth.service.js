import AxiosConfig from '../axiosConfig'

export const verifyPhoneOTP = async (verificationData) => {
    const result = await AxiosConfig.axiosAuthInstance.post('/verifyPhoneOTP', verificationData);
    if(result){
        return result.data;
    }
    return null;
};
export const phoneLogin = async (loginData) => await AxiosConfig.axiosAuthInstance.post('/phoneLogin', loginData);
export const login = async (loginRequestBody) => await AxiosConfig.axiosAuthInstance.post('/login', loginRequestBody);
export const register = async (regRequestBody) => await AxiosConfig.axiosAuthInstance.post('/sign-up', regRequestBody);
export const logout = async () => {
    const result = await AxiosConfig.axiosAuthInstance.post('/logout');
    return result;
}