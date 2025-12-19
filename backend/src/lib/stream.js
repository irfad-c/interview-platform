import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("STREAM_API_KEY or STREAM_API_SECRET is missing");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log("Upserted stream user successfully");
  } catch (error) {
    console.error("Cant upsert user from stream");
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.upsertUser(userId);
    console.log("Deleted stream user successfully");
  } catch (error) {
    console.error("Cant delete user from stream");
  }
};
