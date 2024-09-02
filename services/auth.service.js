import { axiosAuthInstance } from '../axiosConfig'

export const login = async (loginRequestBody) => await axiosAuthInstance.post("/login", loginRequestBody);
export const register = async (regRequestBody) => await axiosAuthInstance.post("/register", regRequestBody);
export const logout = async () => await axiosAuthInstance.post("/logout");
export const getCurrentUser = async () => await axiosAuthInstance.get("/me");