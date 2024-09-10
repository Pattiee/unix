import { axiosChatInstance } from "../axiosConfig";


const createChat = async (messageBody) => await axiosChatInstance.post('/', messageBody);
const getUserChats = async (valString) => {
    const res = await axiosChatInstance.get('', {
        params: {
            validationString: valString,
        }
    });
    if (res) return res.data;
    return null;
}
const getChatById = async (id, validationString) => {
    const result = await axiosChatInstance.get('/chat', {
        params: {
            id: id,
            valString: validationString
        }
    });
    if (result) return result.data;
    return null;
}
const deleteChat = async (chatId) => await axiosChatInstance.delete(`/${chatId}`);

const ChatService = { createChat, getUserChats, getChatById, deleteChat }

export default ChatService;