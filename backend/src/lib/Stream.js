import { StreamChat } from 'stream-chat';
import { ENV } from './env.js';

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error('steam apiKey or apiSecret is missing');
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

export const upserStreamUser = async(userData) => {
    try {
        await chatClient.upsertUser(userData)
        console.log("stream user upserted successfully:",userData)
    } catch (error) {
        console.error("error upserting stream user:",error)
        
    }
}
export const deleteStreamUser = async(userId) => {
    try {
        await chatClient.deleteUser(userId)
        console.log("stream user  deleted successfully:",userId)
    } catch (error) {
        console.error("error deleting the stream user:",error)
        
    }
}