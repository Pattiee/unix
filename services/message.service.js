import AxiosConfig from "../axiosConfig";
import SortingUtil from '../utils/SortingUtil'

const sendMessageExistingChat = async(messageBody, chatId, valString) => {
    const result = await AxiosConfig.axiosMessageInstance.post('', messageBody, {
    params: {
        cid: chatId,
        valString: valString,
    }});
    if (result) return result.data;
    return null;
}

const sendNewChatMessage = async(desId, messageBody) => await AxiosConfig.axiosMessageInstance.post(`/?=${desId}`, messageBody);
const readChatMessages = async(chatId, validationString) => {
    const result = await AxiosConfig.axiosMessageInstance.get('', {
        params: {
            cid: chatId,
            valString: validationString,
        }
    });
    if (result) {
        const sortedMessages = result.data.sort((a, b) => {
            return SortingUtil.parseDate(a.timestamp) - SortingUtil.parseDate(b.timestamp);
        })
        return sortedMessages;
    }
    return null;
}
const readSingleMessage = async(chatId, msgId) => await AxiosConfig.axiosMessageInstance.get(`/?=${chatId}/?=${msgId}`);
const deleteMessage = async(messageId) => await AxiosConfig.axiosMessageInstance.get(`/${messageId}`);

const MessageService = {
    sendMessageExistingChat,
    sendNewChatMessage,
    readChatMessages,
    readSingleMessage,
    deleteMessage,
}

export default MessageService;